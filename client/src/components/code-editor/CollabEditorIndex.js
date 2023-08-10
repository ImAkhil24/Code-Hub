import React, { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../../constants/theme";
import { GlobalStyles } from "../../constants/global";
import { useDarkMode } from "../../utils/useDarkMode";
import Footer from "./Footer.js";
import Editor from "./CollabEditor";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isLoggedIn } from "../../utils/isLoggedIn";
import HeaderCollab from "./HeaderCollab";
import { checkAccess } from "../../actions/interview-link";
// import io from 'socket.io-client';
// const ENDPOINT = 'http://localhost:3000';

// const socket = io(ENDPOINT);

const CollabEditorIndex = () => {
  const params = useParams();
  const [theme, toggleTheme, componentMounted] = useDarkMode();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);

  const themeMode = theme === "light" ? lightTheme : darkTheme;

  const checkAccessForLink = async () => {
    const access = await checkAccess(params.id);
    if (!access) navigate("/");
  };

  if (!componentMounted) {
    return <div />;
  }

  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyles />
      <HeaderCollab theme={theme} toggleTheme={toggleTheme} link={params.id} />
      <Footer />
      <Editor theme={theme} roomId={params.id} />
    </ThemeProvider>
  );
};

export default CollabEditorIndex;
