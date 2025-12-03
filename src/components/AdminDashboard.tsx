import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import CountdownTimer from './CountdownTimer';
import styles from './AdminDashboard.module.css';

const AdminDashboard = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [targetDate, setTargetDate] = useState<string>('2026-03-05T00:00:00');
  const [popupEnabled, setPopupEnabled] = useState(false);
  const [popupTitle, setPopupTitle] = useState('');
  const [popupContent, setPopupContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savingPopup, setSavingPopup] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    loadTargetDate();
    loadPopupData();
  }, [currentUser, navigate]);

  const loadTargetDate = async () => {
    try {
      const docRef = doc(db, 'settings', 'countdown');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.targetDate) {
          setTargetDate(data.targetDate);
        }
      }
    } catch (error) {
      console.error('Error loading target date:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadPopupData = async () => {
    try {
      const docRef = doc(db, 'settings', 'popup');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setPopupEnabled(data.enabled || false);
        setPopupTitle(data.title || '');
        setPopupContent(data.content || '');
      }
    } catch (error) {
      console.error('Error loading popup data:', error);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    try {
      await setDoc(doc(db, 'settings', 'countdown'), {
        targetDate: targetDate,
        updatedAt: new Date().toISOString(),
        updatedBy: currentUser?.email
      });
      setMessage('Target date saved successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error saving target date:', error);
      setMessage('Error saving target date');
    } finally {
      setSaving(false);
    }
  };

  const handleSavePopup = async () => {
    setSavingPopup(true);
    setMessage('');
    try {
      await setDoc(doc(db, 'settings', 'popup'), {
        enabled: popupEnabled,
        title: popupTitle,
        content: popupContent,
        updatedAt: new Date().toISOString(),
        updatedBy: currentUser?.email
      });
      setMessage('Popup settings saved successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error saving popup settings:', error);
      setMessage('Error saving popup settings');
    } finally {
      setSavingPopup(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading...</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.dashboard}>
        <div className={styles.header}>
          <h1 className={styles.title}>Admin Dashboard</h1>
          <div className={styles.userInfo}>
            <span className={styles.email}>{currentUser?.email}</span>
            <button onClick={handleLogout} className={styles.logoutButton}>
              Logout
            </button>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.previewSection}>
            <h2 className={styles.sectionTitle}>Countdown Preview</h2>
            <div className={styles.preview}>
              <CountdownTimer targetDate={new Date(targetDate)} />
            </div>
          </div>

          <div className={styles.settingsSection}>
            <h2 className={styles.sectionTitle}>Countdown Settings</h2>
            <div className={styles.settingGroup}>
              <label htmlFor="targetDate" className={styles.label}>
                Target Date & Time
              </label>
              <input
                id="targetDate"
                type="datetime-local"
                value={targetDate.slice(0, 16)}
                onChange={(e) => setTargetDate(e.target.value + ':00')}
                className={styles.input}
              />
              <p className={styles.helpText}>
                Set the date and time when the countdown should reach zero
              </p>
            </div>

            {message && !message.includes('Popup') && (
              <div className={message.includes('Error') ? styles.errorMessage : styles.successMessage}>
                {message}
              </div>
            )}

            <button
              onClick={handleSave}
              disabled={saving}
              className={styles.saveButton}
            >
              {saving ? 'Saving...' : 'Save Countdown Settings'}
            </button>
          </div>

          <div className={styles.settingsSection}>
            <h2 className={styles.sectionTitle}>Popup Settings</h2>
            <div className={styles.settingGroup}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={popupEnabled}
                  onChange={(e) => setPopupEnabled(e.target.checked)}
                  className={styles.checkbox}
                />
                <span>Enable Popup</span>
              </label>
              <p className={styles.helpText}>
                When enabled, the popup will show on page load (users can dismiss it)
              </p>
            </div>

            <div className={styles.settingGroup}>
              <label htmlFor="popupTitle" className={styles.label}>
                Popup Title
              </label>
              <input
                id="popupTitle"
                type="text"
                value={popupTitle}
                onChange={(e) => setPopupTitle(e.target.value)}
                className={styles.input}
                placeholder="Enter popup title (optional)"
              />
            </div>

            <div className={styles.settingGroup}>
              <label htmlFor="popupContent" className={styles.label}>
                Popup Content
              </label>
              <textarea
                id="popupContent"
                value={popupContent}
                onChange={(e) => setPopupContent(e.target.value)}
                className={styles.textarea}
                placeholder="Enter popup content (HTML supported)"
                rows={8}
              />
              <p className={styles.helpText}>
                You can use HTML tags like &lt;p&gt;, &lt;strong&gt;, &lt;br&gt;, &lt;ul&gt;, &lt;li&gt;, etc.
              </p>
            </div>

            {message && message.includes('Popup') && (
              <div className={message.includes('Error') ? styles.errorMessage : styles.successMessage}>
                {message}
              </div>
            )}

            <button
              onClick={handleSavePopup}
              disabled={savingPopup}
              className={styles.saveButton}
            >
              {savingPopup ? 'Saving...' : 'Save Popup Settings'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

