import React from 'react';
import styles from "../styles/Home.module.css"

const Preloader = () => {
  return (
    <div className={styles.preloader}>
      <div className={styles.loadingtext}>
          <h1>
            ALTCLAN
          </h1>
          
          <p>
            Alternative fashion
          </p>
        </div>
    </div>
  );
};

export default Preloader;
