/*
========================================================
 Quiz Of AKTER SIR
 Firebase Configuration
 GitHub Pages Ready
 Version : 1.0.0
========================================================
*/

// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-storage.js";

// Firebase Configuration
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

// Services
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Export
export {
    app,
    analytics,
    auth,
    db,
    storage
};
