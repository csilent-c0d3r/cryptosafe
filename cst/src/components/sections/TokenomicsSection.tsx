import React from 'react';
import styles from './TokenomicsSection.module.css';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const TokenomicsSection = () => {
  const tokenDistribution = [
    { name: 'Presale', value: 40, color: '#00eac7' },
    { name: 'Liquidity', value: 20, color: '#3168d8' },
    { name: 'Development', value: 15, color: '#9c6dff' },
    { name: 'Marketing', value: 15, color: '#ff4b8b' },
    { name: 'Team', value: 10, color: '#ffb86c' }
  ];

  const tokenInfo = [
    { label: 'Token Name', value: 'CryptoSafe Token' },
    { label: 'Symbol', value: 'CST' },
    { label: 'Total Supply', value: '1,000,000,000' },
    { label: 'Decimals', value: '18' },
    { label: 'Network', value: 'BNB Chain' }
  ];

  return (
    <section className={styles.tokenomicsSection}>
      <motion.div 
        className={styles.content}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className={styles.title}>Tokenomics</h2>
        
        <div className={styles.gridContainer}>
          {/* Token Info Card */}
          <motion.div 
            className={styles.infoCard}
            whileHover={{ scale: 1.02 }}
          >
            <h3>Token Information</h3>
            <div className={styles.tokenInfoGrid}>
              {tokenInfo.map((info) => (
                <div key={info.label} className={styles.infoItem}>
                  <span className={styles.label}>{info.label}</span>
                  <span className={styles.value}>{info.value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Distribution Chart */}
          <div className={styles.chartCard}>
            <h3>Token Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={tokenDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  innerRadius={60}
                  dataKey="value"
                  animationBegin={0}
                  animationDuration={1500}
                >
                  {tokenDistribution.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className={styles.legend}>
              {tokenDistribution.map((item) => (
                <div key={item.name} className={styles.legendItem}>
                  <span 
                    className={styles.legendColor} 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className={styles.legendLabel}>{item.name}</span>
                  <span className={styles.legendValue}>{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tax Information */}
        <motion.div 
          className={styles.taxInfo}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <h3>Transaction Tax</h3>
          <div className={styles.taxGrid}>
            <div className={styles.taxCard}>
              <h4>Buy Tax: 5%</h4>
              <ul>
                <li>2% Liquidity</li>
                <li>2% Marketing</li>
                <li>1% Development</li>
              </ul>
            </div>
            <div className={styles.taxCard}>
              <h4>Sell Tax: 5%</h4>
              <ul>
                <li>2% Liquidity</li>
                <li>2% Marketing</li>
                <li>1% Development</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default TokenomicsSection;
