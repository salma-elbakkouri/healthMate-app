// firebaseConfig.js

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBDMFXWh-aemPvFELUC0bwiiuV16oRXTZo",
  authDomain: "healthmateapp.firebaseapp.com",
  projectId: "healthmateapp",
  storageBucket: "healthmateapp.appspot.com",
  messagingSenderId: "1020288258907",
  appId: "1:1020288258907:web:038e4dd05b94e19609807e",
  measurementId: "G-NSENY4XS4Z"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app); 

export { auth, firestore };
