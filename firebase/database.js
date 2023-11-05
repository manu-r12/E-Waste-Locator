// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCEOkeJyd9aatFdcz0aePUMWHfpakio1xo",
  authDomain: "e-waste-locator-cbf08.firebaseapp.com",
  projectId: "e-waste-locator-cbf08",
  storageBucket: "e-waste-locator-cbf08.appspot.com",
  messagingSenderId: "996473124372",
  appId: "1:996473124372:web:a3bcd321ee2e47089f1901"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage()