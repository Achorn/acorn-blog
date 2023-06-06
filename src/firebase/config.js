import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC2f0yVKEThhNsB5BBjdewfUcNHlY7QI6s",
  authDomain: "acorn-blog.firebaseapp.com",
  projectId: "acorn-blog",
  storageBucket: "acorn-blog.appspot.com",
  messagingSenderId: "571993800265",
  appId: "1:571993800265:web:c254803441e75f83290998",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
