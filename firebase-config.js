
/* =====================================
   File : firebase-config.js
===================================== */

const firebaseConfig = {
    apiKey: "AIzaSyDZox_EV7PlLBUq6KbPgyckLsfThEu9PfA",
    authDomain: "akter-sir.firebaseapp.com",
    projectId: "akter-sir",
    storageBucket: "akter-sir.firebasestorage.app",
    messagingSenderId: "1078263976979",
    appId: "1:1078263976979:web:7866159f20e6299a2d5be6",
    measurementId: "G-HB8PMMFJMJ"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth ? firebase.auth() : null;
const db = firebase.firestore();
