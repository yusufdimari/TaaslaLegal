import React, { useState, useEffect, useContext, createContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import firebase from "./firebase";
import { getAuth, updateProfile } from "firebase/auth";
const authContext = createContext();
const fAuth = getAuth();

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}
// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(authContext);
};
// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const prevPage = location.state;

  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.
  const signin = async (email, password) => {
    const response = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((err) => {
        // setIsLoading(false);
        setTimeout(() => {
          alert(err == "auth/network-request-failed" ? "No Network" : err);
        }, 1000);
      });
    setUser(response?.user);
    // setIsLoading(false);
    navigate(prevPage ? prevPage.from.pathname : "../TaaslaLegal/client", {
      replace: true,
    });
    return response?.user;
  };
  const signup = async (values) => {
    // setIsLoading(true);
    const response = await firebase
      .auth()
      .createUserWithEmailAndPassword(values.email, values.password)
      .then(() => {
        signin(values.email, values.password).then(() => {
          updateProfile(fAuth.currentUser, {
            displayName: values.fullname,
          })
            .then(() => {
              setProfile({ fullname: values.fullname });
            })
            .catch((err) => {
              // setIsLoading(false);
              console.log(err, "update profile error");
            });
        });
      })
      .catch((err) => {
        // setIsLoading(false);
        alert("sign-up error", err);
      });
    return response.user;
  };
  const signout = async () => {
    await firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("logged out");
        setUser(false);
        navigate("../TaaslaLegal/login");
      });
  };
  const sendPasswordResetEmail = async (email) => {
    await firebase.auth().sendPasswordResetEmail(email);
    return true;
  };
  const confirmPasswordReset = async (code, password) => {
    await firebase.auth().confirmPasswordReset(code, password);
    return true;
  };
  const getProfile = (setData) => {
    firebase
      .firestore()
      .collection("users")
      .doc(user.uid)
      .onSnapshot((snapshot) => {
        setData(snapshot.data());
        // setData(snapshot.data());
      });
  };
  const setProfile = (data, setIsLoading) => {
    firebase
      .firestore()
      .collection("users")
      .doc(fAuth.currentUser.uid)
      .set(data)
      .then(() => {
        navigate("../TaaslaLegal/");
        // setIsLoading(false);
      })
      .catch((err) => {
        console.log(err, "set profile error");
        // setIsLoading(false);
      });
  };
  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  // useEffect(() => {
  //   const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
  //     if (user) {
  //       setUser(user);
  //     } else {
  //       setUser(false);
  //     }
  //   });
  //   // Cleanup subscription on unmount
  //   return () => unsubscribe();
  // }, []);
  // Return the user object and auth methods
  return {
    user,
    setProfile,
    signin,
    signup,
    signout,
    sendPasswordResetEmail,
    confirmPasswordReset,
    getProfile,
  };
}
