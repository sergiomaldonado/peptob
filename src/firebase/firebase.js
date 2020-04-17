import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAmuZiK1hhAXbxueLfHw_PQXCvD48PutjE",
    authDomain: "citymollnegocios.firebaseapp.com",
    databaseURL: "https://citymollnegocios.firebaseio.com",
    projectId: "citymollnegocios",
    storageBucket: "citymollnegocios.appspot.com",
    messagingSenderId: "278727377871",
    appId: "1:278727377871:web:586aeb9edaecb48d5088ba",
    measurementId: "G-YHS5VZJW6B"
  };
  firebase.initializeApp(config);

  if(!firebase.apps.length){
    firebase.initializeApp(config);
  }
  const db = firebase.database();
  const dbfb = firebase.database();
  const auth = firebase.auth();
  const authfb = firebase.auth();
  var storage = firebase.storage();

  export {
    db,
    dbfb,
    auth,
    authfb,
    storage
  }
 
