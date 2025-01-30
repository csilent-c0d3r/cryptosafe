'use client';

import { motion } from 'framer-motion';
import styles from './Roadmap.module.css';
const roadmapData = [
  {
    phase: 'Phase 1',
    title: 'Project Launch',
    date: 'Q4 2024',
    items: [
      'Platform Development Kickoff',
      'Team Formation & Expansion',
      'Initial Smart Contract Development',
      'Whitepaper Release'
    ],
    status: 'completed',
    description: "Kick-off development and secure early-stage funding..."
  },
  {
    phase: 'Phase 2',
    title: 'Token Sale',
    date: 'Q1 2025',
    items: [
      'Private Sale Launch',
      'Public Presale',
      'Exchange Listings',
      'Community Building'
    ],
    status: 'active',
    description: "Engage community with presales and build momentum..."
  },
  {
    phase: 'Phase 3',
    title: 'Platform Launch',
    date: 'Q2 2025',
    items: [
      'Beta Platform Release',
      'Security Audits',
      'Partnership Announcements',
      'Marketing Campaign'
    ],
    status: 'upcoming',
    description: "Deploy a beta platform and conduct stringent audits..."
  },
  {
    phase: 'Phase 4',
    title: 'Expansion',
    date: 'Q3 2025',
    items: [
      'Global Market Entry',
      'Additional Features',
      'Mobile App Launch',
      'Ecosystem Growth'
    ],
    status: 'upcoming',
    description: "Expand global reach and enhance user experience..."
  }
];

export default function Roadmap() {
  return (
    <div id="roadmapSection" className={styles.roadmapContainer}>
      <h1 className={styles.title}>Project Roadmap</h1>
      
      <div className={styles.timeline}>
        {roadmapData.map((phase, index) => (
          <motion.div
            key={index}
            className={`${styles.timelineCard} ${styles[phase.status]}`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <div className={styles.phaseHeader}>
              <span className={styles.phase}>{phase.phase}</span>
              <span className={styles.date}>{phase.date}</span>
            </div>
            <h3 className={styles.phaseTitle}>{phase.title}</h3>
            <p className={styles.phaseDescription}>{phase.description}</p>
            <ul className={styles.milestones}>
              {phase.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <div className={styles.statusBadge}>
              {phase.status === 'completed' && '✓'}
              {phase.status === 'active' && '●'}
              {phase.status === 'upcoming' && '○'}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
