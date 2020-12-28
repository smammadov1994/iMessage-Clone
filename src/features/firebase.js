/** @format */

import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCVpJa2oWNUMoWSSUmCXr9yqzb7laM4rgM",
  authDomain: "imessageclone-9bdb9.firebaseapp.com",
  projectId: "imessageclone-9bdb9",
  storageBucket: "imessageclone-9bdb9.appspot.com",
  messagingSenderId: "313774281517",
  appId: "1:313774281517:web:bc9b41cfa90152b9be39a4",
  measurementId: "G-WJL2D2MGJC",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
