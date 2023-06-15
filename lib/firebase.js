// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth} from "firebase/auth";

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
const auth = getAuth(app);
export {app, db, auth}