// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "udemy-tutorial-react.firebaseapp.com",
    projectId: "udemy-tutorial-react",
    storageBucket: "udemy-tutorial-react.firebasestorage.app",
    messagingSenderId: "402219063508",
    appId: "1:402219063508:web:52cab1020471d1c2a18341"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);