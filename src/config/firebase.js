import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyD0IvpTObOs-KmR7witU__fzvNjFJM9EDM",
  authDomain: "ex-blogging-app.firebaseapp.com",
  projectId: "ex-blogging-app",
  storageBucket: "ex-blogging-app.firebasestorage.app",
  messagingSenderId: "914143849457",
  appId: "1:914143849457:web:4ecaabc1ea7207e3d63250"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

