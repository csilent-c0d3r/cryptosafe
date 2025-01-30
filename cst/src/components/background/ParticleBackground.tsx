import { useEffect, useRef } from 'react';
import styles from './ParticleBackground.module.css';

export const ParticleBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const particles = Array.from({ length: 100 }).map(() => {
      const particle = document.createElement('div');
      particle.className = styles.particle;
      
      const size = Math.random() * 3;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.animationDelay = `${Math.random() * -20}s`;
      particle.style.animationDuration = `${15 + Math.random() * 15}s`;
      
      return particle;
    });

    container.innerHTML = '';
    container.append(...particles);

    return () => {
      if (container) {
        container.innerHTML = '';
      }
    };
  }, []);

  return <div ref={containerRef} className={styles.background} />;
};
