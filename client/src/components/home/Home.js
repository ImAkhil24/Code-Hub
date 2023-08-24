import React from "react";
import Header from "./Header";
import styles from "./styles/home.module.css";
import Typist from "react-typist";
import { motion } from "framer-motion";
import BottomFooter from "./BottomFooter";
import Terminal from "./Terminal";
import BG from "../../assets/bg.svg";
import { useCallback } from "react";
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";
import config from "./config";
const Home = () => {
  const particlesInit = useCallback(async (engine) => {
    console.log(engine);
    await loadSlim(engine);
  }, []);
  const particlesLoaded = useCallback(async (container) => {
    await console.log(container);
  }, []);
  return (
    <>
      <div className={styles.container}>
        <Particles
          id="tsparticles"
          options={config}
          init={particlesInit}
          loaded={particlesLoaded}
        />
        <div style={{ zIndex: 1 }}>
          <Header />
          <div className={styles.minContainer}>
            <div className={styles.left}>
              <motion.h1
                initial={{ x: "-100vw" }}
                animate={{ x: 0 }}
                transition={{ duration: 2 }}
                whileHover={{
                  scale: 0.8,
                  transition: { duration: 1 },
                }}
                style={{
                  // background: "red",
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                <img
                  src={BG}
                  style={{
                    width: "25rem",
                    height: "25rem",
                  }}
                />
                <div>
                  Code
                  <span className={styles.heading}>Hub</span>
                </div>
              </motion.h1>
              <Typist startDelay={2} avgTypingDelay={120}>
                Faster, Lighter and Better IDE for everyone...
              </Typist>
            </div>
            <div className={styles.right}>
              <Terminal />
            </div>
          </div>
          <BottomFooter />
        </div>
      </div>
    </>
  );
};

export default Home;
