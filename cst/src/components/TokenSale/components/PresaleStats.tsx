import { motion } from 'framer-motion';
import styles from './PresaleStats.module.css';

interface PresaleStatsProps {
  progress: number;
  raised: number;
  timeLeft: number;
}

export function PresaleStats({ progress, raised, timeLeft }: PresaleStatsProps) {
  return (
    <div className={styles.statsContainer}>
      <div className={styles.progressSection}>
        <div className={styles.progressBar}>
          <motion.div 
            className={styles.progressFill}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
        <div className={styles.progressInfo}>
          <span>{raised.toFixed(2)} CST</span>
          <span>{progress.toFixed(1)}%</span>
        </div>
      </div>

      <div className={styles.statsGrid}>
        <motion.div 
          className={styles.stat}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className={styles.statValue}>0.002 BNB</span>
          <span className={styles.statLabel}>Token Price</span>
        </motion.div>

        <motion.div 
          className={styles.stat}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <span className={styles.statValue}>{timeLeft}d</span>
          <span className={styles.statLabel}>Time Left</span>
        </motion.div>

        <motion.div 
          className={styles.stat}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <span className={styles.statValue}>10,000</span>
          <span className={styles.statLabel}>Max Buy</span>
        </motion.div>
      </div>
    </div>
  );
}
