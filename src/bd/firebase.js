import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: "herhelbilobrov.firebaseapp.com",
  projectId: "herhelbilobrov",
  storageBucket: "herhelbilobrov.firebasestorage.app",
  messagingSenderId: "541100728159",
  appId: "1:541100728159:web:1c4076e0b642d23fa4e0ea"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);