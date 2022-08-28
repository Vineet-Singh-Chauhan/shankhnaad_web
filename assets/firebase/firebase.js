//firebase Initialisation
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyCuAD2I1GWL7-j8aPhRQJRxpDLMRwF-mHk",
  authDomain: "shakhnaad.firebaseapp.com",
  projectId: "shakhnaad",
  storageBucket: "shakhnaad.appspot.com",
  messagingSenderId: "107472168572",
  appId: "1:107472168572:web:1fc946bd3d09f13d7f4bf9"
};

const app = initializeApp(firebaseConfig);
import {getDatabase} from "https://www.gstatic.com/firebasejs/9.9.2/firebase-database.js";

export const db = getDatabase();