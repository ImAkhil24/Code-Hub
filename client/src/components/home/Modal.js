import React, { useRef, useEffect } from "react";
import styles from "./styles/header.module.css";

function useOutsideAlerter(ref, unclick) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        // alert("You clicked outside of me!");
        unclick();
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, unclick]);
}

function Modal({ user, logout, unclick }) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, unclick);

  return (
    <div ref={wrapperRef} className={styles.modal}>
      <img alt="User Profile" className={styles.modalImage} src={user.image || "pp.jpg"} />
      <h3 className={styles.modalName}>{user.name}</h3>
      <h4 className={styles.modalEmail}>{user.email}</h4>
      <button onClick={logout} className={styles.modalButton}>
        Logout
      </button>
    </div>
  );
}

export default Modal;
