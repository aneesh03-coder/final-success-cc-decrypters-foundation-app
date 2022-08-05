import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAfZ74EON9YUtyBusH0Sp1zBZUqJQMPHJs",
  authDomain: "success-cc-df-demo-final.firebaseapp.com",
  projectId: "success-cc-df-demo-final",
  storageBucket: "success-cc-df-demo-final.appspot.com",
  messagingSenderId: "1087753082799",
  appId: "1:1087753082799:web:1fe446ab8e3aabaee7415a",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const Storage = firebaseApp.storage();

export { db, Storage };
