/*
==========================================================
 Quiz Of AKTER SIR
 utils.js
 Utility Library
 Version : 1.0.0
==========================================================
*/

"use strict";

/*==========================================================
    Application Information
==========================================================*/

export const APP = {

    NAME: "Quiz Of AKTER SIR",

    VERSION: "1.0.0",

    AUTHOR: "AKTER SIR",

    EMAIL: "aakterhossen80@gmail.com",

    WHATSAPP: "01884197276",

    FACEBOOK: "https://www.facebook.com/ahr110"

};

/*==========================================================
    DOM Selector
==========================================================*/

export const $ = (selector) => {

    return document.querySelector(selector);

};

export const $$ = (selector) => {

    return document.querySelectorAll(selector);

};

/*==========================================================
    Element Creator
==========================================================*/

export function create(tag) {

    return document.createElement(tag);

}

/*==========================================================
    Safe Text
==========================================================*/

export function setText(element, text) {

    if (!element) return;

    element.textContent = text;

}

/*==========================================================
    Safe HTML
==========================================================*/

export function setHTML(element, html) {

    if (!element) return;

    element.innerHTML = html;

}

/*==========================================================
    Show Element
==========================================================*/

export function show(element) {

    if (!element) return;

    element.style.display = "";

}

/*==========================================================
    Hide Element
==========================================================*/

export function hide(element) {

    if (!element) return;

    element.style.display = "none";

}

/*==========================================================
    Toggle Element
==========================================================*/

export function toggle(element) {

    if (!element) return;

    if (element.style.display === "none") {

        show(element);

    } else {

        hide(element);

    }

}

/*==========================================================
    Add Class
==========================================================*/

export function addClass(element, className) {

    if (!element) return;

    element.classList.add(className);

}

/*==========================================================
    Remove Class
==========================================================*/

export function removeClass(element, className) {

    if (!element) return;

    element.classList.remove(className);

}

/*==========================================================
    Toggle Class
==========================================================*/

export function toggleClass(element, className) {

    if (!element) return;

    element.classList.toggle(className);

}

/*==========================================================
    Has Class
==========================================================*/

export function hasClass(element, className) {

    if (!element) return false;

    return element.classList.contains(className);

}

/*==========================================================
    Random Integer
==========================================================*/

export function random(min, max) {

    return Math.floor(

        Math.random() * (max - min + 1)

    ) + min;

}

/*==========================================================
    Random String
==========================================================*/

export function randomString(length = 12) {

    const chars =

        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    let output = "";

    for (let i = 0; i < length; i++) {

        output += chars.charAt(

            Math.floor(Math.random() * chars.length)

        );

    }

    return output;

}

/*==========================================================
    UUID Generator
==========================================================*/

export function uuid() {

    return crypto.randomUUID();

}

/*==========================================================
    Copy Text
==========================================================*/

export async function copy(text) {

    try {

        await navigator.clipboard.writeText(text);

        return true;

    } catch {

        return false;

    }

}

/*==========================================================
    Scroll Top
==========================================================*/

export function scrollTop() {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}

/*==========================================================
    Scroll Bottom
==========================================================*/

export function scrollBottom() {

    window.scrollTo({

        top: document.body.scrollHeight,

        behavior: "smooth"

    });

}
/*==========================================================
    Email Validation
==========================================================*/

export function isValidEmail(email) {

    const pattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return pattern.test(
        String(email).trim()
    );

}

/*==========================================================
    Password Validation
==========================================================*/

export function isValidPassword(password) {

    /*
        Minimum 8 Characters
        1 Uppercase
        1 Lowercase
        1 Number
        1 Special Character
    */

    const pattern =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_#])[A-Za-z\d@$!%*?&_#]{8,}$/;

    return pattern.test(password);

}

/*==========================================================
    Phone Validation (Bangladesh)
==========================================================*/

export function isValidPhone(phone) {

    const pattern =
        /^(\+8801|8801|01)[3-9]\d{8}$/;

    return pattern.test(
        phone.trim()
    );

}

/*==========================================================
    Username Validation
==========================================================*/

export function isValidUsername(username) {

    const pattern =
        /^[a-zA-Z0-9_]{4,30}$/;

    return pattern.test(
        username.trim()
    );

}

/*==========================================================
    Empty String Check
==========================================================*/

export function isEmpty(value) {

    return value === null ||

        value === undefined ||

        value.toString().trim() === "";

}

/*==========================================================
    Number Formatter
==========================================================*/

export function numberFormat(number) {

    return Number(number).toLocaleString();

}

/*==========================================================
    Percentage Formatter
==========================================================*/

export function percent(value) {

    return `${Number(value).toFixed(2)}%`;

}

/*==========================================================
    Date Formatter
==========================================================*/

export function formatDate(date) {

    return new Date(date).toLocaleDateString(

        "en-BD",

        {

            year: "numeric",

            month: "long",

            day: "numeric"

        }

    );

}

/*==========================================================
    Time Formatter
==========================================================*/

export function formatTime(date) {

    return new Date(date).toLocaleTimeString(

        "en-BD",

        {

            hour: "2-digit",

            minute: "2-digit",

            second: "2-digit"

        }

    );

}

/*==========================================================
    Date Time Formatter
==========================================================*/

export function formatDateTime(date) {

    return `${formatDate(date)} ${formatTime(date)}`;

}

/*==========================================================
    Local Storage
==========================================================*/

export const storage = {

    set(key, value) {

        localStorage.setItem(

            key,

            JSON.stringify(value)

        );

    },

    get(key) {

        const value =

            localStorage.getItem(key);

        return value ?

            JSON.parse(value) :

            null;

    },

    remove(key) {

        localStorage.removeItem(key);

    },

    clear() {

        localStorage.clear();

    }

};

/*==========================================================
    Session Storage
==========================================================*/

export const session = {

    set(key, value) {

        sessionStorage.setItem(

            key,

            JSON.stringify(value)

        );

    },

    get(key) {

        const value =

            sessionStorage.getItem(key);

        return value ?

            JSON.parse(value) :

            null;

    },

    remove(key) {

        sessionStorage.removeItem(key);

    },

    clear() {

        sessionStorage.clear();

    }

};

/*==========================================================
    Download JSON
==========================================================*/

export function downloadJSON(filename, data) {

    const blob = new Blob(

        [

            JSON.stringify(

                data,

                null,

                4

            )

        ],

        {

            type: "application/json"

        }

    );

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = filename;

    a.click();

    URL.revokeObjectURL(url);

}

/*==========================================================
    Read JSON File
==========================================================*/

export function readJSON(file) {

    return new Promise(

        (resolve, reject) => {

            const reader = new FileReader();

            reader.onload = e => {

                try {

                    resolve(

                        JSON.parse(

                            e.target.result

                        )

                    );

                } catch (error) {

                    reject(error);

                }

            };

            reader.onerror = reject;

            reader.readAsText(file);

        }

    );

}
/*==========================================================
    Debounce
==========================================================*/

export function debounce(callback, delay = 300) {

    let timer;

    return (...args) => {

        clearTimeout(timer);

        timer = setTimeout(() => {

            callback(...args);

        }, delay);

    };

}

/*==========================================================
    Throttle
==========================================================*/

export function throttle(callback, delay = 300) {

    let waiting = false;

    return (...args) => {

        if (waiting) return;

        callback(...args);

        waiting = true;

        setTimeout(() => {

            waiting = false;

        }, delay);

    };

}

/*==========================================================
    Shuffle Array
==========================================================*/

export function shuffle(array = []) {

    const items = [...array];

    for (let i = items.length - 1; i > 0; i--) {

        const j = Math.floor(

            Math.random() * (i + 1)

        );

        [items[i], items[j]] =

        [items[j], items[i]];

    }

    return items;

}

/*==========================================================
    Sleep
==========================================================*/

export function sleep(ms = 1000) {

    return new Promise(resolve => {

        setTimeout(resolve, ms);

    });

}

/*==========================================================
    Network Status
==========================================================*/

export function isOnline() {

    return navigator.onLine;

}

window.addEventListener("online", () => {

    console.log("Internet Connected");

});

window.addEventListener("offline", () => {

    console.log("Internet Disconnected");

});

/*==========================================================
    Theme Manager
==========================================================*/

const THEME_KEY = "quiz_theme";

export function setTheme(theme) {

    document.documentElement
        .setAttribute("data-theme", theme);

    storage.set(THEME_KEY, theme);

}

export function getTheme() {

    return storage.get(THEME_KEY) || "light";

}

export function loadTheme() {

    setTheme(getTheme());

}

export function toggleTheme() {

    const theme =

        getTheme() === "dark"

        ? "light"

        : "dark";

    setTheme(theme);

}

/*==========================================================
    Device Detection
==========================================================*/

export function isMobile() {

    return window.innerWidth < 768;

}

export function isTablet() {

    return window.innerWidth >= 768 &&
           window.innerWidth < 1024;

}

export function isDesktop() {

    return window.innerWidth >= 1024;

}

/*==========================================================
    Browser Detection
==========================================================*/

export function browserName() {

    const ua = navigator.userAgent;

    if (ua.includes("Edg"))
        return "Edge";

    if (ua.includes("Chrome"))
        return "Chrome";

    if (ua.includes("Firefox"))
        return "Firefox";

    if (ua.includes("Safari"))
        return "Safari";

    return "Unknown";

}

/*==========================================================
    Countdown Timer
==========================================================*/

export class Countdown {

    constructor(seconds, onTick, onFinish) {

        this.time = seconds;

        this.onTick = onTick;

        this.onFinish = onFinish;

        this.interval = null;

    }

    start() {

        this.interval = setInterval(() => {

            this.time--;

            if (this.onTick)

                this.onTick(this.time);

            if (this.time <= 0) {

                clearInterval(this.interval);

                if (this.onFinish)

                    this.onFinish();

            }

        }, 1000);

    }

    stop() {

        clearInterval(this.interval);

    }

}

/*==========================================================
    Sound Player
==========================================================*/

export function playSound(path) {

    const audio = new Audio(path);

    audio.play();

}

/*==========================================================
    Vibrate
==========================================================*/

export function vibrate(ms = 200) {

    if ("vibrate" in navigator) {

        navigator.vibrate(ms);

    }

}

/*==========================================================
    Fullscreen
==========================================================*/

export async function enterFullscreen() {

    if (document.documentElement.requestFullscreen) {

        await document.documentElement.requestFullscreen();

    }

}

export async function exitFullscreen() {

    if (document.fullscreenElement) {

        await document.exitFullscreen();

    }

}

/*==========================================================
    Utility Ready
==========================================================*/

console.log("====================================");
console.log(APP.NAME);
console.log("Utility Library Loaded");
console.log("Version :", APP.VERSION);
console.log("====================================");

loadTheme();
