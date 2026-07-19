/*
==========================================================
 Quiz Of AKTER SIR
 auth.js
 Authentication System
 Version : 1.0.0
==========================================================
*/

import {
    auth,
    db
} from "./firebase-config.js";

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendEmailVerification,
    sendPasswordResetEmail,
    signOut,
    onAuthStateChanged,
    updateProfile,
    GoogleAuthProvider,
    signInWithPopup
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
    doc,
    setDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

/* ============================================
   Application Information
============================================ */

export const APP_NAME = "Quiz Of AKTER SIR";

export const ADMIN_EMAIL = "aakterhossen80@gmail.com";

/* ============================================
   Google Provider
============================================ */

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: "select_account"
});

/* ============================================
   User Register
============================================ */

export async function registerUser(name, email, password) {

    try {

        const credential =
            await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

        const user = credential.user;

        await updateProfile(user, {
            displayName: name
        });

        await sendEmailVerification(user);

        await setDoc(doc(db, "users", user.uid), {

            uid: user.uid,

            name: name,

            email: email,

            photo:
                "https://ui-avatars.com/api/?background=0066ff&color=fff&name=" +
                encodeURIComponent(name),

            role: "user",

            level: 1,

            xp: 0,

            coins: 0,

            totalQuiz: 0,

            totalCorrect: 0,

            totalWrong: 0,

            totalQuestion: 0,

            accuracy: 0,

            streak: 0,

            rank: 0,

            isActive: true,

            isBlocked: false,

            emailVerified: false,

            createdAt: serverTimestamp(),

            updatedAt: serverTimestamp()

        });

        return {

            success: true,

            message:
                "Registration completed. Verify your email."

        };

    } catch (error) {

        return {

            success: false,

            message: error.message

        };

    }

}

/* ============================================
   Email Login
============================================ */

export async function loginUser(email, password) {

    try {

        const credential =
            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

        return {

            success: true,

            user: credential.user

        };

    } catch (error) {

        return {

            success: false,

            message: error.message

        };

    }

}

/* ============================================
   Google Login
============================================ */

export async function googleLogin() {

    try {

        const result =
            await signInWithPopup(
                auth,
                googleProvider
            );

        const user = result.user;

        await setDoc(
            doc(db, "users", user.uid),

            {

                uid: user.uid,

                name: user.displayName,

                email: user.email,

                photo: user.photoURL,

                role: "user",

                level: 1,

                xp: 0,

                coins: 0,

                totalQuiz: 0,

                totalCorrect: 0,

                totalWrong: 0,

                totalQuestion: 0,

                accuracy: 0,

                streak: 0,

                rank: 0,

                isActive: true,

                isBlocked: false,

                emailVerified: user.emailVerified,

                createdAt: serverTimestamp(),

                updatedAt: serverTimestamp()

            },

            {

                merge: true

            }

        );

        return {

            success: true,

            user

        };

    } catch (error) {

        return {

            success: false,

            message: error.message

        };

    }

              }
/* ============================================
   Logout User
============================================ */

export async function logoutUser() {

    try {

        await signOut(auth);

        return {
            success: true,
            message: "Logout Successful"
        };

    } catch (error) {

        return {
            success: false,
            message: error.message
        };

    }

}

/* ============================================
   Forgot Password
============================================ */

export async function forgotPassword(email) {

    try {

        await sendPasswordResetEmail(auth, email);

        return {
            success: true,
            message: "Password reset email sent."
        };

    } catch (error) {

        return {
            success: false,
            message: error.message
        };

    }

}

/* ============================================
   Current User
============================================ */

export function getCurrentUser() {

    return auth.currentUser;

}

/* ============================================
   Is Logged In
============================================ */

export function isLoggedIn() {

    return auth.currentUser !== null;

}

/* ============================================
   Email Verified
============================================ */

export function isEmailVerified() {

    if (!auth.currentUser) return false;

    return auth.currentUser.emailVerified;

}

/* ============================================
   Auth State Listener
============================================ */

export function authListener(callback) {

    onAuthStateChanged(auth, (user) => {

        callback(user);

    });

}

/* ============================================
   Redirect If Not Login
============================================ */

export function requireLogin() {

    onAuthStateChanged(auth, (user) => {

        if (!user) {

            window.location.href = "login.html";

        }

    });

}

/* ============================================
   Redirect If Already Login
============================================ */

export function redirectLoggedInUser() {

    onAuthStateChanged(auth, (user) => {

        if (user) {

            window.location.href = "dashboard.html";

        }

    });

}

/* ============================================
   Require Email Verification
============================================ */

export function requireVerifiedEmail() {

    onAuthStateChanged(auth, (user) => {

        if (!user) {

            window.location.href = "login.html";
            return;

        }

        if (!user.emailVerified) {

            alert("Please verify your email first.");

            window.location.href = "login.html";

        }

    });

}

/* ============================================
   Session Storage
============================================ */

export function saveSession() {

    if (!auth.currentUser) return;

    localStorage.setItem(
        "quiz_user_uid",
        auth.currentUser.uid
    );

}

/* ============================================
   Remove Session
============================================ */

export function clearSession() {

    localStorage.removeItem("quiz_user_uid");

}

/* ============================================
   Get Session UID
============================================ */

export function getSessionUID() {

    return localStorage.getItem("quiz_user_uid");

}

/* ============================================
   Auto Session Update
============================================ */

onAuthStateChanged(auth, (user) => {

    if (user) {

        saveSession();

    } else {

        clearSession();

    }

});

/* ============================================
   Auth Ready
============================================ */

console.log("======================================");
console.log(APP_NAME);
console.log("Authentication System Loaded");
console.log("Version : 1.0.0");
console.log("======================================");
