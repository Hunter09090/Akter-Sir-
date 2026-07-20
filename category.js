/*==========================================================
    Quiz Of AKTER SIR
    category.js
    Version : 1.0.0
==========================================================*/

"use strict";

/*==========================================================
    IMPORT
==========================================================*/

import { db } from "./firebase-config.js";

import {

    collection,

    getDocs,

    query,

    where,

    orderBy,

    limit

} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

/*==========================================================
    GLOBAL
==========================================================*/

let categories = [];

const categoryContainer =
document.getElementById("categoryContainer");

const featuredContainer =
document.getElementById("featuredCategoryContainer");

const recentContainer =
document.getElementById("recentCategoryContainer");

const loadingSection =
document.getElementById("categoryLoading");

const emptySection =
document.getElementById("emptyCategory");

const searchInput =
document.getElementById("categorySearch");

const sortSelect =
document.getElementById("sortCategory");

/*==========================================================
    INITIALIZE
==========================================================*/

document.addEventListener(

    "DOMContentLoaded",

    initializeCategoryPage

);

async function initializeCategoryPage() {

    await loadCategories();

    initializeSearch();

    initializeSort();

}

/*==========================================================
    LOAD CATEGORY
==========================================================*/

async function loadCategories() {

    try {

        showLoading(true);

        const q = query(

            collection(db, "categories"),

            where("isActive", "==", true),

            orderBy("order", "asc")

        );

        const snapshot = await getDocs(q);

        categories = [];

        snapshot.forEach(doc => {

            categories.push({

                id: doc.id,

                ...doc.data()

            });

        });

        renderCategories(categories);

        updateStatistics();

        showLoading(false);

    }

    catch (error) {

        console.error(error);

        showLoading(false);

        showEmpty(true);

    }

}

/*==========================================================
    RENDER CATEGORY
==========================================================*/

function renderCategories(data) {

    if (!categoryContainer) return;

    categoryContainer.innerHTML = "";

    if (data.length === 0) {

        showEmpty(true);

        return;

    }

    showEmpty(false);

    data.forEach(category => {

        categoryContainer.innerHTML += `

        <div class="card category-card">

            <div
            class="icon"

            style="background:${category.color};">

                ${category.icon || "📚"}

            </div>

            <h3>

                ${category.name}

            </h3>

            <p>

                ${category.description || ""}

            </p>

            <br>

            <small>

                Total Quiz :
                ${category.totalQuiz || 0}

            </small>

            <br><br>

            <a

                href="quiz.html?category=${category.slug}"

                class="btn">

                Start Quiz

            </a>

        </div>

        `;

    });

              }
/*==========================================================
    FEATURED CATEGORIES
==========================================================*/

async function loadFeaturedCategories() {

    if (!featuredContainer) return;

    featuredContainer.innerHTML = "";

    try {

        const q = query(

            collection(db, "categories"),

            where("isActive", "==", true),

            where("featured", "==", true),

            orderBy("order", "asc"),

            limit(6)

        );

        const snapshot = await getDocs(q);

        snapshot.forEach(doc => {

            const category = doc.data();

            featuredContainer.innerHTML += createCategoryCard(

                doc.id,

                category

            );

        });

    }

    catch (error) {

        console.error(error);

    }

}

/*==========================================================
    RECENT CATEGORIES
==========================================================*/

async function loadRecentCategories() {

    if (!recentContainer) return;

    recentContainer.innerHTML = "";

    try {

        const q = query(

            collection(db, "categories"),

            orderBy("createdAt", "desc"),

            limit(6)

        );

        const snapshot = await getDocs(q);

        snapshot.forEach(doc => {

            const category = doc.data();

            recentContainer.innerHTML += createCategoryCard(

                doc.id,

                category

            );

        });

    }

    catch (error) {

        console.error(error);

    }

}

/*==========================================================
    CATEGORY CARD
==========================================================*/

function createCategoryCard(id, category) {

    return `

    <div class="card category-card">

        <div

            class="icon"

            style="background:${category.color || '#2563eb'}">

            ${category.icon || "📚"}

        </div>

        <h3>

            ${category.name}

        </h3>

        <p>

            ${category.description || ""}

        </p>

        <br>

        <small>

            Quiz :
            ${category.totalQuiz || 0}

        </small>

        <br><br>

        <a

            href="quiz.html?category=${category.slug}"

            class="btn">

            Start Quiz

        </a>

    </div>

    `;

}

/*==========================================================
    STATISTICS
==========================================================*/

function updateStatistics() {

    setCounter(

        "totalCategory",

        categories.length

    );

    const totalQuiz = categories.reduce(

        (sum, category) =>

        sum + (category.totalQuiz || 0),

        0

    );

    setCounter(

        "totalQuiz",

        totalQuiz

    );

    setCounter(

        "activeCategory",

        categories.filter(

            category =>

            category.isActive

        ).length

    );

    setCounter(

        "todayQuiz",

        0

    );

}

/*==========================================================
    COUNTER
==========================================================*/

function setCounter(id, value) {

    const element =

        document.getElementById(id);

    if (!element) return;

    let count = 0;

    const step = Math.max(

        1,

        Math.ceil(value / 40)

    );

    const timer = setInterval(() => {

        count += step;

        if (count >= value) {

            count = value;

            clearInterval(timer);

        }

        element.textContent = count;

    }, 25);

}
/*==========================================================
    SEARCH
==========================================================*/

function initializeSearch() {

    if (!searchInput) return;

    searchInput.addEventListener(

        "input",

        event => {

            const keyword =

                event.target.value

                .toLowerCase()

                .trim();

            const filtered =

                categories.filter(category =>

                    category.name
                        ?.toLowerCase()
                        .includes(keyword)

                    ||

                    category.description
                        ?.toLowerCase()
                        .includes(keyword)

                );

            renderCategories(filtered);

        }

    );

}

/*==========================================================
    SORT
==========================================================*/

function initializeSort() {

    if (!sortSelect) return;

    sortSelect.addEventListener(

        "change",

        event => {

            const value =

                event.target.value;

            let sorted =

                [...categories];

            switch (value) {

                case "az":

                    sorted.sort(

                        (a, b) =>

                        a.name.localeCompare(b.name)

                    );

                    break;

                case "za":

                    sorted.sort(

                        (a, b) =>

                        b.name.localeCompare(a.name)

                    );

                    break;

                case "quiz":

                    sorted.sort(

                        (a, b) =>

                        (b.totalQuiz || 0)

                        -

                        (a.totalQuiz || 0)

                    );

                    break;

                default:

                    sorted.sort(

                        (a, b) =>

                        (a.order || 999)

                        -

                        (b.order || 999)

                    );

            }

            renderCategories(sorted);

        }

    );

}

/*==========================================================
    LOADING
==========================================================*/

function showLoading(show) {

    if (!loadingSection) return;

    loadingSection.style.display =

        show ? "block" : "none";

}

/*==========================================================
    EMPTY STATE
==========================================================*/

function showEmpty(show) {

    if (!emptySection) return;

    emptySection.style.display =

        show ? "block" : "none";

}

/*==========================================================
    REFRESH
==========================================================*/

async function refreshCategories() {

    await loadCategories();

    await loadFeaturedCategories();

    await loadRecentCategories();

}

/*==========================================================
    GLOBAL EXPORT
==========================================================*/

window.Category = {

    refresh: refreshCategories,

    search: initializeSearch,

    sort: initializeSort

};

/*==========================================================
    END OF FILE
==========================================================*/
