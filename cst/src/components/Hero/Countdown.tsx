import React, { useState, useEffect } from 'react';
import styles from './Countdown.module.css';

const Countdown = () => {
  const targetDate = new Date('2025-06-31T00:00:00'); // Set your target date here
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +targetDate - +new Date();
      const totalDuration = +targetDate - +new Date('2024-01-01'); // Start date
      
      // Calculate progress (0-100)
      const progressPercent = 100 - (difference / totalDuration * 100);
      setProgress(Math.min(Math.max(progressPercent, 0), 100));

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)).toString().padStart(2, '0'),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24).toString().padStart(2, '0'),
          minutes: Math.floor((difference / 1000 / 60) % 60).toString().padStart(2, '0'),
          seconds: Math.floor((difference / 1000) % 60).toString().padStart(2, '0')
        });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  },);

  return (
    <div className={styles.countdownContainer}>
      <div className={styles.progressBar}>
        <div 
          className={styles.progressFill} 
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <div className={styles.timeUnits}>
        <div className={styles.timeUnit}>
          <div className={styles.number}>{timeLeft.days}</div>
          <div className={styles.label}>Days</div>
        </div>
        <div className={styles.separator}>:</div>
        <div className={styles.timeUnit}>
          <div className={styles.number}>{timeLeft.hours}</div>
          <div className={styles.label}>Hours</div>
        </div>
        <div className={styles.separator}>:</div>
        <div className={styles.timeUnit}>
          <div className={styles.number}>{timeLeft.minutes}</div>
          <div className={styles.label}>Minutes</div>
        </div>
        <div className={styles.separator}>:</div>
        <div className={styles.timeUnit}>
          <div className={styles.number}>{timeLeft.seconds}</div>
          <div className={styles.label}>Seconds</div>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
