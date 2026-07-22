
/* =====================================
   File : app.js
   Part : 1
===================================== */

const introScreen = document.getElementById("intro-screen");
const app = document.getElementById("app");

const header = document.getElementById("header");
const footer = document.getElementById("footer");

/* =========================
   App Start
========================= */

window.addEventListener("load", initApp);

async function initApp() {

    await loadLayout();

    startIntro();

   renderCategories();

loadTopThreeUI();
   
}

/* =========================
   Intro Animation
========================= */

function startIntro() {

    setTimeout(() => {

        introScreen.style.display = "none";

        app.classList.remove("hidden");

    }, 2500);

}

/* =========================
   Load Header & Footer
========================= */

async function loadLayout() {

    try {

        const [headerHTML, footerHTML] = await Promise.all([

            fetch("header.html").then(res => res.text()),

            fetch("footer.html").then(res => res.text())

        ]);

        header.innerHTML = headerHTML;

        footer.innerHTML = footerHTML;

        bindHeaderEvents();

    }

    catch (error) {

        console.error("Layout Load Error :", error);

    }

}

/* =========================
   Header Events
========================= */

function bindHeaderEvents() {

    const loginBtn = document.getElementById("loginBtn");

    const logoutBtn = document.getElementById("logoutBtn");

    if (loginBtn)
        loginBtn.onclick = login;

    if (logoutBtn)
        logoutBtn.onclick = logout;

}
/* =====================================
   File : app.js
   Part : 2
===================================== */

/* =========================
   Update User UI
========================= */

function updateUserUI(user) {

    const profile = document.getElementById("userProfile");
    const loginBtn = document.getElementById("loginBtn");
    const logoutBtn = document.getElementById("logoutBtn");
    const userPhoto = document.getElementById("userPhoto");
    const userName = document.getElementById("userName");

    if (!profile || !loginBtn || !logoutBtn) return;

    if (user) {

        profile.classList.remove("hidden");

        loginBtn.classList.add("hidden");

        logoutBtn.classList.remove("hidden");

        userPhoto.src = user.photoURL ||
            "https://via.placeholder.com/40";

        userName.textContent =
            user.displayName || "User";

    } else {

        profile.classList.add("hidden");

        loginBtn.classList.remove("hidden");

        logoutBtn.classList.add("hidden");

        userPhoto.src =
            "https://via.placeholder.com/40";

        userName.textContent = "Guest";

    }

}

/* =========================
   Weekly Top 3
========================= */

async function loadTopThreeUI() {

    const container =
        document.getElementById("leaderboardList");

    if (!container) return;

    const players = await loadTopThree();

    if (!players.length) {

        container.innerHTML = `
            <div class="top-card">
                <h3>No Data</h3>
                <p>Leaderboard is empty.</p>
            </div>
        `;

        return;

    }

    const medals = ["🥇", "🥈", "🥉"];

    container.innerHTML = players.map((player, index) => `

        <div class="top-card">

            <h3>${medals[index]}</h3>

            <p><strong>${player.name}</strong></p>

            <p>Score : ${player.score}</p>

        </div>

    `).join("");

}

/* =========================
   Load Home Data
========================= */

document.addEventListener("DOMContentLoaded", () => {

    loadTopThreeUI();

});
/* =====================================
   File : app.js
   Part : 3
===================================== */

/* =========================
   Quiz Categories
========================= */

const categories = [

    "সাধারণ জ্ঞান",
    "বাংলাদেশ",
    "আন্তর্জাতিক",
    "ইসলাম",
    "বাংলা",
    "ইংরেজি",
    "গণিত",
    "বিজ্ঞান",
    "আইসিটি",
    "ধাঁধা",
    "ইতিহাস",
    "ভূগোল",
    "খেলাধুলা",
    "বিনোদন"

];

/* =========================
   Render Categories
========================= */

function renderCategories() {

    const container =
        document.getElementById("categoryContainer");

    if (!container) return;

    container.innerHTML = "";

    categories.forEach(category => {

        container.innerHTML += `

            <div class="category-card"
                 onclick="startQuiz('${category}')">

                <h3>${category}</h3>

                <p>Start Quiz</p>

            </div>

        `;

    });

}

/* =========================
   Placeholder
========================= */
/* =====================================
   Premium Animation Pack
   Part 3
===================================== */

/* =========================
   Website Load Animation
========================= */

window.addEventListener("load",()=>{

    document.body.classList.add("loaded");

});

/* =========================
   Category Animation
========================= */

function animateCategories(){

    const cards =

    document.querySelectorAll(

        ".category-card"

    );

    cards.forEach((card,index)=>{

        card.style.animationDelay =

        `${index * 0.08}s`;

    });

}

/* =========================
   Ripple Effect
========================= */

document.addEventListener("click",(e)=>{

    const btn =

    e.target.closest("button");

    if(!btn) return;

    const ripple =

    document.createElement("span");

    ripple.className =

    "ripple";

    const rect =

    btn.getBoundingClientRect();

    ripple.style.left =

    `${e.clientX - rect.left}px`;

    ripple.style.top =

    `${e.clientY - rect.top}px`;

    btn.appendChild(ripple);

    setTimeout(()=>{

        ripple.remove();

    },600);

});

/* =========================
   Init
========================= */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        animateCategories();

    }

);
