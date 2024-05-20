// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAtz4ykdiRibL4npMEGNMKrbuR1mPtBRbM",
  authDomain: "mern-alirobblog.firebaseapp.com",
  projectId: "mern-alirobblog",
  storageBucket: "mern-alirobblog.appspot.com",
  messagingSenderId: "214044669814",
  appId: "1:214044669814:web:ab5a169eb3a0c7627fec57"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);