import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './PriceConverter.module.css';

interface PriceConverterProps {
  cstAmount: string | number;
  tokenPrice: number;
}

export const PriceConverter: React.FC<PriceConverterProps> = ({ cstAmount, tokenPrice }) => {
  const [bnbPrice, setBnbPrice] = useState<number>(0);
  const amount = Number(cstAmount) || 0;
  const bnbAmount = amount * tokenPrice;
  const usdAmount = bnbAmount * bnbPrice;

  useEffect(() => {
    const fetchBnbPrice = async () => {
      try {
        const response = await fetch('https://api.binance.com/api/v3/ticker/price?symbol=BNBUSDT');
        const data = await response.json();
        setBnbPrice(Number(data.price));
      } catch (error) {
        console.error('Error fetching BNB price:', error);
      }
    };

    fetchBnbPrice();
    const interval = setInterval(fetchBnbPrice, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      className={styles.converter}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={styles.conversionRow}>
        <span className={styles.label}>Amount:</span>
        <motion.span 
          className={styles.value}
          key={amount}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
        >
          {amount.toFixed(2)} CST
        </motion.span>
      </div>
      <div className={styles.conversionRow}>
        <span className={styles.label}>BNB:</span>
        <motion.span 
          className={styles.value}
          key={bnbAmount}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
        >
          ≈ {bnbAmount.toFixed(4)} BNB
        </motion.span>
      </div>
      <div className={styles.conversionRow}>
        <span className={styles.label}>USD:</span>
        <motion.span 
          className={styles.value}
          key={usdAmount}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
        >
          ≈ ${usdAmount.toFixed(2)}
        </motion.span>
      </div>
    </motion.div>
  );
};
