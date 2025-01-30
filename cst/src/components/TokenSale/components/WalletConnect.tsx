import { motion } from 'framer-motion';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import styles from './WalletConnect.module.css';

interface WalletConnectProps {
  onConnect: () => void;
  isLoading: boolean;
}

export function WalletConnect({ onConnect, isLoading }: WalletConnectProps) {
  return (
    <motion.div 
      className={styles.connectContainer}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <ConnectButton.Custom>
        {({ openConnectModal }) => (
          <button 
            onClick={() => {
              openConnectModal();
              onConnect();
            }}
            className={styles.connectButton}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className={styles.loader} />
                Connecting...
              </>
            ) : (
              <>
                <span className={styles.buttonIcon}>🔗</span>
                Connect Wallet
              </>
            )}
          </button>
        )}
      </ConnectButton.Custom>
    </motion.div>
  );
}
