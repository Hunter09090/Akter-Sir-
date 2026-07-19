import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDZox_EV7PlLBUq6KbPgyckLsfThEu9PfA",
  authDomain: "akter-sir.firebaseapp.com",
  projectId: "akter-sir",
  storageBucket: "akter-sir.firebasestorage.app",
  messagingSenderId: "1078263976979",
  appId: "1:1078263976979:web:7866159f20e6299a2d5be6",
  measurementId: "G-HB8PMMFJMJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Services
export const db = getFirestore(app);
export const auth = getAuth(app);

console.log("Firebase initialized successfully!");
