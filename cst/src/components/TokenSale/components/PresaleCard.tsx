import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from './PresaleCard.module.css';

export function PresaleCard({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className={styles.header}>
        <div className={styles.logoWrapper}>
          <Image
            src="/logo.png"
            alt="CST Logo"
            width={80}
            height={80}
            className={styles.logo}
          />
          <div className={styles.glow} />
        </div>
        <h1 className={styles.title}>CST Token Presale</h1>
      </div>
      
      {children}
    </motion.div>
  );
}
