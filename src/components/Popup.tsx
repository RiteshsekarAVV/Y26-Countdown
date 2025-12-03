import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import styles from './Popup.module.css';

interface PopupData {
  enabled: boolean;
  title: string;
  content: string;
  updatedAt: string;
}

const Popup = () => {
  const [popupData, setPopupData] = useState<PopupData | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPopupData();
  }, []);

  const loadPopupData = async () => {
    try {
      const docRef = doc(db, 'settings', 'popup');
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data() as PopupData;
        
        // Check if popup is enabled and if user hasn't dismissed it
        if (data.enabled) {
          const dismissedKey = `popup_dismissed_${data.updatedAt}`;
          const isDismissed = localStorage.getItem(dismissedKey) === 'true';
          
          if (!isDismissed) {
            setPopupData(data);
            setIsVisible(true);
          }
        }
      }
    } catch (error) {
      console.error('Error loading popup data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (popupData?.updatedAt) {
      const dismissedKey = `popup_dismissed_${popupData.updatedAt}`;
      localStorage.setItem(dismissedKey, 'true');
    }
    setIsVisible(false);
  };

  if (loading || !isVisible || !popupData) {
    return null;
  }

  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
        <button 
          className={styles.closeButton}
          onClick={handleClose}
          aria-label="Close popup"
        >
          ×
        </button>
        <div className={styles.content}>
          {popupData.title && (
            <h2 className={styles.title}>{popupData.title}</h2>
          )}
          <div 
            className={styles.text}
            dangerouslySetInnerHTML={{ __html: popupData.content }}
          />
        </div>
      </div>
    </div>
  );
};

export default Popup;

