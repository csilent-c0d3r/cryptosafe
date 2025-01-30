import React from 'react';
import styles from './TeamSection.module.css';
import Image from 'next/image';
import { motion } from 'framer-motion';

const TeamSection = () => {
  const team = [
    {
      name: "Theo Leboeuf",
      role: "CEO & Founder",
      bio: "Crypto expert and visionary leader with 5 years in marketing.",
      image: "/team/theo.jpg",
      socialLinks: {
        twitter: "#",
        linkedin: "#",
        github: "#"
      }
    },
    {
      name: "Danial Habibi",
      role: "CTO & Co-Founder",
      bio: "Blockchain and AI expert bridging traditional and digital finance.",
      image: "/team/danial.jpg",
      socialLinks: {
        twitter: "#",
        linkedin: "#",
        github: "#"
      }
    },
    {
      name: "Hana Kim",
      role: "Marketing Head",
      bio: "Marketing professional specializing in community management.",
      image: "/team/hana.jpg",
      socialLinks: {
        twitter: "#",
        linkedin: "#",
        github: "#"
      }
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 50,
      rotateX: -15
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        duration: 1.5,
        bounce: 0.4
      }
    },
    hover: {
      y: -20,
      rotateY: 5,
      transition: {
        type: "spring",
        duration: 0.4
      }
    }
  };

  return (
    <section className={styles.teamSection}>
      <div className={styles.glowOrbs}>
        <div className={styles.glowOrb}></div>
        <div className={styles.glowOrbSecondary}></div>
      </div>
      
      <motion.h2 
        className={styles.sectionTitle}
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        Meet Our Team
      </motion.h2>

      <motion.div 
        className={styles.teamGrid}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {team.map((member) => (
          <motion.div
            key={member.name}
            className={styles.teamCard}
            variants={cardVariants}
            whileHover="hover"
          >
            <div className={styles.cardInner}>
              <div className={styles.imageWrapper}>
                <motion.div 
                  className={styles.orbGlow}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <Image
                  src={member.image}
                  alt={member.name}
                  width={200}
                  height={200}
                  className={styles.memberImage}
                />
              </div>
              <motion.div 
                className={styles.memberInfo}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h3>{member.name}</h3>
                <span className={styles.role}>{member.role}</span>
                <p className={styles.bio}>{member.bio}</p>
                <div className={styles.socialLinks}>
                  {Object.entries(member.socialLinks).map(([platform, link]) => (
                    <motion.a
                      key={platform}
                      href={link}
                      className={styles.socialLink}
                      whileHover={{ scale: 1.2, y: -5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <i className={`fab fa-${platform}`}></i>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default TeamSection;
