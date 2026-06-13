import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCPUIB8TSAJbtDgfKS_N4SpflEnrAHgfJU",

  authDomain: "solace-66eeb.firebaseapp.com",

  projectId: "solace-66eeb",

  storageBucket: "solace-66eeb.firebasestorage.app",

  messagingSenderId: "83378736454",

  appId: "1:83378736454:web:864f02fafe2dc358f8e947",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);