// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore/lite'
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCxPo5HrQ-2Ade1vIIXtzPIoymDLe6HNyA",
  authDomain: "firbase-practice-1234.firebaseapp.com",
  projectId: "firbase-practice-1234",
  storageBucket: "firbase-practice-1234.appspot.com",
  messagingSenderId: "941851411208",
  appId: "1:941851411208:web:174cd236235bfe0665e2bd",
  measurementId: "G-J1Q96SLLCT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app)
const storage = getStorage(app)

export {analytics,auth, firestore, storage}