import firebase from "firebase";

const config = {
  apiKey: "AIzaSyCBSu7cl-9xy-aG_b27JTA36l8CY-n93nI",
  authDomain: "contacts-app-eaa72.firebaseapp.com",
  projectId: "contacts-app-eaa72"
};

firebase.initializeApp(config);

const db = firebase.firestore();

export default db;
