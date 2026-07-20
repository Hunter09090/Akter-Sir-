/* ==========================================================
   Quiz Of AKTER SIR
   Global App Script
   Version : 1.0.0
========================================================== */

"use strict";

/* ==========================================================
   DOM Ready
========================================================== */

document.addEventListener("DOMContentLoaded", initApp);

/* ==========================================================
   Initialize
========================================================== */

async function initApp() {

    await loadHeader();

    await loadFooter();

    initMobileMenu();

    initTheme();

    activeMenu();

}

/* ==========================================================
   Load Header
========================================================== */

async function loadHeader() {

    const header = document.getElementById("header");

    if (!header) return;

    try {

        const response = await fetch("header.html");

        header.innerHTML = await response.text();

    } catch (error) {

        console.error("Header Load Error :", error);

    }

}

/* ==========================================================
   Load Footer
========================================================== */

async function loadFooter() {

    const footer = document.getElementById("footer");

    if (!footer) return;

    try {

        const response = await fetch("footer.html");

        footer.innerHTML = await response.text();

    } catch (error) {

        console.error("Footer Load Error :", error);

    }

}

/* ==========================================================
   Mobile Menu
========================================================== */

function initMobileMenu() {

    setTimeout(() => {

        const menuBtn = document.getElementById("menuBtn");

        const navbar = document.getElementById("navbar");

        if (!menuBtn || !navbar) return;

        menuBtn.onclick = () => {

            navbar.classList.toggle("show");

        };

    }, 300);

}

/* ==========================================================
   Theme
========================================================== */

function initTheme() {

    setTimeout(() => {

        const btn = document.getElementById("themeToggle");

        if (!btn) return;

        const savedTheme = localStorage.getItem("theme") || "light";

        document.body.setAttribute("data-theme", savedTheme);

        btn.textContent = savedTheme === "dark"
            ? "☀️"
            : "🌙";

        btn.onclick = () => {

            let current = document.body.getAttribute("data-theme");

            current = current === "dark"
                ? "light"
                : "dark";

            document.body.setAttribute("data-theme", current);

            localStorage.setItem("theme", current);

            btn.textContent = current === "dark"
                ? "☀️"
                : "🌙";

        };

    }, 300);

}

/* ==========================================================
   Active Navigation
========================================================== */

function activeMenu() {

    setTimeout(() => {

        const currentPage = location.pathname.split("/").pop();

        const links = document.querySelectorAll(".navbar a");

        links.forEach(link => {

            const href = link.getAttribute("href");

            if (href === currentPage) {

                link.classList.add("active");

            }

        });

    }, 300);

}

/* ==========================================================
   Global Utilities
========================================================== */

window.App = {

    version: "1.0.0",

    website: "Quiz Of AKTER SIR"

};
