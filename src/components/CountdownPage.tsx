import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import CountdownTimer from './CountdownTimer';
import Popup from './Popup';
import styles from './CountdownPage.module.css';

const CountdownPage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [targetDate, setTargetDate] = useState<Date>(() => {
    // Default to March 5, 2026 at 00:00:00
    return new Date('2026-03-05T00:00:00');
  });

  const loadTargetDate = async () => {
    try {
      const docRef = doc(db, 'settings', 'countdown');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.targetDate) {
          setTargetDate(new Date(data.targetDate));
        }
      }
    } catch (error) {
      console.error('Error loading target date:', error);
    }
  };

  useEffect(() => {
    // Check if user is admin and redirect to dashboard
    if (currentUser) {
      navigate('/admin');
      return;
    }
    loadTargetDate();
  }, [currentUser, navigate]);

  return (
    <>
      <Popup />
      <div className={styles.container}>
        <div className={styles.backgroundImage}></div>
        <div className={styles.countdownWrapper}>
          <CountdownTimer targetDate={targetDate} />
        </div>
      </div>
    </>
  );
};

export default CountdownPage;

