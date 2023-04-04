import React, { createContext, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import firebase from "./firebase";

const AppContext = createContext();
export default function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const prevPage = location.state;

  function login(setIsLoading) {
    firebase
      .auth()
      .signInAnonymously()
      .then((a) => {
        console.log("user", a.user);
        setIsLoading(false);
        setUser(a.user);
        navigate(prevPage ? prevPage.from.pathname : "../TaaslaLegal/home", {
          replace: true,
        });
      })
      .catch((err) => console.log(err));
    // navigate("../TaaslaLegal/home", { replace: true });
  }
  function signUp(values) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(values.email, values.password)
      .then((res) => {
        res.user.displayName = values.fname + "" + values.lname;
        res.user.phoneNumber = "+234" + values.phone;
        res.user.photoURL = values.uri;
      });
  }
  function logout() {
    firebase
      .auth()
      .signOut()
      .then(() => setUser(false))
      .catch((err) => console.log(err));
  }
  return (
    <AppContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
