import React, { useState } from "react";
import styles from "./styles/header.module.css";
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch, useSelector } from "react-redux";
import Modal from "./Modal";
import { googleAuth, fetchUser, logoutUser } from "../../actions/user";
import { useNavigate } from "react-router-dom";
import MenuDrawer from "./Menu";
import {Menu} from "react-feather"
import { isLoggedIn } from "../../utils/isLoggedIn";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [clicked, setClicked] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const responseGoogle = (res) => {
    // console.log(res);
    authorize(res.clientId, res.credential);
  };

  const authorize = async (client_id, jwtToken) => {
    if (localStorage.getItem("codex_token")) {
      const res = await fetchUser();
      dispatch(res);
    } else {
      const res = await googleAuth({ client_id, jwtToken });
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

    const toggleMenu = () => {
      setOpenMenu(!openMenu);
    };

  return (
    <>
      <div className={styles.header_container}>
        {isLoggedIn() && (
          <Menu size={50} color={"#ffffff"} onClick={toggleMenu} />
        )}
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
                src={user.image || "./pp.jpg"}
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
      <MenuDrawer open={openMenu} handleClose={toggleMenu} />
    </>
  );
};

export default Header;
