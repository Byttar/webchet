import firebase from "firebase";

var firebaseConfig = {
       //config
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export const database = firebase.database();
