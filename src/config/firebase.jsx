// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from "firebase/firestore";
 
const firebaseConfig = {
  apiKey: "AIzaSyBvnyoGx78nBtv3e62OgliY0yX3mjbQ4lg",
  authDomain: "todo-app-b10e3.firebaseapp.com",
  projectId: "todo-app-b10e3",
  storageBucket: "todo-app-b10e3.firebasestorage.app",
  messagingSenderId: "544257800075",
  appId: "1:544257800075:web:5d2842f31446bb33fb218e",
  measurementId: "G-4JRNBWQ17B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//initialize firestore with caching
const db = initializeFirestore(app, {
  localCache:persistentLocalCache({tabManager: persistentMultipleTabManager()}),
});

 export const auth = getAuth(app);
 export const googleProvider = new GoogleAuthProvider();
export {db}