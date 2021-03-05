import firebase from 'firebase/app'
require('firebase/auth');
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD5kktQJ5a5MotvmtfldANW8RRzgL6Tbjs",
    authDomain: "psyjai-dashboard.firebaseapp.com",
    projectId: "psyjai-dashboard",
    storageBucket: "psyjai-dashboard.appspot.com",
    messagingSenderId: "169555330869",
    appId: "1:169555330869:web:6604ce494e999a5a16ae7c",
    measurementId: "G-RX73HJL8RL"
  };
  firebase.initializeApp(firebaseConfig);
  console.log(firebase.auth) // Undefined
  console.log(firebase.default.auth) // Function
export default firebase;