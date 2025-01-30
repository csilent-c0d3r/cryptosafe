import { useState } from 'react';
import { motion } from 'framer-motion';
import { PriceConverter } from './PriceConverter';
import styles from './PurchaseForm.module.css';

interface PurchaseFormProps {
  account: string;
  balance: string;
  onPurchase: (amount: number) => Promise<void>;
  isLoading: boolean;
  transactionHash?: string;
}

export const PurchaseForm: React.FC<PurchaseFormProps> = ({
  account,
  balance,
  onPurchase,
  isLoading,
  transactionHash
}) => {
  const [amount, setAmount] = useState<string>('');
  const TOKEN_PRICE_BNB = 0.002; // Move this to config if not already there

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className={styles.walletInfo}>
        <motion.span
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          {account.slice(0, 6)}...{account.slice(-4)}
        </motion.span>
        <motion.span
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          {parseFloat(balance).toFixed(4)} BNB
        </motion.span>
      </div>

      <PriceConverter 
        cstAmount={amount} 
        tokenPrice={TOKEN_PRICE_BNB}
      />

      <form className={styles.form} onSubmit={(e) => {
        e.preventDefault();
        if (amount) onPurchase(Number(amount));
      }}>
        <div className={styles.inputGroup}>
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter CST amount"
            className={styles.input}
            disabled={isLoading}
            min="0"
            step="1"
          />
          <span className={styles.inputSuffix}>CST</span>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className={styles.button}
          disabled={isLoading || !amount}
        >
          {isLoading ? (
            <span className={styles.loader}></span>
          ) : 'Buy CST Tokens'}
        </motion.button>
      </form>

      {transactionHash && (
        <motion.a
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          href={`https://bscscan.com/tx/${transactionHash}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.transactionLink}
        >
          View Transaction
        </motion.a>
      )}
    </motion.div>
  );
};
