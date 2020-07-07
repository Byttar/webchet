import firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyC01v5GHcSKKTHdRMfrHdJGcxlIZVUN2nk",
    authDomain: "trellinho.firebaseapp.com",
    databaseURL: "https://trellinho.firebaseio.com",
    projectId: "trellinho",
    storageBucket: "trellinho.appspot.com",
    messagingSenderId: "666173448044",
    appId: "1:666173448044:web:ec225fa0fca8b2dfce1d49",
    measurementId: "G-NXY3X0MJS6"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export const database = firebase.database();