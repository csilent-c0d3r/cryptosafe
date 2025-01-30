'use client';

import { useState, useEffect, useCallback } from "react";
import { PresaleCard } from "./components/PresaleCard";
import { PresaleStats } from "./components/PresaleStats";
import { WalletConnect } from "./components/WalletConnect";
import { PurchaseForm } from "./components/PurchaseForm";
import { usePresaleContract } from "./hooks/usePresaleContract";
import { NotificationToast } from "../UI/NotificationToast/NotificationToast";
import styles from "./TokenSale.module.css";
import AnimatedBackground from "../background/AnimatedBackground";

export default function TokenSale() {
  const [notification, setNotification] = useState<string>("");
  const {
    account,
    balance,
    presaleProgress,
    totalRaised,
    timeLeft,
    isLoading,
    handleConnect,
    handlePurchase,
    transactionSignature
  } = usePresaleContract();

  // Wrap connect handler in useCallback
  const handleAutoConnect = useCallback(async () => {
    try {
      await handleConnect();
    } catch (error) {
      if (error instanceof Error) {
        setNotification(`Failed to auto-connect: ${error.message}`);
      }
    }
  }, [handleConnect]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.get('connect') === 'true') {
      handleAutoConnect();
    }
  }, [handleAutoConnect]);

  // Handle purchase callback
  const onPurchase = async (amount: number) => {
    try {
      await handlePurchase(amount.toString());
      setNotification("Purchase successful!");
    } catch (error) {
      if (error instanceof Error) {
        setNotification(`Purchase failed: ${error.message}`);
      } else {
        setNotification("Purchase failed: An unknown error occurred.");
      }
    }
  };

  // Handle connect callback
  const onConnect = async () => {
    try {
      await handleConnect();
      setNotification("Wallet connected successfully!");
    } catch (error) {
      if (error instanceof Error) {
        setNotification(`Connection failed: ${error.message}`);
      } else {
        setNotification("Connection failed: An unknown error occurred.");
      }
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <AnimatedBackground />
      <NotificationToast 
        message={notification} 
        onClose={() => setNotification("")} 
      />
      
      <div className={styles.container}>
        <PresaleCard>
          <div className={styles.header}>
          </div>

          <PresaleStats 
            progress={presaleProgress}
            raised={parseFloat(totalRaised)}
            timeLeft={timeLeft}
          />
          
          {!account ? (
            <WalletConnect 
              onConnect={onConnect}
              isLoading={isLoading}
            />
          ) : (
            <PurchaseForm
              account={account}
              balance={balance}
              onPurchase={onPurchase}
              isLoading={isLoading}
              transactionHash={transactionSignature}
            />
          )}
        </PresaleCard>
      </div>
    </div>
  );
}
