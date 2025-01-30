import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESSES, TOKEN_PRICE_BNB, BSC_CHAIN_ID } from '@/config/contracts/addresses';
import contractAbi from '@/config/contracts/abi.json';

export const usePresaleContract = () => {
  const [account, setAccount] = useState<string>('');
  const [balance, setBalance] = useState<string>('0');
  const [presaleProgress, setPresaleProgress] = useState<number>(0);
  const [totalRaised, setTotalRaised] = useState<string>('0');
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [transactionSignature, setTransactionSignature] = useState<string>('');

  // Add new states for presale info
  const [hardCap] = useState<string>('0'); // Remove setter if unused
  const [minContribution, setMinContribution] = useState<string>('0');
  const [maxContribution, setMaxContribution] = useState<string>('0');

  // Add contract-specific states
  const [rate, setRate] = useState<string>('0');
  const [uniqueBuyers, setUniqueBuyers] = useState<number>(0);
  const [cooldownPeriod, setCooldownPeriod] = useState<number>(60);
  const [lastPurchaseTime, setLastPurchaseTime] = useState<number>(0);

  const whitelistUser = async (userAddress: string) => {
    try {
      const response = await fetch("https://cryptosafe.ch/whitelist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userAddress }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error || 'Whitelist failed');
      }

      return data;
    } catch (error) {
      console.error("Error whitelisting user:", error);
      throw error;
    }
  };

  const handleConnect = async () => {
    try {
      setIsLoading(true);
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        const balance = await provider.getBalance(accounts[0]);
        setAccount(accounts[0]);
        setBalance(ethers.formatEther(balance));
        
        // Attempt to whitelist the user after successful connection
        await whitelistUser(accounts[0]);
      } else {
        throw new Error("Please install MetaMask!");
      }
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPresaleStatus = useCallback(async () => {
    if (!window.ethereum) return;
    
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(
        CONTRACT_ADDRESSES.PRESALE,
        contractAbi,
        provider
      );

      // Fetch all contract data in parallel
      const [
        totalSold,
        currentRate,
        end,
        min,
        max,
        buyers,
        cooldown
      ] = await Promise.all([
        contract.totalTokensSold(),
        contract.rate(),
        contract.startTime(),
        contract.endTime(),
        contract.minContribution(),
        contract.maxContribution(),
        contract.uniqueBuyers(),
        contract.cooldownPeriod()
      ]);

      // If user is connected, get their last purchase time
      if (account) {
        const lastPurchase = await contract.lastPurchaseTime(account);
        setLastPurchaseTime(Number(lastPurchase));
      }

      // Convert and set values
      setTotalRaised(ethers.formatEther(totalSold));
      setRate(currentRate.toString());
      setMinContribution(ethers.formatEther(min));
      setMaxContribution(ethers.formatEther(max));
      setUniqueBuyers(Number(buyers));
      setCooldownPeriod(Number(cooldown));

      // Calculate time left
      const now = Math.floor(Date.now() / 1000);
      const timeLeftSeconds = Number(end) - now;
      setTimeLeft(Math.max(0, Math.floor(timeLeftSeconds / 86400))); // Convert to days

      // Calculate progress (assuming hardcap is max contribution * 1000 or similar logic)
      const hardCapWei = max * BigInt(1000); // Example calculation
      const progress = (Number(totalSold) / Number(hardCapWei)) * 100;
      setPresaleProgress(Math.min(progress, 100));

    } catch (error) {
      console.error("Error fetching presale status:", error);
      throw error;
    }
  }, [account]);

  const handlePurchase = async (amount: string) => {
    try {
      setIsLoading(true);
      
      if (!window.ethereum) throw new Error("No wallet found");
      if (!account) throw new Error("Please connect your wallet first");

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      
      // Switch to BSC network
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: BSC_CHAIN_ID }],
      });

      const contract = new ethers.Contract(
        CONTRACT_ADDRESSES.PRESALE,
        contractAbi,
        signer
      );

      // Calculate BNB amount
      const bnbAmount = Number(amount) * TOKEN_PRICE_BNB;
      const bnbAmountWei = ethers.parseEther(bnbAmount.toString());

      // Debug logs
      console.log('Contract address:', CONTRACT_ADDRESSES.PRESALE);
      console.log('BNB Amount Wei:', bnbAmountWei.toString());
      console.log('Account:', account);

      try {
        // Check if contract is accessible
        const isWhitelisted = await contract.whitelisted(account);
        console.log('Is Whitelisted:', isWhitelisted);
        
        if (!isWhitelisted) {
          throw new Error("Your address is not whitelisted");
        }

        // Send transaction without gas estimation first
        const tx = await contract.buyTokens({
          value: bnbAmountWei,
          gasLimit: 500000 // Set a fixed gas limit
        });

        console.log('Transaction submitted:', tx.hash);
        setTransactionSignature(tx.hash);
        
        // Wait for confirmation
        const receipt = await tx.wait();
        console.log('Transaction confirmed:', receipt);
        
        // Refresh data after successful purchase
        await fetchPresaleStatus();
        
        // Update user's balance
        const newBalance = await provider.getBalance(account);
        setBalance(ethers.formatEther(newBalance));

        return receipt.hash;
      } catch (contractError: unknown) {
        console.error('Contract interaction error:', contractError);
        if (contractError instanceof Error && 'data' in contractError) {
          // Try to decode the error
          const errorData = (contractError as { data: string | undefined }).data?.toString();
          throw new Error(`Contract error: ${errorData}`);
        }
        throw contractError;
      }

    } catch (error: unknown) {
      console.error("Purchase error:", error);
      
      // More detailed error handling
      if (error instanceof Error) {
        if ('data' in error) {
          throw new Error(`Contract error: ${(error as { data: string | undefined }).data}`);
        }
        throw error;
      } else {
        throw new Error("Transaction failed with unknown error");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPresaleStatus();
    const interval = setInterval(fetchPresaleStatus, 30000); // Update every 30s
    return () => clearInterval(interval);
  }, [fetchPresaleStatus]);

  return {
    account,
    balance,
    presaleProgress,
    totalRaised,
    timeLeft,
    isLoading,
    handleConnect,
    handlePurchase,
    transactionSignature,
    whitelistUser,
    minContribution,
    maxContribution,
    hardCap,
    rate,
    uniqueBuyers,
    cooldownPeriod,
    lastPurchaseTime
  };
};
