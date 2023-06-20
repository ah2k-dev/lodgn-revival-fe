import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDDzudxglnX0kEKNuTSY63FsvXUDDwWybg",
  authDomain: "lodgn-app.firebaseapp.com",
  projectId: "lodgn-app",
  storageBucket: "lodgn-app.appspot.com",
  messagingSenderId: "559554565035",
  appId: "1:559554565035:web:b3ba2c1595fe63244cf8ee",
  measurementId: "G-YSJZ3NX3Q0"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
};

export default firebase;
