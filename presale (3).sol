// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

interface IBEP20 {
    function transfer(address recipient, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

contract Presale {
    address public owner;
    IBEP20 public token;
    uint256 public rate; // Number of tokens per BNB
    uint256 public startTime;
    uint256 public endTime;
    uint256 public minContribution;
    uint256 public maxContribution;
    uint256 public totalTokensSold;

    mapping(address => uint256) public contributions;
    mapping(address => uint256) public lastPurchaseTime;
    mapping(address => bool) public whitelisted;

    bool public isPaused = false;
    uint256 public cooldownPeriod = 60; // Cooldown in seconds
    uint256 public uniqueBuyers;
    mapping(address => bool) private hasBought;

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

    event TokensPurchased(address indexed buyer, uint256 amount);
    event FundsWithdrawn(address indexed owner, uint256 amount);
    event UnsoldTokensWithdrawn(address indexed owner, uint256 amount);
    event Whitelisted(address indexed user);
    event RemovedFromWhitelist(address indexed user);

    constructor(
        IBEP20 _token,
        uint256 _rate,
        uint256 _startTime,
        uint256 _endTime,
        uint256 _minContribution,
        uint256 _maxContribution
    ) {
        owner = msg.sender;
        token = _token;
        rate = _rate;
        startTime = _startTime;
        endTime = _endTime;
        minContribution = _minContribution;
        maxContribution = _maxContribution;
    }

    // Add an address to the whitelist
    function addToWhitelist(address user) external onlyOwner {
        whitelisted[user] = true;
        emit Whitelisted(user);
    }

    // Remove an address from the whitelist
    function removeFromWhitelist(address user) external onlyOwner {
        whitelisted[user] = false;
        emit RemovedFromWhitelist(user);
    }

    // Update the cooldown period
    function setCooldownPeriod(uint256 newCooldown) external onlyOwner {
        cooldownPeriod = newCooldown;
    }

    // Pause the presale
    function pauseSale() external onlyOwner {
        isPaused = true;
    }

    // Resume the presale
    function resumeSale() external onlyOwner {
        isPaused = false;
    }

    // Buy tokens during the presale
    function buyTokens() external payable saleActive notPaused cooldownEnforced {
        require(whitelisted[msg.sender], "You are not whitelisted");
        require(msg.value >= minContribution, "Below minimum contribution");
        require(contributions[msg.sender] + msg.value <= maxContribution, "Above maximum contribution");

        if (!hasBought[msg.sender]) {
            hasBought[msg.sender] = true;
            uniqueBuyers++;
        }

        uint256 tokenAmount = msg.value * calculateRate(msg.value);
        require(token.balanceOf(address(this)) >= tokenAmount, "Insufficient tokens in contract");

        contributions[msg.sender] += msg.value;
        totalTokensSold += tokenAmount;
        lastPurchaseTime[msg.sender] = block.timestamp;

        require(token.transfer(msg.sender, tokenAmount), "Token transfer failed");
        emit TokensPurchased(msg.sender, tokenAmount);
    }

    // Calculate rate based on contribution tiers
    function calculateRate(uint256 contribution) public view returns (uint256) {
        if (contribution >= 10 ether) {
            return rate * 120 / 100; // 20% bonus
        } else if (contribution >= 5 ether) {
            return rate * 110 / 100; // 10% bonus
        } else {
            return rate;
        }
    }

    // Withdraw funds raised during the presale
    function withdrawFunds() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");

        payable(owner).transfer(balance);
        emit FundsWithdrawn(owner, balance);
    }

    // Withdraw unsold tokens
    function withdrawUnsoldTokens() external onlyOwner {
        uint256 remainingTokens = token.balanceOf(address(this));
        require(remainingTokens > 0, "No tokens to withdraw");

        require(token.transfer(owner, remainingTokens), "Token transfer failed");
        emit UnsoldTokensWithdrawn(owner, remainingTokens);
    }

    // Update the rate of tokens per BNB
    function updateRate(uint256 newRate) external onlyOwner {
        rate = newRate;
    }

    // Update the start and end times for the presale
    function updateSaleTime(uint256 newStartTime, uint256 newEndTime) external onlyOwner {
        startTime = newStartTime;
        endTime = newEndTime;
    }
}
