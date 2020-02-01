import React from 'react';

import styles from './styles.module.css';

const Loader = ({ size = 100 }) => (
  <div 
    className={styles.loader} 
    style={{ 
        width: `${size}px`,
        height: `${size}px`
      }}
    >
  </div>
);

export default Loader;