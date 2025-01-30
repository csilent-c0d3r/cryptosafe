import React from 'react';
import styles from './Logo.module.css';

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
}

const Logo = ({ width = 250, height = 50, className }: LogoProps) => {
  return (
    <div className={`${styles.logoWrapper} ${className || ''}`} style={{ width, height }}>
      <div className={styles.logoContainer}>
        <div className={styles.cube}>
          <div className={`${styles.face} ${styles.front}`}>CS</div>
          <div className={`${styles.face} ${styles.back}`}>CS</div>
          <div className={`${styles.face} ${styles.right}`}></div>
          <div className={`${styles.face} ${styles.left}`}></div>
          <div className={`${styles.face} ${styles.top}`}></div>
          <div className={`${styles.face} ${styles.bottom}`}></div>
        </div>
        <span className={styles.logoText}>CryptoSafe</span>
      </div>
    </div>
  );
};

export default Logo;
