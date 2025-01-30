import React from 'react';
import styles from './RoadmapSection.module.css';
import { motion } from 'framer-motion';

const roadmapData = [
  {
    phase: "Q1 2024",
    title: "Project Launch",
    items: [
      "Token Development",
      "Website Launch",
      "Community Building",
      "Smart Contract Audit"
    ],
    status: "completed"
  },
  {
    phase: "Q2 2024",
    title: "Platform Development",
    items: [
      "SafeChat Beta Launch",
      "AI Integration Development",
      "Marketing Campaign",
      "Exchange Listings"
    ],
    status: "in-progress"
  },
  {
    phase: "Q3 2024",
    title: "Ecosystem Expansion",
    items: [
      "Mobile App Launch",
      "Cross-chain Integration",
      "NFT Marketplace",
      "Staking Platform"
    ],
    status: "upcoming"
  },
  {
    phase: "Q4 2024",
    title: "Global Adoption",
    items: [
      "Major Exchange Listings",
      "Governance Implementation",
      "DeFi Partnerships",
      "Global Marketing Campaign"
    ],
    status: "upcoming"
  }
];

const RoadmapSection = () => {
  return (
    <section id="roadmap" className={styles.roadmapSection}>
      <motion.h2 
        className={styles.title}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Roadmap
      </motion.h2>

      <div className={styles.timeline}>
        {roadmapData.map((phase, index) => (
          <motion.div 
            key={phase.phase}
            className={`${styles.timelineItem} ${styles[phase.status]}`}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
          >
            <div className={styles.timelineContent}>
              <div className={styles.phaseTag}>{phase.phase}</div>
              <h3>{phase.title}</h3>
              <ul>
                {phase.items.map((item, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + (i * 0.1) }}
                    viewport={{ once: true }}
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
            <div className={styles.timelinePoint}>
              <div className={styles.point}></div>
              <div className={styles.line}></div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default RoadmapSection;
