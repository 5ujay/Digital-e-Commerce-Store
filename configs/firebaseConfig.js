// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "chat-app-8704c.firebaseapp.com",
  projectId: "chat-app-8704c",
  storageBucket: "chat-app-8704c.appspot.com",
  messagingSenderId: "66604160359",
  appId: "1:66604160359:web:c7caa79cbb01a7a3220bc2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app)