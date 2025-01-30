import React from 'react';
import styles from './Whitepaper.module.css';

const Whitepaper = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1> CryptoSafe Whitepaper</h1>
        
        <section className={styles.section}>
          <h2>🌟 Executive Summary</h2>
          <p>SafeCrypto Wallet is an innovative cryptocurrency wallet designed to democratize and secure access to digital assets. Built on the Binance Smart Chain blockchain, with plans to integrate other major blockchains.</p>
          <div className={styles.highlights}>
            <div className={styles.highlight}>🇨🇭 Based in Switzerland</div>
            <div className={styles.highlight}>💎 10M USDT ICO Goal</div>
            <div className={styles.highlight}>🌐 Global Accessibility</div>
          </div>
        </section>

        <section className={styles.section}>
          <h2>🎯 Our Mission</h2>
          <div className={styles.subsection}>
            <h3>🚀 Vision</h3>
            <p>To make cryptocurrencies accessible and convenient for everyone. SafeCrypto Wallet combines security, simplicity, and advanced features to become a go-to wallet for investors of all skill levels.</p>
          </div>
        </section>

        <section className={styles.section}>
          <h2>💡 Problem & Solution</h2>
          <div className={styles.features}>
            <div className={styles.feature}>
              <h3>🎨 Simplicity</h3>
              <p>Intuitive interface inspired by Phantom Wallet</p>
            </div>
            <div className={styles.feature}>
              <h3>🔐 Security</h3>
              <p>Two-factor authentication and bank-grade encryption</p>
            </div>
            <div className={styles.feature}>
              <h3>💰 Savings</h3>
              <p>Rounding up and automated micro-investment solutions</p>
            </div>
            <div className={styles.feature}>
              <h3>💳 Payments</h3>
              <p>Real-Time Crypto-Fiat Conversion with integrated bank card</p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2>⚡ Key Features</h2>
          <div className={styles.subsection}>
            <div className={styles.featureGrid}>
              <div className={styles.gridItem}>
                <h3>🔗 Multi-Blockchain</h3>
                <p>Integration planned for Ethereum and Binance Smart Chain</p>
              </div>
              <div className={styles.gridItem}>
                <h3>🤖 AI Companion</h3>
                <p>AI assistant with personalized analysis</p>
              </div>
              <div className={styles.gridItem}>
                <h3>🏛️ SafeCrypto Vault</h3>
                <p>Secure storage for sensitive data</p>
              </div>
              <div className={styles.gridItem}>
                <h3>👥 Social Hub</h3>
                <p>Social platform for investors</p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2>💎 Tokenomics</h2>
          <div className={styles.tokenomics}>
            <div className={styles.tokenInfo}>
              <h3>🪙 Token Details</h3>
              <p>Name: CryptoSafe Token (CST)</p>
              <p>Total Supply: 10 billion CST</p>
            </div>
            <div className={styles.distribution}>
              <h3>📊 Distribution</h3>
              <div className={styles.distributionItem}>
                <span>60% Presale (ICO)</span>
                <div className={styles.progressBar}><div style={{width: '60%'}}></div></div>
              </div>
              <div className={styles.distributionItem}>
                <span>20% Team Reserve</span>
                <div className={styles.progressBar}><div style={{width: '20%'}}></div></div>
              </div>
              <div className={styles.distributionItem}>
                <span>10% Marketing</span>
                <div className={styles.progressBar}><div style={{width: '10%'}}></div></div>
              </div>
              <div className={styles.distributionItem}>
                <span>10% Staking Rewards</span>
                <div className={styles.progressBar}><div style={{width: '10%'}}></div></div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2>🤝 Why Invest in SafeCrypto?</h2>
          <div className={styles.benefits}>
            <div className={styles.benefit}>🔒 Cutting-edge security</div>
            <div className={styles.benefit}>🌈 User-friendly interface</div>
            <div className={styles.benefit}>🎁 Loyalty rewards</div>
            <div className={styles.benefit}>📈 Long-term growth potential</div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Whitepaper;
