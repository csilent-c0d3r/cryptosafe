import React from 'react';
import styles from './SafeChatSection.module.css';
import { motion } from 'framer-motion';

const SafeChatSection = () => {
  return (
    <section id="safechat" className={styles.safeChatSection}>
      <div className={styles.container}>
        <div className={styles.content}>
          <motion.div 
            className={styles.textContent}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className={styles.title}>Blockchain-Powered Secure Chat</h2>
            <p className={styles.description}>
              Experience the future of communication with our blockchain-based messaging system.
              Built on decentralized technology, ensuring unparalleled security, privacy, and
              complete control over your digital conversations.
            </p>
            <div className={styles.features}>
              <div className={styles.feature}>
                <div className={styles.featureIcon}>🔗</div>
                <h3>Blockchain Security</h3>
                <p>Messages encrypted and stored on decentralized networks</p>
              </div>
              <div className={styles.feature}>
                <div className={styles.featureIcon}>📡</div>
                <h3>Decentralized Chat</h3>
                <p>No central server, peer-to-peer communication</p>
              </div>
              <div className={styles.feature}>
                <div className={styles.featureIcon}>🔐</div>
                <h3>Smart Contract Privacy</h3>
                <p>Advanced encryption backed by blockchain protocols</p>
              </div>
              <div className={styles.feature}>
                <div className={styles.featureIcon}>📱</div>
                <h3>Cross-Chain Support</h3>
                <p>Compatible with multiple blockchain networks</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className={styles.imageContainer}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className={styles.imageWrapper}>
              <div className={styles.blockchainAnimation}>
                <div className={styles.simpleChain}>
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className={styles.simpleBlock}>
                      <div className={styles.blockContent}>
                        <div className={styles.blockHash}></div>
                        <div className={styles.blockData}></div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className={styles.chainLines}></div>
              </div>
              <div className={styles.glowEffect}></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SafeChatSection;
