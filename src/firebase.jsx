import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Correct capitalization

const firebaseConfig = {
  apiKey: "AIzaSyCe1UaQYe8R6W684iLE8x_BCbaawdi10LI",
  authDomain: "chatapptrial-eafe8.firebaseapp.com",
  projectId: "chatapptrial-eafe8",
  storageBucket: "chatapptrial-eafe8.appspot.com",
  messagingSenderId: "760852906439",
  appId: "1:760852906439:web:005358c5f93e84603a59e2",
  measurementId: "G-RG6BP82F23"
};

// Initialize Firebase
const fireapp = initializeApp(firebaseConfig);
const db = getFirestore(fireapp); // Correct capitalization
const auth = getAuth(fireapp);

export { auth, db };
