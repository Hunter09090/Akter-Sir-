/* =====================================
   File : firebase.js
   Part : 1
===================================== */

// Google Authentication Provider
const provider = new firebase.auth.GoogleAuthProvider();

// Collection Names
const USERS = "users";
const QUESTIONS = "questions";
const LEADERBOARD = "leaderboard";

// Current User
let currentUser = null;

/* =========================
   Google Login
========================= */

async function login() {

    try {

        const result = await auth.signInWithPopup(provider);

        currentUser = result.user;

        await saveUser(currentUser);

    } catch (error) {

        console.error("Login Error :", error);

        alert("Login Failed!");

    }

}

/* =========================
   Logout
========================= */

async function logout() {

    try {

        await auth.signOut();

    } catch (error) {

        console.error(error);

    }

}

/* =========================
   Auth State
========================= */

auth.onAuthStateChanged(async (user) => {

    currentUser = user;

    if (user) {

        await saveUser(user);

    }

    if (typeof updateUserUI === "function") {

        updateUserUI(user);

    }

});
/* =====================================
   File : firebase.js
   Part : 2
===================================== */

/* =========================
   Save User
========================= */

async function saveUser(user) {

    if (!user) return;

    try {

        await db.collection(USERS)
            .doc(user.uid)
            .set({

                uid: user.uid,
                name: user.displayName || "",
                email: user.email || "",
                photo: user.photoURL || "",

                updatedAt: firebase.firestore.FieldValue.serverTimestamp()

            }, {
                merge: true
            });

    } catch (error) {

        console.error("Save User Error:", error);

    }

}

/* =========================
   Leaderboard
========================= */

async function saveLeaderboard(data) {

    try {

        await db.collection(LEADERBOARD).add({

            uid: currentUser?.uid || "",

            name: currentUser?.displayName || "Guest",

            score: data.score,

            correct: data.correct,

            wrong: data.wrong,

            time: data.time,

            createdAt: firebase.firestore.FieldValue.serverTimestamp()

        });

    } catch (error) {

        console.error("Leaderboard Error:", error);

    }

}

/* =========================
   Load Top 3
========================= */

async function loadTopThree() {

    try {

        const snapshot = await db
            .collection(LEADERBOARD)
            .orderBy("score", "desc")
            .limit(3)
            .get();

        return snapshot.docs.map(doc => doc.data());

    } catch (error) {

        console.error(error);

        return [];

    }

}
