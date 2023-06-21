import styles from "./App.module.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import setAuthToken from "./utils/setAuthToken.js"

if (localStorage.getItem("codex_token")) {
  setAuthToken(localStorage.getItem("codex_token"));
}

function App() {
  return (
    <Router>
      <div className={styles.App}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
