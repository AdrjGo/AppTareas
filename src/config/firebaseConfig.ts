// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID } from "@env";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAlqVm-CVwjALFrmsnLS_ONiGVFzKN_H4s",
  authDomain: "apptareas-8033d.firebaseapp.com",
  projectId: "apptareas-8033d",
  storageBucket: "apptareas-8033d.firebasestorage.app",
  messagingSenderId: "374046613735",
  appId: "1:374046613735:web:653ae1113a7918f7164242"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
export default appFirebase;