import { useState, useEffect } from 'react';
import styles from './CountdownTimer.module.css';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownTimerProps {
  targetDate: Date;
}

const CountdownTimer = ({ targetDate }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const target = targetDate.getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className={styles.countdownContainer}>
      <div className={styles.countdownNumbers}>
        <div className={styles.countdownItem}>
          <span className={styles.number}>{String(timeLeft.days).padStart(2, '0')}</span>
          <span className={styles.label}>Days</span>
        </div>
        <span className={styles.separator}>:</span>
        <div className={styles.countdownItem}>
          <span className={styles.number}>{String(timeLeft.hours).padStart(2, '0')}</span>
          <span className={styles.label}>Hours</span>
        </div>
        <span className={styles.separator}>:</span>
        <div className={styles.countdownItem}>
          <span className={styles.number}>{String(timeLeft.minutes).padStart(2, '0')}</span>
          <span className={styles.label}>Minutes</span>
        </div>
        <span className={styles.separator}>:</span>
        <div className={styles.countdownItem}>
          <span className={styles.number}>{String(timeLeft.seconds).padStart(2, '0')}</span>
          <span className={styles.label}>Secs</span>
        </div>
      </div>
      <p className={styles.message}>
      <span>Till the Grandeur Begins</span>
      </p>
    </div>
  );
};

export default CountdownTimer;

