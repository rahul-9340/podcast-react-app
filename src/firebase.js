// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"
import {getAuth} from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCaH90slox6KBooMuDwoC80WW3hMAxvU6U",
  authDomain: "podcast-react-app-cbd46.firebaseapp.com",
  projectId: "podcast-react-app-cbd46",
  storageBucket: "podcast-react-app-cbd46.appspot.com",
  messagingSenderId: "1005389678540",
  appId: "1:1005389678540:web:f6cf96784cdafd90b13f69",
  measurementId: "G-DS27FM93H2"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const storage = getStorage(app)
const auth = getAuth(app)

export {auth,db,storage}





