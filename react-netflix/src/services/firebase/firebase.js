// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDzMC4yezAWyl4CNar1JOSQrxYK3CaEcdA",
  authDomain: "netflix-clone-syarief-hay.firebaseapp.com",
  projectId: "netflix-clone-syarief-hay",
  storageBucket: "netflix-clone-syarief-hay.appspot.com",
  messagingSenderId: "616843030686",
  appId: "1:616843030686:web:3cf9feacd0f08f274c0b8f",
  measurementId: "G-DJZ4N99BFY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
