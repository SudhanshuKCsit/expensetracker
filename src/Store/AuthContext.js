import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "./auth-slice";
const AuthContext = React.createContext({
  token: "",
  email: "",
  isLoggedIn: false,
  login: (token, email) => {},
  logout: () => {},
});
export const AuthContextProvider = (props) => {
  const storedToken = localStorage.getItem("token");
  const storedEmail = localStorage.getItem("email");
  const [token, setToken] = useState(storedToken || "");
  const [email, setEmail] = useState(storedEmail || "");
  const dispatch = useDispatch();
  const userIsLoggedIn = token.trim() !== "";
  const loginHandler = (token, email) => {
    setToken(token);
    setEmail(email);
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
    dispatch(authActions.login({ email, token }));
  };
  const logoutHandler = useCallback(() => {
    setToken("");
    setEmail("");
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    dispatch(authActions.logout());
  }, [dispatch]);
  useEffect(() => {
    let logoutTimer;
    if (userIsLoggedIn) {
      logoutTimer = setTimeout(() => {
        logoutHandler();
        alert("You have been logged out due to inactivity.");
      }, 60 * 60 * 1000);
    }
    return () => clearTimeout(logoutTimer);
  }, [userIsLoggedIn, logoutHandler]);
  const contextValue = {
    token,
    email,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
