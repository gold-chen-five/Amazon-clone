// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDaAa2QYEINvLEpM6qDxHvkFoFMhM4DDwE",
    authDomain: "clone-a3ee8.firebaseapp.com",
    projectId: "clone-a3ee8",
    storageBucket: "clone-a3ee8.appspot.com",
    messagingSenderId: "755915615529",
    appId: "1:755915615529:web:546f9c47d88b6ad64a1b38",
    measurementId: "G-LXQEQHS3GM"
  });

  const db = firebase.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
  export { auth, db, provider }
