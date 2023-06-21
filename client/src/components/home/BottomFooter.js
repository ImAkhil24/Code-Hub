import React from "react";
import styles from "./styles/bottomFooter.module.css";
import { Code } from "react-feather";
import { FaGooglePlusG, FaLinkedinIn, FaGithub } from "react-icons/fa";

function BottomFooter() {
  return (
    <div className={styles.container}>
      <div className={styles.minContainer}>
        <div className={styles.headBox}>
          <p className={styles.brand}>
            Code<span className={styles.letter}>Hub</span>
          </p>
          <p className={styles.slogan}>
            You do the coding, we will take care of the rest. Take interview in
            real-time with video interaction.
          </p>
        </div>
        <div className={styles.dev}>
          <div className={styles.devHead}>Developers :</div>
          <h4>Samarpreet Singh</h4>
          <h4>Akhil Badoni</h4>
          <h4>Atul Kumar Maurya</h4>
        </div>
        <div className={styles.break}></div>
      </div>
      <div className={styles.icons}>
        <div className={styles.icon}>
          <FaGithub></FaGithub>
        </div>
        <div className={styles.icon}>
          <FaGooglePlusG></FaGooglePlusG>
        </div>
        <div className={styles.icon}>
          <FaLinkedinIn></FaLinkedinIn>
        </div>
      </div>
      <p className={styles.copyright}> &copy; CodeHub. All Rights reserved 2023</p>
    </div>
  );
}

export default BottomFooter;