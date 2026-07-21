
/* =====================================
   File : utils.js
===================================== */

/* =========================
   Get Element
========================= */

const $ = id => document.getElementById(id);

/* =========================
   Create Element
========================= */

function create(tag, className = "") {

    const element = document.createElement(tag);

    if (className)
        element.className = className;

    return element;

}

/* =========================
   Show
========================= */

function show(id) {

    $(id).classList.remove("hidden");

}

/* =========================
   Hide
========================= */

function hide(id) {

    $(id).classList.add("hidden");

}

/* =========================
   Toggle
========================= */

function toggle(id) {

    $(id).classList.toggle("hidden");

}

/* =========================
   Random Number
========================= */

function random(min, max) {

    return Math.floor(Math.random() * (max - min + 1)) + min;

}

/* =========================
   Format Time
========================= */

function formatTime(seconds) {

    const minute = Math.floor(seconds / 60);

    const second = seconds % 60;

    return `${String(minute).padStart(2, "0")}:${String(second).padStart(2, "0")}`;

}

/* =========================
   Escape HTML
========================= */

function escapeHTML(text) {

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}



/* =========================
   Copy Text
========================= */

async function copy(text) {

    try {

        await navigator.clipboard.writeText(text);

    }

    catch (error) {

        console.error(error);

    }

}
/* =========================
   Load Header
========================= */

async function loadHeader() {

    const header =
        document.getElementById("header");

    if (!header) return;

    const response =
        await fetch("header.html");

    header.innerHTML =
        await response.text();

    if (typeof bindHeaderEvents === "function") {

        bindHeaderEvents();

    }

}

/* =========================
   Load Footer
========================= */

async function loadFooter() {

    const footer =
        document.getElementById("footer");

    if (!footer) return;

    const response =
        await fetch("footer.html");

    footer.innerHTML =
        await response.text();

}
