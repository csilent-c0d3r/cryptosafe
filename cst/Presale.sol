/**
 *Submitted for verification at BscScan.com on 2024-12-30
*/

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

/**
 * @title ReentrancyGuard
 * @dev A simplified version of ReentrancyGuard to use in Remix
 */
contract ReentrancyGuard {
    bool private _locked;

    modifier nonReentrant() {
        require(!_locked, "ReentrancyGuard: reentrant call");
        _locked = true;
        _;
        _locked = false;
    }
}

interface IBEP20 {
    function transfer(address recipient, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

contract Presale is ReentrancyGuard {
    // --------------------------------------------------------------------------------
    // State variables
    // --------------------------------------------------------------------------------

    // Marked as immutable; set once in constructor, cannot be changed afterwards
    address public immutable owner;
    IBEP20 public immutable token;

    uint256 public rate;                     // Number of tokens per 1 BNB
    uint256 public startTime;                // Presale start (UNIX timestamp)
    uint256 public endTime;                  // Presale end   (UNIX timestamp)
    uint256 public minContribution;          // Minimum BNB contribution
    uint256 public maxContribution;          // Maximum BNB contribution
    uint256 public totalTokensSold;          // Track total tokens sold

    mapping(address => bool) public whitelisted;     // Whitelist mapping
    mapping(address => uint256) public contributions;// Track each address' total contributed BNB

    mapping(address => uint256) public lastPurchaseTime; // For cooldown
    uint256 public cooldownPeriod = 60;      // Default 1 minute cooldown
    bool public isPaused = false;            // Owner can pause the sale

    uint256 public uniqueBuyers;             // Count how many unique addresses purchased
    mapping(address => bool) private hasBought; // Whether an address has purchased before

    // --------------------------------------------------------------------------------
    // Events
    // --------------------------------------------------------------------------------
    event TokensPurchased(address indexed buyer, uint256 amount);
    event FundsWithdrawn(address indexed owner, uint256 amount);
    event UnsoldTokensWithdrawn(address indexed owner, uint256 amount);
    event Whitelisted(address indexed user);
    event RemovedFromWhitelist(address indexed user);

    // New events for updates (per Slither suggestion)
    event ContributionLimitsUpdated(uint256 newMin, uint256 newMax);
    event RateUpdated(uint256 newRate);

    // --------------------------------------------------------------------------------
    // Modifiers
    // --------------------------------------------------------------------------------
    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    modifier saleActive() {
        require(block.timestamp >= startTime && block.timestamp <= endTime, "Sale is not active");
        _;
    }

    modifier notPaused() {
        require(!isPaused, "Presale is paused");
        _;
    }

    modifier cooldownEnforced() {
        require(block.timestamp >= lastPurchaseTime[msg.sender] + cooldownPeriod, "Cooldown period active");
        _;
    }

    // --------------------------------------------------------------------------------
    // Constructor
    // --------------------------------------------------------------------------------
    constructor(
        IBEP20 _token,
        uint256 _rate,
        uint256 _startTime,
        uint256 _endTime,
        uint256 _minContribution,
        uint256 _maxContribution
    ) {
        owner = msg.sender;         // set immutable owner
        token = _token;             // set immutable token
        rate = _rate;
        startTime = _startTime;
        endTime = _endTime;
        minContribution = _minContribution;
        maxContribution = _maxContribution;
    }

    // --------------------------------------------------------------------------------
    // Whitelist Functions
    // --------------------------------------------------------------------------------
    function addToWhitelist(address user) external onlyOwner {
        whitelisted[user] = true;
        emit Whitelisted(user);
    }

    function removeFromWhitelist(address user) external onlyOwner {
        whitelisted[user] = false;
        emit RemovedFromWhitelist(user);
    }

    function batchAddToWhitelist(address[] calldata users) external onlyOwner {
        for (uint256 i = 0; i < users.length; i++) {
            whitelisted[users[i]] = true;
            emit Whitelisted(users[i]);
        }
    }

    function batchRemoveFromWhitelist(address[] calldata users) external onlyOwner {
        for (uint256 i = 0; i < users.length; i++) {
            whitelisted[users[i]] = false;
            emit RemovedFromWhitelist(users[i]);
        }
    }

    // --------------------------------------------------------------------------------
    // Owner Functions
    // --------------------------------------------------------------------------------

    /**
     * @dev Update the cooldown period (in seconds).
     */
    function setCooldownPeriod(uint256 newCooldown) external onlyOwner {
        cooldownPeriod = newCooldown;
    }

    /**
     * @dev Pause the presale.
     */
    function pauseSale() external onlyOwner {
        isPaused = true;
    }

    /**
     * @dev Resume the presale.
     */
    function resumeSale() external onlyOwner {
        isPaused = false;
    }

    /**
     * @dev Update the min and max BNB contribution (emits an event).
     *      Renamed parameters to follow naming convention (mixedCase).
     */
    function updateContributionLimits(uint256 newMin, uint256 newMax) external onlyOwner {
        require(newMin <= newMax, "Min must be <= max");
        minContribution = newMin;
        maxContribution = newMax;

        // Emit event recommended by Slither
        emit ContributionLimitsUpdated(newMin, newMax);
    }

    // --------------------------------------------------------------------------------
    // Buy Tokens
    // --------------------------------------------------------------------------------
    function buyTokens()
        external
        payable
        saleActive
        notPaused
        cooldownEnforced
        nonReentrant
    {
        require(whitelisted[msg.sender], "You are not whitelisted");
        require(msg.value >= minContribution, "Below minimum contribution");
        require(contributions[msg.sender] + msg.value <= maxContribution, "Above maximum contribution");

        if (!hasBought[msg.sender]) {
            hasBought[msg.sender] = true;
            uniqueBuyers++;
        }

        // Calculate how many tokens you get, including any bonus
        uint256 tokenAmount = msg.value * calculateRate(msg.value);

        uint256 contractBalance = token.balanceOf(address(this));
        require(contractBalance >= tokenAmount, "Insufficient tokens in contract");

        // Effects
        contributions[msg.sender] += msg.value;
        totalTokensSold += tokenAmount;
        lastPurchaseTime[msg.sender] = block.timestamp;

        // Interactions
        require(token.transfer(msg.sender, tokenAmount), "Token transfer failed");

        emit TokensPurchased(msg.sender, tokenAmount);
    }

    // --------------------------------------------------------------------------------
    // Rate Calculation
    // --------------------------------------------------------------------------------
    function calculateRate(uint256 contribution) public view returns (uint256) {
        // Example tiered bonuses:
        // >= 10 BNB -> +20% tokens
        // >= 5 BNB  -> +10% tokens
        // <  5 BNB  -> no bonus
        if (contribution >= 10 ether) {
            return (rate * 120) / 100; // 20% bonus
        } else if (contribution >= 5 ether) {
            return (rate * 110) / 100; // 10% bonus
        } else {
            return rate;
        }
    }

    // --------------------------------------------------------------------------------
    // Withdraw Functions
    // --------------------------------------------------------------------------------

    /**
     * @dev Withdraw all BNB raised.
     *      Uses .call for flexibility and nonReentrant for safety.
     */
    function withdrawFunds() external onlyOwner nonReentrant {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");

        // We use .call because it's more flexible than .transfer and recommended in modern Solidity.
        // The call result is checked with `require(success, ...)` to avoid silent failures.
        (bool success, ) = owner.call{value: balance}("");
        require(success, "Transfer failed");

        emit FundsWithdrawn(owner, balance);
    }

    /**
     * @dev Withdraw remaining (unsold) tokens to the owner.
     */
    function withdrawUnsoldTokens() external onlyOwner nonReentrant {
        uint256 remainingTokens = token.balanceOf(address(this));
        require(remainingTokens > 0, "No tokens to withdraw");

        bool success = token.transfer(owner, remainingTokens);
        require(success, "Token transfer failed");

        emit UnsoldTokensWithdrawn(owner, remainingTokens);
    }

    /**
     * @dev Update how many tokens per 1 BNB (and emit an event).
     */
    function updateRate(uint256 newRate) external onlyOwner {
        rate = newRate;
        emit RateUpdated(newRate);
    }

    /**
     * @dev Update presale start and end times.
     */
    function updateSaleTime(uint256 newStartTime, uint256 newEndTime) external onlyOwner {
        require(newStartTime < newEndTime, "Start must be < end");
        startTime = newStartTime;
        endTime = newEndTime;
    }

    // --------------------------------------------------------------------------------
    // Fallbacks
    // --------------------------------------------------------------------------------
    receive() external payable {
        revert("Use buyTokens() to purchase tokens");
    }

    fallback() external payable {
        revert("Function not found. Use buyTokens()");
    }
}