import React from 'react';
import styles from './styles.module.css';

const Header = ({ text = '' }) => (
  <header className={styles.appHeader}>
    <h2>{text}</h2>
  </header>
);

export default Header;