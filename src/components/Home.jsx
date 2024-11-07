import React from "react";
import styles from "./styles/Home.module.css";
import Banner from "../assets/banner.png";
import Lock from "../assets/lock.png";
const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.image_container}>
        <img src={Banner} alt="" className={styles.image} />
      </div>
      <h1 className={styles.heading}>Pocket Notes</h1>
      <p className={styles.content}>
        Send and receive messages without keeping your phone online. Use Pocket
        Notes on up to 4 linked devices and 1 mobile phone
      </p>
      <p className={styles.footer}>
        <img src={Lock} alt="" />
        <span>end-to-end encrypted</span>
      </p>
    </div>
  );
};

export default Home;
