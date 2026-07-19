/*
==========================================================
 Quiz Of AKTER SIR
 database.js
 Firestore Database Manager
 Version : 1.0.0
==========================================================
*/

import {
    db,
    auth
} from "./firebase-config.js";

import {

    doc,
    setDoc,
    getDoc,
    updateDoc,
    deleteDoc,

    collection,

    addDoc,

    serverTimestamp,

    increment,

    onSnapshot,

    getDocs,

    query,

    where,

    orderBy,

    limit

} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

/*==========================================================
    Collection Name
==========================================================*/

export const COLLECTION = {

    USERS: "users",

    QUIZZES: "quizzes",

    QUESTIONS: "questions",

    RESULTS: "results",

    LEADERBOARD: "leaderboard",

    CATEGORY: "categories",

    NOTICE: "notice",

    REPORT: "reports",

    SETTINGS: "settings"

};

/*==========================================================
    User Document Reference
==========================================================*/

export function userRef(uid) {

    return doc(db, COLLECTION.USERS, uid);

}

/*==========================================================
    Quiz Document Reference
==========================================================*/

export function quizRef(id) {

    return doc(db, COLLECTION.QUIZZES, id);

}

/*==========================================================
    Question Document Reference
==========================================================*/

export function questionRef(id) {

    return doc(db, COLLECTION.QUESTIONS, id);

}

/*==========================================================
    Result Document Reference
==========================================================*/

export function resultRef(id) {

    return doc(db, COLLECTION.RESULTS, id);

}

/*==========================================================
    Create User Profile
==========================================================*/

export async function createUserProfile(user) {

    const ref = userRef(user.uid);

    const snap = await getDoc(ref);

    if (snap.exists()) {

        return;
    }

    await setDoc(ref, {

        uid: user.uid,

        name: user.displayName || "",

        email: user.email,

        photo: user.photoURL || "",

        role: "user",

        level: 1,

        xp: 0,

        coin: 0,

        totalQuiz: 0,

        totalQuestion: 0,

        totalCorrect: 0,

        totalWrong: 0,

        accuracy: 0,

        streak: 0,

        highestStreak: 0,

        currentRank: 0,

        isBlocked: false,

        isActive: true,

        emailVerified: user.emailVerified,

        createdAt: serverTimestamp(),

        updatedAt: serverTimestamp(),

        lastLogin: serverTimestamp()

    });

}

/*==========================================================
    Get User Profile
==========================================================*/

export async function getUserProfile(uid) {

    const snap = await getDoc(userRef(uid));

    if (!snap.exists()) {

        return null;

    }

    return snap.data();

      }
/*==========================================================
    Update User Profile
==========================================================*/

export async function updateUserProfile(uid, data = {}) {

    try {

        await updateDoc(userRef(uid), {

            ...data,

            updatedAt: serverTimestamp()

        });

        return true;

    } catch (error) {

        console.error("Update User Profile:", error);

        return false;

    }

}

/*==========================================================
    Update Last Login
==========================================================*/

export async function updateLastLogin(uid) {

    try {

        await updateDoc(userRef(uid), {

            lastLogin: serverTimestamp(),

            updatedAt: serverTimestamp()

        });

    } catch (error) {

        console.error(error);

    }

}

/*==========================================================
    User Online
==========================================================*/

export async function setUserOnline(uid) {

    try {

        await updateDoc(userRef(uid), {

            isOnline: true,

            lastActive: serverTimestamp(),

            updatedAt: serverTimestamp()

        });

    } catch (error) {

        console.error(error);

    }

}

/*==========================================================
    User Offline
==========================================================*/

export async function setUserOffline(uid) {

    try {

        await updateDoc(userRef(uid), {

            isOnline: false,

            lastActive: serverTimestamp(),

            updatedAt: serverTimestamp()

        });

    } catch (error) {

        console.error(error);

    }

}

/*==========================================================
    Increase XP
==========================================================*/

export async function addXP(uid, amount = 0) {

    try {

        await updateDoc(userRef(uid), {

            xp: increment(amount),

            updatedAt: serverTimestamp()

        });

        return true;

    } catch (error) {

        console.error(error);

        return false;

    }

}

/*==========================================================
    Increase Coin
==========================================================*/

export async function addCoin(uid, amount = 0) {

    try {

        await updateDoc(userRef(uid), {

            coin: increment(amount),

            updatedAt: serverTimestamp()

        });

        return true;

    } catch (error) {

        console.error(error);

        return false;

    }

}

/*==========================================================
    Remove Coin
==========================================================*/

export async function removeCoin(uid, amount = 0) {

    try {

        await updateDoc(userRef(uid), {

            coin: increment(-amount),

            updatedAt: serverTimestamp()

        });

        return true;

    } catch (error) {

        console.error(error);

        return false;

    }

}

/*==========================================================
    Increase Quiz Count
==========================================================*/

export async function increaseQuizCount(uid) {

    try {

        await updateDoc(userRef(uid), {

            totalQuiz: increment(1),

            updatedAt: serverTimestamp()

        });

    } catch (error) {

        console.error(error);

    }

}

/*==========================================================
    Increase Correct Answer
==========================================================*/

export async function increaseCorrect(uid, total = 1) {

    try {

        await updateDoc(userRef(uid), {

            totalCorrect: increment(total),

            updatedAt: serverTimestamp()

        });

    } catch (error) {

        console.error(error);

    }

}

/*==========================================================
    Increase Wrong Answer
==========================================================*/

export async function increaseWrong(uid, total = 1) {

    try {

        await updateDoc(userRef(uid), {

            totalWrong: increment(total),

            updatedAt: serverTimestamp()

        });

    } catch (error) {

        console.error(error);

    }

}

/*==========================================================
    Increase Total Question
==========================================================*/

export async function increaseQuestion(uid, total = 1) {

    try {

        await updateDoc(userRef(uid), {

            totalQuestion: increment(total),

            updatedAt: serverTimestamp()

        });

    } catch (error) {

        console.error(error);

    }

}

/*==========================================================
    Listen User Profile
==========================================================*/

export function listenUserProfile(uid, callback) {

    return onSnapshot(

        userRef(uid),

        (docSnap) => {

            if (docSnap.exists()) {

                callback(docSnap.data());

            }

        },

        (error) => {

            console.error(error);

        }

    );

      }
/*==========================================================
    Calculate Accuracy
==========================================================*/

export function calculateAccuracy(correct, total) {

    if (total <= 0) return 0;

    return Number(((correct / total) * 100).toFixed(2));

}

/*==========================================================
    Calculate Level
==========================================================*/

export function calculateLevel(xp) {

    if (xp < 100) return 1;

    return Math.floor(xp / 100) + 1;

}

/*==========================================================
    Update User Statistics
==========================================================*/

export async function updateUserStatistics(uid, result) {

    /*
        result = {

            totalQuestion,
            correct,
            wrong,
            earnedXP,
            earnedCoin

        }
    */

    const ref = userRef(uid);

    const snap = await getDoc(ref);

    if (!snap.exists()) {

        return false;

    }

    const user = snap.data();

    const totalCorrect =
        (user.totalCorrect || 0) + result.correct;

    const totalWrong =
        (user.totalWrong || 0) + result.wrong;

    const totalQuestion =
        (user.totalQuestion || 0) + result.totalQuestion;

    const totalQuiz =
        (user.totalQuiz || 0) + 1;

    const xp =
        (user.xp || 0) + result.earnedXP;

    const coin =
        (user.coin || 0) + result.earnedCoin;

    const accuracy =
        calculateAccuracy(
            totalCorrect,
            totalQuestion
        );

    const level =
        calculateLevel(xp);

    await updateDoc(ref, {

        totalQuiz,

        totalCorrect,

        totalWrong,

        totalQuestion,

        accuracy,

        xp,

        coin,

        level,

        updatedAt: serverTimestamp()

    });

    return true;

}

/*==========================================================
    Increase Daily Streak
==========================================================*/

export async function increaseStreak(uid) {

    const ref = userRef(uid);

    const snap = await getDoc(ref);

    if (!snap.exists()) {

        return;

    }

    const user = snap.data();

    const streak = (user.streak || 0) + 1;

    const highestStreak =
        Math.max(
            streak,
            user.highestStreak || 0
        );

    await updateDoc(ref, {

        streak,

        highestStreak,

        updatedAt: serverTimestamp()

    });

}

/*==========================================================
    Reset Streak
==========================================================*/

export async function resetStreak(uid) {

    await updateDoc(

        userRef(uid),

        {

            streak: 0,

            updatedAt: serverTimestamp()

        }

    );

}

/*==========================================================
    Check User Block Status
==========================================================*/

export async function isUserBlocked(uid) {

    const snap = await getDoc(

        userRef(uid)

    );

    if (!snap.exists()) {

        return true;

    }

    return snap.data().isBlocked === true;

}

/*==========================================================
    Check Admin Role
==========================================================*/

export async function isAdmin(uid) {

    const snap = await getDoc(

        userRef(uid)

    );

    if (!snap.exists()) {

        return false;

    }

    return snap.data().role === "admin";

         }
/*==========================================================
    Save Quiz Result
==========================================================*/

export async function saveQuizResult(result) {

    try {

        const docRef = await addDoc(
            collection(db, COLLECTION.RESULTS),
            {
                ...result,
                createdAt: serverTimestamp()
            }
        );

        return {
            success: true,
            id: docRef.id
        };

    } catch (error) {

        console.error(error);

        return {
            success: false,
            error
        };

    }

}

/*==========================================================
    Get Quiz Result
==========================================================*/

export async function getQuizResult(resultId) {

    const snap = await getDoc(
        resultRef(resultId)
    );

    if (!snap.exists()) {

        return null;

    }

    return {

        id: snap.id,

        ...snap.data()

    };

}

/*==========================================================
    Get User Results
==========================================================*/

export async function getUserResults(uid) {

    const q = query(

        collection(db, COLLECTION.RESULTS),

        where("uid", "==", uid),

        orderBy("createdAt", "desc")

    );

    const snapshot = await getDocs(q);

    const results = [];

    snapshot.forEach(doc => {

        results.push({

            id: doc.id,

            ...doc.data()

        });

    });

    return results;

}

/*==========================================================
    Add Quiz
==========================================================*/

export async function addQuiz(data) {

    const docRef = await addDoc(

        collection(db, COLLECTION.QUIZZES),

        {

            ...data,

            status: "published",

            createdAt: serverTimestamp(),

            updatedAt: serverTimestamp()

        }

    );

    return docRef.id;

}

/*==========================================================
    Get Quiz
==========================================================*/

export async function getQuiz(id) {

    const snap = await getDoc(

        quizRef(id)

    );

    if (!snap.exists()) {

        return null;

    }

    return {

        id: snap.id,

        ...snap.data()

    };

}

/*==========================================================
    Delete Quiz
==========================================================*/

export async function deleteQuiz(id) {

    await deleteDoc(

        quizRef(id)

    );

}

/*==========================================================
    Update Quiz
==========================================================*/

export async function updateQuiz(id, data) {

    await updateDoc(

        quizRef(id),

        {

            ...data,

            updatedAt: serverTimestamp()

        }

    );

}

/*==========================================================
    Get Latest Quiz
==========================================================*/

export async function getLatestQuizzes(max = 20) {

    const q = query(

        collection(db, COLLECTION.QUIZZES),

        orderBy("createdAt", "desc"),

        limit(max)

    );

    const snapshot = await getDocs(q);

    const quizzes = [];

    snapshot.forEach(doc => {

        quizzes.push({

            id: doc.id,

            ...doc.data()

        });

    });

    return quizzes;

          }
/*==========================================================
    Add Question
==========================================================*/

export async function addQuestion(data) {

    try {

        const docRef = await addDoc(

            collection(db, COLLECTION.QUESTIONS),

            {

                ...data,

                status: true,

                createdAt: serverTimestamp(),

                updatedAt: serverTimestamp()

            }

        );

        return {

            success: true,

            id: docRef.id

        };

    } catch (error) {

        console.error(error);

        return {

            success: false,

            error

        };

    }

}

/*==========================================================
    Update Question
==========================================================*/

export async function updateQuestion(id, data) {

    try {

        await updateDoc(

            questionRef(id),

            {

                ...data,

                updatedAt: serverTimestamp()

            }

        );

        return true;

    } catch (error) {

        console.error(error);

        return false;

    }

}

/*==========================================================
    Delete Question
==========================================================*/

export async function deleteQuestion(id) {

    try {

        await deleteDoc(

            questionRef(id)

        );

        return true;

    } catch (error) {

        console.error(error);

        return false;

    }

}

/*==========================================================
    Get Question
==========================================================*/

export async function getQuestion(id) {

    const snap = await getDoc(

        questionRef(id)

    );

    if (!snap.exists()) {

        return null;

    }

    return {

        id: snap.id,

        ...snap.data()

    };

}

/*==========================================================
    Get Questions By Quiz
==========================================================*/

export async function getQuizQuestions(quizId) {

    const q = query(

        collection(db, COLLECTION.QUESTIONS),

        where("quizId", "==", quizId),

        orderBy("serial")

    );

    const snapshot = await getDocs(q);

    const questions = [];

    snapshot.forEach(doc => {

        questions.push({

            id: doc.id,

            ...doc.data()

        });

    });

    return questions;

}

/*==========================================================
    Add Category
==========================================================*/

export async function addCategory(name, icon = "") {

    const docRef = await addDoc(

        collection(db, COLLECTION.CATEGORY),

        {

            name,

            icon,

            status: true,

            createdAt: serverTimestamp(),

            updatedAt: serverTimestamp()

        }

    );

    return docRef.id;

}

/*==========================================================
    Get Categories
==========================================================*/

export async function getCategories() {

    const snapshot = await getDocs(

        collection(db, COLLECTION.CATEGORY)

    );

    const categories = [];

    snapshot.forEach(doc => {

        categories.push({

            id: doc.id,

            ...doc.data()

        });

    });

    return categories;

}

/*==========================================================
    Update Category
==========================================================*/

export async function updateCategory(id, data) {

    await updateDoc(

        doc(db, COLLECTION.CATEGORY, id),

        {

            ...data,

            updatedAt: serverTimestamp()

        }

    );

}

/*==========================================================
    Delete Category
==========================================================*/

export async function deleteCategory(id) {

    await deleteDoc(

        doc(db, COLLECTION.CATEGORY, id)

    );

}

/*==========================================================
    Search Quiz
==========================================================*/

export async function searchQuiz(title) {

    const snapshot = await getDocs(

        collection(db, COLLECTION.QUIZZES)

    );

    const result = [];

    snapshot.forEach(doc => {

        const data = doc.data();

        if (

            data.title
                .toLowerCase()
                .includes(title.toLowerCase())

        ) {

            result.push({

                id: doc.id,

                ...data

            });

        }

    });

    return result;

}

/*==========================================================
    Realtime Quiz Listener
==========================================================*/

export function listenQuiz(id, callback) {

    return onSnapshot(

        quizRef(id),

        (docSnap) => {

            if (

                docSnap.exists()

            ) {

                callback({

                    id: docSnap.id,

                    ...docSnap.data()

                });

            }

        }

    );

}
/*==========================================================
    Get Leaderboard
==========================================================*/

export async function getLeaderboard(max = 100) {

    const q = query(

        collection(db, COLLECTION.USERS),

        orderBy("xp", "desc"),

        limit(max)

    );

    const snapshot = await getDocs(q);

    const leaderboard = [];

    let rank = 1;

    snapshot.forEach((doc) => {

        leaderboard.push({

            rank: rank++,

            id: doc.id,

            ...doc.data()

        });

    });

    return leaderboard;

}

/*==========================================================
    Realtime Leaderboard
==========================================================*/

export function listenLeaderboard(callback, max = 100) {

    const q = query(

        collection(db, COLLECTION.USERS),

        orderBy("xp", "desc"),

        limit(max)

    );

    return onSnapshot(q, (snapshot) => {

        const users = [];

        let rank = 1;

        snapshot.forEach((doc) => {

            users.push({

                rank: rank++,

                id: doc.id,

                ...doc.data()

            });

        });

        callback(users);

    });

}

/*==========================================================
    Get Notice
==========================================================*/

export async function getNotice() {

    const snapshot = await getDocs(

        collection(db, COLLECTION.NOTICE)

    );

    const notices = [];

    snapshot.forEach((doc) => {

        notices.push({

            id: doc.id,

            ...doc.data()

        });

    });

    return notices;

}

/*==========================================================
    Get Settings
==========================================================*/

export async function getSettings() {

    const snapshot = await getDocs(

        collection(db, COLLECTION.SETTINGS)

    );

    const settings = {};

    snapshot.forEach((doc) => {

        settings[doc.id] = doc.data();

    });

    return settings;

}

/*==========================================================
    Create Report
==========================================================*/

export async function createReport(data) {

    const docRef = await addDoc(

        collection(db, COLLECTION.REPORT),

        {

            ...data,

            createdAt: serverTimestamp()

        }

    );

    return docRef.id;

}

/*==========================================================
    Pagination
==========================================================*/

export async function getCollection(collectionName) {

    const snapshot = await getDocs(

        collection(db, collectionName)

    );

    const list = [];

    snapshot.forEach((doc) => {

        list.push({

            id: doc.id,

            ...doc.data()

        });

    });

    return list;

}

/*==========================================================
    Get Total Documents
==========================================================*/

export async function getTotalDocuments(collectionName) {

    const snapshot = await getDocs(

        collection(db, collectionName)

    );

    return snapshot.size;

}

/*==========================================================
    Delete User
==========================================================*/

export async function deleteUser(uid) {

    try {

        await deleteDoc(

            userRef(uid)

        );

        return true;

    } catch (error) {

        console.error(error);

        return false;

    }

}

/*==========================================================
    Block User
==========================================================*/

export async function blockUser(uid) {

    await updateDoc(

        userRef(uid),

        {

            isBlocked: true,

            updatedAt: serverTimestamp()

        }

    );

}

/*==========================================================
    Unblock User
==========================================================*/

export async function unblockUser(uid) {

    await updateDoc(

        userRef(uid),

        {

            isBlocked: false,

            updatedAt: serverTimestamp()

        }

    );

}

/*==========================================================
    Database Ready
==========================================================*/

console.log("========================================");
console.log("Quiz Of AKTER SIR");
console.log("Database System Loaded");
console.log("Firestore Connected Successfully");
console.log("Version : 1.0.0");
console.log("========================================");
