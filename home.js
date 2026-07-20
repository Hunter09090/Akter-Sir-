/*==========================================================
    Quiz Of AKTER SIR
    home.js
    Version : 1.0.0
==========================================================*/

"use strict";

import {

    db

} from "./firebase-config.js";

import {

    collection,

    getDocs,

    query,

    orderBy,

    limit

} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

/*==========================================================
    HOME INITIALIZE
==========================================================*/

document.addEventListener(

    "DOMContentLoaded",

    () => {

        loadCategories();

        loadLatestQuiz();

        loadLeaderboard();

        loadStatistics();

    }

);

/*==========================================================
    CATEGORY
==========================================================*/

async function loadCategories(){

    const container=document.getElementById(

        "categoryContainer"

    );

    if(!container) return;

    container.innerHTML="";

    try{

        const snapshot=await getDocs(

            collection(db,"categories")

        );

        snapshot.forEach(doc=>{

            const data=doc.data();

            container.innerHTML+=`

            <div class="card category-card">

                <div class="icon">

                    📚

                </div>

                <h3>

                    ${data.name}

                </h3>

                <p>

                    ${data.description || ""}

                </p>

            </div>

            `;

        });

    }

    catch(error){

        console.error(error);

    }

}

/*==========================================================
    LATEST QUIZ
==========================================================*/

async function loadLatestQuiz(){

    const container=document.getElementById(

        "latestQuizContainer"

    );

    if(!container) return;

    container.innerHTML="";

    try{

        const q=query(

            collection(db,"quizzes"),

            orderBy("createdAt","desc"),

            limit(6)

        );

        const snapshot=await getDocs(q);

        snapshot.forEach(doc=>{

            const quiz=doc.data();

            container.innerHTML+=`

            <div class="card">

                <h3>

                    ${quiz.title}

                </h3>

                <p>

                    ${quiz.category}

                </p>

                <br>

                <a

                href="quiz.html?id=${doc.id}"

                class="btn">

                Start Quiz

                </a>

            </div>

            `;

        });

    }

    catch(error){

        console.error(error);

    }

}
/*==========================================================
    LEADERBOARD PREVIEW
==========================================================*/

async function loadLeaderboard() {

    const container = document.getElementById(

        "leaderboardContainer"

    );

    if (!container) return;

    container.innerHTML = "";

    try {

        const q = query(

            collection(db, "users"),

            orderBy("xp", "desc"),

            limit(10)

        );

        const snapshot = await getDocs(q);

        let rank = 1;

        snapshot.forEach(doc => {

            const user = doc.data();

            container.innerHTML += `

            <div class="card rank-card">

                <div class="rank-number">

                    ${rank++}

                </div>

                <div class="rank-user">

                    <h4>

                        ${user.name || "Unknown User"}

                    </h4>

                    <p class="rank-score">

                        XP : ${user.xp || 0}

                    </p>

                </div>

            </div>

            `;

        });

    }

    catch (error) {

        console.error(

            "Leaderboard Error :",

            error

        );

    }

}

/*==========================================================
    WEBSITE STATISTICS
==========================================================*/

async function loadStatistics() {

    try {

        const users = await getDocs(

            collection(db, "users")

        );

        const quizzes = await getDocs(

            collection(db, "quizzes")

        );

        const categories = await getDocs(

            collection(db, "categories")

        );

        animateCounter(

            "totalUsers",

            users.size

        );

        animateCounter(

            "totalQuiz",

            quizzes.size

        );

        animateCounter(

            "todayPlayers",

            0

        );

        animateCounter(

            "totalCategories",

            categories.size

        );

    }

    catch (error) {

        console.error(

            "Statistics Error :",

            error

        );

    }

}

/*==========================================================
    ANIMATED COUNTER
==========================================================*/

function animateCounter(id, target) {

    const element = document.getElementById(id);

    if (!element) return;

    let count = 0;

    const speed = Math.max(

        1,

        Math.ceil(target / 40)

    );

    const timer = setInterval(() => {

        count += speed;

        if (count >= target) {

            count = target;

            clearInterval(timer);

        }

        element.textContent = count;

    }, 30);

}

/*==========================================================
    NEWSLETTER
==========================================================*/

const newsletterBtn = document.getElementById(

    "newsletterBtn"

);

if (newsletterBtn) {

    newsletterBtn.addEventListener(

        "click",

        subscribeNewsletter

    );

}

function subscribeNewsletter() {

    const input = document.getElementById(

        "newsletterEmail"

    );

    if (!input) return;

    const email = input.value.trim();

    if (email === "") {

        Components.toast(

            "Please enter your email.",

            "warning"

        );

        return;

    }

    Components.toast(

        "Subscription feature will be added soon.",

        "success"

    );

    input.value = "";

}
/*==========================================================
    NEWSLETTER SAVE
==========================================================*/

import {

    addDoc,
    serverTimestamp

} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

async function subscribeNewsletter() {

    const input = document.getElementById(
        "newsletterEmail"
    );

    if (!input) return;

    const email = input.value.trim();

    if (!email) {

        Components.toast(
            "Please enter your email.",
            "warning"
        );

        return;
    }

    const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {

        Components.toast(
            "Invalid Email Address.",
            "error"
        );

        return;
    }

    try {

        newsletterBtn.disabled = true;

        newsletterBtn.innerHTML =
            "Please Wait...";

        const snapshot = await getDocs(
            collection(db, "newsletter")
        );

        let exists = false;

        snapshot.forEach(doc => {

            const data = doc.data();

            if (
                data.email &&
                data.email.toLowerCase() ===
                email.toLowerCase()
            ) {

                exists = true;

            }

        });

        if (exists) {

            Components.toast(
                "Already Subscribed.",
                "warning"
            );

        } else {

            await addDoc(

                collection(db, "newsletter"),

                {

                    email,

                    createdAt:
                    serverTimestamp()

                }

            );

            Components.toast(

                "Subscription Successful.",

                "success"

            );

        }

        input.value = "";

    }

    catch (error) {

        console.error(error);

        Components.toast(

            "Something went wrong.",

            "error"

        );

    }

    finally {

        newsletterBtn.disabled = false;

        newsletterBtn.innerHTML =
            "Subscribe";

    }

}

/*==========================================================
    EMPTY STATE
==========================================================*/

function emptyState(

    elementId,

    message

) {

    const element =
        document.getElementById(elementId);

    if (!element) return;

    element.innerHTML =

    `

    <div class="card">

        <center>

            <h3>

                📭

            </h3>

            <p>

                ${message}

            </p>

        </center>

    </div>

    `;

}

/*==========================================================
    RETRY
==========================================================*/

function retry(functionName) {

    if (typeof functionName === "function") {

        functionName();

    }

}

/*==========================================================
    GLOBAL EXPORT
==========================================================*/

window.Home = {

    loadCategories,

    loadLatestQuiz,

    loadLeaderboard,

    loadStatistics,

    subscribeNewsletter,

    retry

};

/*==========================================================
    END OF FILE
==========================================================*/
