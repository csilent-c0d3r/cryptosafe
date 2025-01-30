'use client';

import React from 'react';
import Link from 'next/link';
import Countdown from './Countdown';
import AnimatedBackground from '../background/AnimatedBackground';
import styles from './Hero.module.css';

export const Hero = () => {
  const handlePresaleClick = () => {
    // Update path to match your app directory structure
    window.location.href = '/tokensale';  // Removed the query parameter for simplicity
  };

  return (
    <div className={styles.heroContainer}>
      <AnimatedBackground />
      <div className={styles.welcomeSection}>
        <h1 className={styles.welcomeText}>
          <span className={styles.welcomeWord}>The Future</span>
          <span className={styles.welcomeWord}>of DeFi</span>
          <span className={styles.welcomeHighlight}>
            Secure. Transparent. Decentralized.
          </span>
        </h1>
      </div>
      
      <div className={styles.content}>
        <div className={styles.textContent}>
          <h2 className={styles.mainTitle}>CryptoSafe</h2>
          <p className={styles.description}>
            Building the next generation of decentralized financial infrastructure.
            Secure, transparent, and accessible to everyone.
          </p>
          <Countdown />
          <div className={styles.buttonGroup}>
            <button 
              onClick={handlePresaleClick}
              className={styles.primaryButton}
            >
              Join Presale Now | 1 CST = 0.002 BNB
            </button>
            <Link href="/whitepaper" className={styles.secondaryButton}>
              Read Whitepaper
            </Link>
          </div>
        </div>

        <div className={styles.statsContainer}>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>$10M+</span>
            <span className={styles.statLabel}>Total Value Locked</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>50K+</span>
            <span className={styles.statLabel}>Active Users</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>99.9%</span>
            <span className={styles.statLabel}>Uptime</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>24/7</span>
            <span className={styles.statLabel}>Support</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;