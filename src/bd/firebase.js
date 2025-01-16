import { initializeApp, getApps } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: "herhelbilobrov.firebaseapp.com",
  projectId: "herhelbilobrov",
  storageBucket: "herhelbilobrov.firebasestorage.app",
  messagingSenderId: "541100728159",
  appId: "1:541100728159:web:1c4076e0b642d23fa4e0ea"
};
const firebaseConfigBase = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY_BASE,
  authDomain: "herhelclinic-710b9.firebaseapp.com",
  projectId: "herhelclinic-710b9",
  storageBucket: "herhelclinic-710b9.appspot.com",
  messagingSenderId: "326121729425",
  appId: "1:326121729425:web:b8540856896c7d5cf53e30"
};

// Initialize Firebase
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0] ;
export  const app1 = initializeApp(firebaseConfigBase, "secondaryApp")