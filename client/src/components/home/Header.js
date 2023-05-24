import React, { useState } from "react";
import styles from "./styles/header.module.css";
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch, useSelector } from "react-redux";
import Modal from "./Modal";
import { auth, fetchUser, logoutUser } from "../../actions/user";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [clicked, setClicked] = useState(false);

  const responseGoogle = (res) => {
    // console.log(res);
    authorize(res.clientId, res.credential);
  };

  const authorize = async (client_id, jwtToken) => {
    if (localStorage.getItem("codex_token")) {
      const res = await fetchUser();
      dispatch(res);
    } else {
      const res = await auth({ client_id, jwtToken });
      //   console.log(res);
      dispatch(res);
    }
  };

  const logout = () => {
    dispatch(logoutUser());
    navigate("/");
    setClicked(false);
  };

  const handleClick = () => {
    setClicked(!clicked);
  };

  //   const toggleMenu = () => {
  //     setOpenMenu(!openMenu);
  //   };

  return (
    <>
      <div className={styles.header_container}>
        {user.name === "" ? (
          <GoogleLogin
            onSuccess={responseGoogle}
            onFailure={(e) => {
              console.log(e);
            }}
          />
        ) : (
          <>
            <div className={styles.profileImage}>
              <img
                alt="User Profile"
                onClick={handleClick}
                src={user.image}
                className={styles.image}
              />
              {clicked ? (
                <Modal
                  user={user}
                  logout={logout}
                  unclick={() => setClicked(false)}
                />
              ) : null}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Header;
