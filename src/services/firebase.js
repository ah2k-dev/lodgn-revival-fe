import firebase from "firebase/compat/app";
import "firebase/compat/auth";

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
// };

const firebaseConfig = {
  apiKey: "AIzaSyALvDM3tdG9y2oxSsS-uZqLtbR7xjM2DKI",
  authDomain: "lodgn-revival.firebaseapp.com",
  projectId: "lodgn-revival",
  storageBucket: "lodgn-revival.appspot.com",
  messagingSenderId: "282019920101",
  appId: "1:282019920101:web:c4480e4f017ced831f7c0c"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => {
  console.log("sign in with google");
  auth.signInWithPopup(provider);
};

export default firebase;
