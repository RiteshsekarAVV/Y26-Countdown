import { useEffect, useState } from 'react';
import styles from './LoadingScreen.module.css';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFadingOut(true);
      // Wait for fade out animation to complete
      setTimeout(() => {
        onComplete();
      }, 500);
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={`${styles.loadingScreen} ${isFadingOut ? styles.fadeOut : ''}`}>
      <div className={styles.logoContainer}>
        <div className={styles.logoWrapper}>
          <img 
            src="/Yugam Logo.png" 
            alt="Yugam Logo" 
            className={styles.logo}
          />
          <div className={styles.shimmer}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;

