import React, { useEffect } from 'react';
import styles from './AiSection.module.css';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaChartPie, FaChartLine, FaBrain, FaRobot, FaLock, FaGlobe, FaUserShield } from 'react-icons/fa';
import Link from 'next/link';

const AISection = () => {
  const features = [
    {
      icon: <FaShieldAlt />,
      title: "Fraud Detection",
      description: "AI monitors transactions to detect and prevent fraudulent activities in real-time.",
      color: "#00eac7"
    },
    {
      icon: <FaChartPie />,
      title: "Personalized Insights",
      description: "Get tailored financial insights and recommendations based on your transaction history.",
      color: "#3168d8"
    },
    {
      icon: <FaChartLine />,
      title: "Transaction Analysis",
      description: "Understand your spending patterns with AI-powered transaction analysis.",
      color: "#ff4b8b"
    },
    {
      icon: <FaBrain />,
      title: "Smart Predictions",
      description: "Predict market trends and optimize your investment strategy with AI algorithms.",
      color: "#9c6dff"
    },
    {
      icon: <FaRobot />,
      title: "Automated Trading",
      description: "Set up intelligent trading rules based on AI market analysis and insights.",
      color: "#ffb86c"
    },
    {
      icon: <FaLock />,
      title: "Risk Management",
      description: "AI-powered risk assessment and automated security protocols.",
      color: "#ff5555"
    },
    {
      icon: <FaGlobe />,
      title: "Cross-Chain Intelligence",
      description: "Smart cross-chain analytics and optimization for multi-blockchain transactions and portfolio management.",
      color: "#00b8d4"
    },
    {
      icon: <FaUserShield />,
      title: "AI Identity Protection",
      description: "Advanced biometric authentication and behavioral analysis to ensure maximum account security.",
      color: "#64dd17"
    }
  ];

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 50,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    },
    hover: {
      scale: 1.05,
      y: -10,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  // Add mouse follow effect for cards
  useEffect(() => {
    const cards = document.querySelectorAll(`.${styles.featureCard}`);
    
    const handleMouseMove = (e: MouseEvent) => {
      const card = e.currentTarget as HTMLElement;
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      card.style.setProperty('--mouse-x', `${x}%`);
      card.style.setProperty('--mouse-y', `${y}%`);
    };

    cards.forEach(card => {
      card.addEventListener('mousemove', handleMouseMove as EventListener);
    });

    return () => {
      cards.forEach(card => {
        card.removeEventListener('mousemove', handleMouseMove as EventListener);
      });
    };
  }, []);

  return (
    <section className={styles.aiSection}>
      <div className={styles.glowEffect}></div>
      
      <motion.div 
        className={styles.content}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <motion.div className={styles.headerContent} variants={textVariants}>
          <h2 className={styles.title}>
            <motion.span 
              className={styles.highlight}
              animate={{
                backgroundPosition: ["0%", "100%"],
                transition: { duration: 8, repeat: Infinity }
              }}
            >
              AI Integration
            </motion.span>
            <br />in CryptoSafe Wallet
          </h2>
          <p className={styles.description}>
            Experience the power of Artificial Intelligence in your wallet. 
            CryptoSafe leverages AI to make your transactions smarter, safer, and more efficient.
          </p>
        </motion.div>

        <motion.div 
          className={styles.featuresGrid}
          variants={containerVariants}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className={styles.featureCard}
              variants={cardVariants}
              whileHover="hover"
              custom={index}
            >
              <div className={styles.iconWrapper} style={{ backgroundColor: `${feature.color}20` }}>
                <motion.div
                  className={styles.icon}
                  style={{ color: feature.color }}
                  animate={{
                    scale: [1, 1.2, 1],
                    transition: { duration: 2, repeat: Infinity }
                  }}
                >
                  {feature.icon}
                </motion.div>
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <div className={styles.cardGlow} style={{ background: feature.color }}></div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className={styles.ctaSection}
          variants={textVariants}
        >
          <motion.div 
            className={styles.statsHighlight}
            whileHover={{ scale: 1.05 }}
          >
            <span className={styles.statNumber}>98%</span>
            <span className={styles.statLabel}>Accuracy in Fraud Detection</span>
          </motion.div>

          <Link href="/ai-details" className={styles.ctaButton}>
            <span>Explore AI Features</span>
            <motion.span 
              className={styles.arrow}
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AISection;
