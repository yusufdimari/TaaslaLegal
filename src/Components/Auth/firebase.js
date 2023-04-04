// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAEnfrNz26nq-Hc7X4IzVKMN99vUmNyVWM",
  authDomain: "taaslalegal-f5306.firebaseapp.com",
  projectId: "taaslalegal-f5306",
  storageBucket: "taaslalegal-f5306.appspot.com",
  messagingSenderId: "241974360380",
  appId: "1:241974360380:web:568ca82e7cd9d84e060639",
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
firebase.firestore();
export default firebase;
