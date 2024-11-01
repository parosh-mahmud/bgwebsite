// components/LoadingSpinner.tsx
import React from 'react';
import styles from '..//..//../styles/LoadingSpinner.module.css';

const LoadingSpinner: React.FC = () => (
  <div className={styles.spinnerOverlay}>
    <div className={styles.spinner}>
      <div className={styles.spinnerCircle}></div>
      <span className={styles.spinnerText}>BG</span>
    </div>
  </div>
);

export default LoadingSpinner;
