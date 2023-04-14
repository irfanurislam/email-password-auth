// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwoKx3V63EHTEjFvKZbyjurHOhNKq0A6Y",
  authDomain: "email-password-auth-fb5b6.firebaseapp.com",
  projectId: "email-password-auth-fb5b6",
  storageBucket: "email-password-auth-fb5b6.appspot.com",
  messagingSenderId: "139056442886",
  appId: "1:139056442886:web:3ad4bd98f385e774225d87"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app