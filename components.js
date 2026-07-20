/*=========================================================
  Quiz Of AKTER SIR
  components.js
  Version : 2.0.0
=========================================================*/

"use strict";

/*=========================================================
    APP INFO
=========================================================*/

const APP = {

    NAME: "Quiz Of AKTER SIR",

    VERSION: "2.0.0",

    AUTHOR: "AKTER SIR",

    EMAIL: "aakterhossen80@gmail.com",

    PHONE: "01884197276",

    FACEBOOK: "https://www.facebook.com/ahr110",

    WHATSAPP: "https://wa.me/8801884197276"

};

/*=========================================================
    COMPONENTS
=========================================================*/

const Components = {

    init() {

        this.header();

        this.footer();

        this.activeMenu();

        this.mobileMenu();

        this.theme();

    },

/*=========================================================
    HEADER
=========================================================*/

header() {

const target=document.getElementById("header");

if(!target) return;

target.innerHTML=`

<header class="header">

<div class="container">

<div class="header-wrapper">

<a href="index.html" class="logo">

<div class="logo-icon">

🧠

</div>

<div class="logo-text">

<h2>${APP.NAME}</h2>

<p>Learn • Practice • Success</p>

</div>

</a>

<button id="menuBtn" class="menu-btn">

☰

</button>

<nav id="navbar">

<ul>

<li>

<a href="index.html">

Home

</a>

</li>

<li>

<a href="categories.html">

Categories

</a>

</li>

<li>

<a href="daily-quiz.html">

Daily Quiz

</a>

</li>

<li>

<a href="leaderboard.html">

Leaderboard

</a>

</li>

<li>

<a href="dashboard.html">

Dashboard

</a>

</li>

<li>

<a href="profile.html">

Profile

</a>

</li>

<li>

<a href="contact.html">

Contact

</a>

</li>

</ul>

</nav>

<div class="header-action">

<button id="themeBtn"

class="theme-btn">

🌙

</button>

<a href="login.html"

class="login-btn">

Login

</a>

</div>

</div>

</div>

</header>

`;

},

/*=========================================================
    FOOTER
=========================================================*/

footer(){

const target=document.getElementById("footer");

if(!target) return;

target.innerHTML=`

<footer class="footer">

<div class="container">

<div class="footer-grid">

<div>

<h2>

${APP.NAME}

</h2>

<p>

Professional Online Quiz Platform

</p>

</div>

<div>

<h3>

Quick Links

</h3>

<ul>

<li>

<a href="index.html">

Home

</a>

</li>

<li>

<a href="leaderboard.html">

Leaderboard

</a>

</li>

<li>

<a href="dashboard.html">

Dashboard

</a>

</li>

<li>

<a href="profile.html">

Profile

</a>

</li>

</ul>

</div>

<div>

<h3>

Contact

</h3>

<p>

<a href="${APP.WHATSAPP}"

target="_blank">

WhatsApp

</a>

</p>

<p>

<a href="mailto:${APP.EMAIL}">

Email

</a>

</p>

<p>

<a href="${APP.FACEBOOK}"

target="_blank">

Facebook

</a>

</p>

</div>

</div>

<div class="copyright">

© 2026 Quiz Of AKTER SIR

</div>

</div>

</footer>

`;

},
  /*=========================================================
    ACTIVE MENU
=========================================================*/

activeMenu() {

    const page = window.location.pathname
        .split("/")
        .pop() || "index.html";

    const links = document.querySelectorAll("#navbar a");

    links.forEach(link => {

        const href = link.getAttribute("href");

        if (href === page) {

            link.classList.add("active");

        }

    });

},

/*=========================================================
    MOBILE MENU
=========================================================*/

mobileMenu() {

    const menuBtn = document.getElementById("menuBtn");

    const navbar = document.getElementById("navbar");

    if (!menuBtn || !navbar) return;

    menuBtn.addEventListener("click", () => {

        navbar.classList.toggle("show");

        menuBtn.classList.toggle("active");

    });

    document.addEventListener("click", (event) => {

        if (
            !navbar.contains(event.target) &&
            !menuBtn.contains(event.target)
        ) {

            navbar.classList.remove("show");

            menuBtn.classList.remove("active");

        }

    });

},

/*=========================================================
    THEME SYSTEM
=========================================================*/

theme() {

    const btn = document.getElementById("themeBtn");

    if (!btn) return;

    const savedTheme =
        localStorage.getItem("theme") || "light";

    document.documentElement.setAttribute(
        "data-theme",
        savedTheme
    );

    btn.textContent =
        savedTheme === "dark"
        ? "☀️"
        : "🌙";

    btn.addEventListener("click", () => {

        let theme =
            document.documentElement.getAttribute("data-theme");

        theme =
            theme === "dark"
            ? "light"
            : "dark";

        document.documentElement.setAttribute(
            "data-theme",
            theme
        );

        localStorage.setItem("theme", theme);

        btn.textContent =
            theme === "dark"
            ? "☀️"
            : "🌙";

    });

},

/*=========================================================
    PAGE LOADER
=========================================================*/

showLoader(message = "Loading...") {

    if (document.getElementById("appLoader")) return;

    document.body.insertAdjacentHTML(

        "beforeend",

`
<div id="appLoader" class="app-loader">

    <div class="loader-box">

        <div class="loader-spinner"></div>

        <p>${message}</p>

    </div>

</div>
`

    );

},

hideLoader() {

    const loader =
        document.getElementById("appLoader");

    if (loader) {

        loader.remove();

    }

},

/*=========================================================
    TOAST MESSAGE
=========================================================*/

toast(

    message = "",

    type = "success",

    duration = 3000

) {

    const toast = document.createElement("div");

    toast.className =

        "toast " + type;

    toast.innerHTML = message;

    document.body.appendChild(toast);

    setTimeout(() => {

        toast.classList.add("show");

    }, 50);

    setTimeout(() => {

        toast.classList.remove("show");

        setTimeout(() => {

            toast.remove();

        }, 300);

    }, duration);

},
  /*=========================================================
    MODAL SYSTEM
=========================================================*/

modal(title = "", content = "") {

    this.closeModal();

    const html = `

    <div class="modal-overlay" id="appModal">

        <div class="modal">

            <div class="modal-header">

                <h2>${title}</h2>

                <button id="closeModalBtn">&times;</button>

            </div>

            <div class="modal-body">

                ${content}

            </div>

        </div>

    </div>

    `;

    document.body.insertAdjacentHTML(

        "beforeend",

        html

    );

    document
        .getElementById("closeModalBtn")
        .onclick = () => this.closeModal();

    document
        .getElementById("appModal")
        .onclick = (e) => {

            if (e.target.id === "appModal") {

                this.closeModal();

            }

        };

},

closeModal() {

    const modal = document.getElementById("appModal");

    if (modal) {

        modal.remove();

    }

},

/*=========================================================
    CONFIRM BOX
=========================================================*/

confirm(

    title,

    message,

    callback

) {

    this.modal(

        title,

        `

        <p>${message}</p>

        <div class="modal-action">

            <button
                id="yesBtn"
                class="btn">

                Yes

            </button>

            <button
                id="noBtn"
                class="btn btn-danger">

                No

            </button>

        </div>

        `

    );

    document
        .getElementById("yesBtn")
        .onclick = () => {

            this.closeModal();

            if (callback) callback(true);

        };

    document
        .getElementById("noBtn")
        .onclick = () => {

            this.closeModal();

            if (callback) callback(false);

        };

},

/*=========================================================
    ALERT BOX
=========================================================*/

alert(

    title,

    message

) {

    this.modal(

        title,

        `

        <p>${message}</p>

        <br>

        <button
            id="okBtn"
            class="btn">

            OK

        </button>

        `

    );

    document
        .getElementById("okBtn")
        .onclick = () => {

            this.closeModal();

        };

},

/*=========================================================
    SCROLL TO TOP
=========================================================*/

scrollTopButton() {

    const btn = document.createElement("button");

    btn.id = "scrollTopBtn";

    btn.innerHTML = "↑";

    document.body.appendChild(btn);

    window.addEventListener(

        "scroll",

        () => {

            if (window.scrollY > 300) {

                btn.classList.add("show");

            } else {

                btn.classList.remove("show");

            }

        }

    );

    btn.onclick = () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    };

},

/*=========================================================
    PAGE BACK
=========================================================*/

goBack() {

    history.back();

},

/*=========================================================
    PAGE RELOAD
=========================================================*/

reload() {

    location.reload();

},
  /*=========================================================
    USER MENU
=========================================================*/

userMenu() {

    const userBtn = document.getElementById("userMenuBtn");

    const userMenu = document.getElementById("userMenu");

    if (!userBtn || !userMenu) return;

    userBtn.addEventListener("click", () => {

        userMenu.classList.toggle("show");

    });

    document.addEventListener("click", (event) => {

        if (
            !userBtn.contains(event.target) &&
            !userMenu.contains(event.target)
        ) {

            userMenu.classList.remove("show");

        }

    });

},

/*=========================================================
    USER AVATAR
=========================================================*/

setAvatar(name = "User") {

    const avatar = document.querySelectorAll(".user-avatar");

    if (!avatar.length) return;

    const firstLetter = name.trim().charAt(0).toUpperCase();

    avatar.forEach(item => {

        item.textContent = firstLetter;

    });

},

/*=========================================================
    LOGOUT
=========================================================*/

logout(callback = null) {

    localStorage.removeItem("user");

    sessionStorage.clear();

    this.toast(

        "Successfully Logged Out",

        "success"

    );

    setTimeout(() => {

        if (callback) {

            callback();

        } else {

            location.href = "login.html";

        }

    }, 1000);

},

/*=========================================================
    NETWORK STATUS
=========================================================*/

networkStatus() {

    const updateStatus = () => {

        if (navigator.onLine) {

            this.toast(

                "Internet Connected",

                "success",

                2000

            );

        } else {

            this.toast(

                "No Internet Connection",

                "error",

                4000

            );

        }

    };

    window.addEventListener(

        "online",

        updateStatus

    );

    window.addEventListener(

        "offline",

        updateStatus

    );

},

/*=========================================================
    COPY TEXT
=========================================================*/

copy(text) {

    navigator.clipboard.writeText(text)

    .then(() => {

        this.toast(

            "Copied Successfully",

            "success"

        );

    })

    .catch(() => {

        this.toast(

            "Copy Failed",

            "error"

        );

    });

},

/*=========================================================
    RANDOM ID
=========================================================*/

randomId(length = 20) {

    const chars =

        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    let id = "";

    for (let i = 0; i < length; i++) {

        id += chars.charAt(

            Math.floor(Math.random() * chars.length)

        );

    }

    return id;

},

/*=========================================================
    FORMAT DATE
=========================================================*/

formatDate(date = new Date()) {

    return new Intl.DateTimeFormat(

        "en-BD",

        {

            day: "2-digit",

            month: "long",

            year: "numeric"

        }

    ).format(date);

},

/*=========================================================
    FORMAT TIME
=========================================================*/

formatTime(date = new Date()) {

    return new Intl.DateTimeFormat(

        "en-BD",

        {

            hour: "2-digit",

            minute: "2-digit",

            second: "2-digit"

        }

    ).format(date);

},
  /*=========================================================
    SEARCH
=========================================================*/

search(list, keyword) {

    if (!Array.isArray(list)) return [];

    keyword = keyword.toLowerCase().trim();

    return list.filter(item =>

        JSON.stringify(item)

        .toLowerCase()

        .includes(keyword)

    );

},

/*=========================================================
    DEBOUNCE
=========================================================*/

debounce(callback, delay = 300) {

    let timer;

    return (...args) => {

        clearTimeout(timer);

        timer = setTimeout(() => {

            callback(...args);

        }, delay);

    };

},

/*=========================================================
    LOADING BUTTON
=========================================================*/

buttonLoading(button, loading = true) {

    if (!button) return;

    if (loading) {

        button.dataset.text = button.innerHTML;

        button.disabled = true;

        button.innerHTML =

            '<span class="btn-spinner"></span> Loading...';

    } else {

        button.disabled = false;

        button.innerHTML =

            button.dataset.text || "Submit";

    }

},

/*=========================================================
    STORAGE
=========================================================*/

storage: {

    set(key, value) {

        localStorage.setItem(

            key,

            JSON.stringify(value)

        );

    },

    get(key) {

        const data = localStorage.getItem(key);

        return data ? JSON.parse(data) : null;

    },

    remove(key) {

        localStorage.removeItem(key);

    },

    clear() {

        localStorage.clear();

    }

},

/*=========================================================
    SESSION
=========================================================*/

session: {

    set(key, value) {

        sessionStorage.setItem(

            key,

            JSON.stringify(value)

        );

    },

    get(key) {

        const data = sessionStorage.getItem(key);

        return data ? JSON.parse(data) : null;

    },

    remove(key) {

        sessionStorage.removeItem(key);

    },

    clear() {

        sessionStorage.clear();

    }

}

};

/*=========================================================
    AUTO INITIALIZE
=========================================================*/

document.addEventListener(

    "DOMContentLoaded",

    () => {

        Components.init();

        Components.scrollTopButton();

        Components.networkStatus();

    }

);

/*=========================================================
    GLOBAL EXPORT
=========================================================*/

window.APP = APP;

window.Components = Components;

/*=========================================================
    END OF FILE
=========================================================*/
