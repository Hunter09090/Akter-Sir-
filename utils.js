
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
   Shuffle Array
========================= */

function shuffle(array) {

    for (let i = array.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [array[i], array[j]] = [array[j], array[i]];

    }

    return array;

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
