// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-oauth-cd357.firebaseapp.com",
  projectId: "mern-oauth-cd357",
  storageBucket: "mern-oauth-cd357.appspot.com",
  messagingSenderId: "253491170317",
  appId: "1:253491170317:web:250d3153f6a2a6e7b3d944",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
