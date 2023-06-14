// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDz7pfbReosYPu0alSz95C2y692rSQ-y8U",
  authDomain: "expense-tracker-c7aee.firebaseapp.com",
  projectId: "expense-tracker-c7aee",
  storageBucket: "expense-tracker-c7aee.appspot.com",
  messagingSenderId: "862359198271",
  appId: "1:862359198271:web:f8b2131a5f340a6578368a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export {app, db}