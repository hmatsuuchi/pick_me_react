import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
// Axios
import instance from "../axios/axios";
// Navigation - CSS
import "./Navigation.scss";

function Navigation() {
  const [isAuth, setIsAuth] = useState(false);
  // gets current url
  const location = useLocation();

  useEffect(() => {
    if (localStorage.getItem("access_token") !== null) {
      setIsAuth(true);
    }
  }, []);

  function handleLogoutClick() {
    (async () => {
      try {
        /* eslint-disable no-unused-vars */
        const { data } = await instance.post("authentication/logout/", {
          refresh_token: localStorage.getItem("refresh_token"),
        });
        /* eslint-disable no-unused-vars */
        localStorage.clear();
        window.location.href = "/login";
      } catch (e) {
        console.log("logout not working", e);
      }
    })();
  }

  function handleLoginClick() {
    window.location.href = "/login/";
  }

  return (
    <nav>
      <ul>
        {isAuth && (
          <li>
            <button onClick={handleLogoutClick}>logout</button>
          </li>
        )}
        {!isAuth && location.pathname !== "/login" && (
          <li>
            <button onClick={handleLoginClick}>login</button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;
