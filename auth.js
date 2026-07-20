
/*==========================================================
    Quiz Of AKTER SIR
    auth.js
    Version : 1.0.0
==========================================================*/

"use strict";

/*==========================================================
    FIREBASE IMPORT
==========================================================*/

import { auth, db } from "./firebase-config.js";

import {

    createUserWithEmailAndPassword,

    signInWithEmailAndPassword,

    GoogleAuthProvider,

    signInWithPopup,

    sendPasswordResetEmail,

    sendEmailVerification,

    signOut,

    onAuthStateChanged,

    setPersistence,

    browserLocalPersistence,

    browserSessionPersistence

} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {

    doc,

    setDoc,

    getDoc,

    serverTimestamp

} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

/*==========================================================
    GOOGLE PROVIDER
==========================================================*/

const googleProvider = new GoogleAuthProvider();

/*==========================================================
    DOM ELEMENTS
==========================================================*/

const loginForm = document.getElementById("loginForm");

const signupForm = document.getElementById("signupForm");

const rememberMe = document.getElementById("rememberMe");

const googleLoginBtn = document.getElementById("googleLogin");

const googleSignupBtn = document.getElementById("googleSignup");

const forgotPasswordBtn = document.getElementById("forgotPassword");

/*==========================================================
    INITIALIZE
==========================================================*/

document.addEventListener(

    "DOMContentLoaded",

    initAuth

);

function initAuth() {

    authState();

    loginHandler();

    signupHandler();

    googleLogin();

    googleSignup();

    forgotPassword();

}

/*==========================================================
    LOGIN
==========================================================*/

function loginHandler() {

    if (!loginForm) return;

    loginForm.addEventListener(

        "submit",

        async (event) => {

            event.preventDefault();

            const email = loginForm.email.value.trim();

            const password = loginForm.password.value;

            try {

                Components.buttonLoading(

                    loginForm.querySelector("button"),

                    true

                );

                if (

                    rememberMe &&

                    rememberMe.checked

                ) {

                    await setPersistence(

                        auth,

                        browserLocalPersistence

                    );

                } else {

                    await setPersistence(

                        auth,

                        browserSessionPersistence

                    );

                }

                await signInWithEmailAndPassword(

                    auth,

                    email,

                    password

                );

                Components.toast(

                    "Login Successful",

                    "success"

                );

                location.href = "dashboard.html";

            }

            catch (error) {

                console.error(error);

                Components.toast(

                    error.message,

                    "error"

                );

            }

            finally {

                Components.buttonLoading(

                    loginForm.querySelector("button"),

                    false

                );

            }
/*==========================================================
    SIGN UP
==========================================================*/

function signupHandler() {

    if (!signupForm) return;

    signupForm.addEventListener(

        "submit",

        async (event) => {

            event.preventDefault();

            const name =
                signupForm.name.value.trim();

            const email =
                signupForm.email.value.trim();

            const password =
                signupForm.password.value;

            const confirmPassword =
                signupForm.confirmPassword.value;

            if (password !== confirmPassword) {

                Components.toast(

                    "Passwords do not match.",

                    "error"

                );

                return;

            }

            try {

                Components.buttonLoading(

                    signupForm.querySelector("button"),

                    true

                );

                const credential =

                    await createUserWithEmailAndPassword(

                        auth,

                        email,

                        password

                    );

                const user = credential.user;

                await setDoc(

                    doc(db, "users", user.uid),

                    {

                        uid: user.uid,

                        name: name,

                        email: email,

                        photoURL: "",

                        role: "user",

                        xp: 0,

                        coins: 0,

                        level: 1,

                        totalQuiz: 0,

                        totalCorrect: 0,

                        totalWrong: 0,

                        createdAt:

                        serverTimestamp(),

                        lastLogin:

                        serverTimestamp(),

                        isActive: true

                    }

                );

                await sendEmailVerification(user);

                Components.toast(

                    "Registration Successful. Verify your email.",

                    "success"

                );

                location.href = "login.html";

            }

            catch (error) {

                console.error(error);

                Components.toast(

                    getAuthError(

                        error.code

                    ),

                    "error"

                );

            }

            finally {

                Components.buttonLoading(

                    signupForm.querySelector("button"),

                    false

                );

            }

        }

    );

}

/*==========================================================
    AUTH ERROR MESSAGE
==========================================================*/

function getAuthError(code) {

    const errors = {

        "auth/email-already-in-use":

        "Email is already registered.",

        "auth/invalid-email":

        "Invalid email address.",

        "auth/weak-password":

        "Password must be at least 6 characters.",

        "auth/user-not-found":

        "User not found.",

        "auth/wrong-password":

        "Incorrect password.",

        "auth/invalid-credential":

        "Invalid email or password.",

        "auth/network-request-failed":

        "No internet connection."

    };

    return errors[code] ||

    "Something went wrong.";

}
          
        }

    );

                      }
/*==========================================================
    UPDATE PROFILE IMPORT
==========================================================*/

import {

    updateProfile

} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

/*==========================================================
    GOOGLE LOGIN / SIGNUP
==========================================================*/

function googleLogin() {

    if (!googleLoginBtn) return;

    googleLoginBtn.addEventListener(

        "click",

        async () => {

            try {

                const result =

                    await signInWithPopup(

                        auth,

                        googleProvider

                    );

                await saveGoogleUser(

                    result.user

                );

                Components.toast(

                    "Login Successful",

                    "success"

                );

                location.href =

                "dashboard.html";

            }

            catch (error) {

                console.error(error);

                Components.toast(

                    getAuthError(error.code),

                    "error"

                );

            }

        }

    );

}

function googleSignup() {

    if (!googleSignupBtn) return;

    googleSignupBtn.addEventListener(

        "click",

        async () => {

            googleLoginBtn?.click();

        }

    );

}

/*==========================================================
    SAVE GOOGLE USER
==========================================================*/

async function saveGoogleUser(user) {

    const ref = doc(

        db,

        "users",

        user.uid

    );

    const snapshot =

        await getDoc(ref);

    if (snapshot.exists()) return;

    await setDoc(

        ref,

        {

            uid: user.uid,

            name: user.displayName || "",

            email: user.email || "",

            photoURL: user.photoURL || "",

            role: "user",

            xp: 0,

            coins: 0,

            level: 1,

            totalQuiz: 0,

            totalCorrect: 0,

            totalWrong: 0,

            createdAt:

            serverTimestamp(),

            lastLogin:

            serverTimestamp(),

            isActive: true

        }

    );

}

/*==========================================================
    UPDATE USER PROFILE
==========================================================*/

async function updateUserProfile(

    user,

    name

) {

    try {

        await updateProfile(

            user,

            {

                displayName: name

            }

        );

    }

    catch (error) {

        console.error(error);

    }

}

/*==========================================================
    PASSWORD RESET
==========================================================*/

function forgotPassword() {

    if (!forgotPasswordBtn) return;

    forgotPasswordBtn.addEventListener(

        "click",

        async () => {

            const email = prompt(

                "Enter your email"

            );

            if (!email) return;

            try {

                await sendPasswordResetEmail(

                    auth,

                    email

                );

                Components.toast(

                    "Password reset email sent.",

                    "success"

                );

            }

            catch (error) {

                Components.toast(

                    getAuthError(

                        error.code

                    ),

                    "error"

                );

            }

        }

    );

          }
/*==========================================================
    AUTH STATE
==========================================================*/

function authState() {

    onAuthStateChanged(

        auth,

        async (user) => {

            if (!user) return;

            try {

                const userRef = doc(

                    db,

                    "users",

                    user.uid

                );

                const snapshot =

                    await getDoc(userRef);

                if (snapshot.exists()) {

                    await setDoc(

                        userRef,

                        {

                            lastLogin:

                            serverTimestamp()

                        },

                        {

                            merge: true

                        }

                    );

                }

            }

            catch (error) {

                console.error(error);

            }

        }

    );

}

/*==========================================================
    EMAIL VERIFICATION
==========================================================*/

function isEmailVerified() {

    const user = auth.currentUser;

    if (!user) return false;

    return user.emailVerified;

}

/*==========================================================
    LOGOUT
==========================================================*/

async function logout() {

    try {

        await signOut(auth);

        Components.toast(

            "Logout Successful.",

            "success"

        );

        location.href = "login.html";

    }

    catch (error) {

        console.error(error);

        Components.toast(

            "Logout Failed.",

            "error"

        );

    }

}

/*==========================================================
    ROUTE GUARD
==========================================================*/

function requireLogin() {

    onAuthStateChanged(

        auth,

        user => {

            if (!user) {

                location.href =

                "login.html";

            }

        }

    );

}

function guestOnly() {

    onAuthStateChanged(

        auth,

        user => {

            if (user) {

                location.href =

                "dashboard.html";

            }

        }

    );

}

/*==========================================================
    CURRENT USER
==========================================================*/

function currentUser() {

    return auth.currentUser;

}

/*==========================================================
    GLOBAL EXPORT
==========================================================*/

window.Auth = {

    logout,

    currentUser,

    requireLogin,

    guestOnly,

    isEmailVerified

};

/*==========================================================
    END OF FILE
==========================================================*/
