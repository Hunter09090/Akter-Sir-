
/*==========================================================
    Quiz Of AKTER SIR
    database.js
    Firestore Seeder
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
    doc,
    setDoc,
    serverTimestamp

} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

/*==========================================================
    CATEGORY DATA
==========================================================*/

const DEFAULT_CATEGORIES = [

{
    id:"islam",
    name:"ইসলাম",
    slug:"islam",
    icon:"🕌",
    color:"#16a34a",
    description:"ইসলামিক জ্ঞান বিষয়ক কুইজ",
    totalQuiz:0,
    featured:true,
    isActive:true,
    order:1
},

{
    id:"general-knowledge",
    name:"সাধারণ জ্ঞান",
    slug:"general-knowledge",
    icon:"📚",
    color:"#2563eb",
    description:"বাংলাদেশ ও বিশ্ব সাধারণ জ্ঞান",
    totalQuiz:0,
    featured:true,
    isActive:true,
    order:2
},

{
    id:"bangladesh",
    name:"বাংলাদেশ",
    slug:"bangladesh",
    icon:"🇧🇩",
    color:"#059669",
    description:"বাংলাদেশ বিষয়ক কুইজ",
    totalQuiz:0,
    featured:true,
    isActive:true,
    order:3
},

{
    id:"international",
    name:"আন্তর্জাতিক",
    slug:"international",
    icon:"🌍",
    color:"#0ea5e9",
    description:"আন্তর্জাতিক বিষয়াবলী",
    totalQuiz:0,
    featured:false,
    isActive:true,
    order:4
},

{
    id:"mathematics",
    name:"গণিত",
    slug:"mathematics",
    icon:"➗",
    color:"#7c3aed",
    description:"গণিত কুইজ",
    totalQuiz:0,
    featured:true,
    isActive:true,
    order:5
},

{
    id:"science",
    name:"বিজ্ঞান",
    slug:"science",
    icon:"🔬",
    color:"#dc2626",
    description:"বিজ্ঞান বিষয়ক কুইজ",
    totalQuiz:0,
    featured:true,
    isActive:true,
    order:6
},

{
    id:"ict",
    name:"আইসিটি",
    slug:"ict",
    icon:"💻",
    color:"#0891b2",
    description:"তথ্য ও যোগাযোগ প্রযুক্তি",
    totalQuiz:0,
    featured:true,
    isActive:true,
    order:7
}
];
/*==========================================================
    MORE CATEGORY DATA
==========================================================*/

DEFAULT_CATEGORIES.push(

{
    id:"english",
    name:"ইংরেজি",
    slug:"english",
    icon:"🇬🇧",
    color:"#2563eb",
    description:"English Quiz",
    totalQuiz:0,
    featured:true,
    isActive:true,
    order:8
},

{
    id:"bangla",
    name:"বাংলা",
    slug:"bangla",
    icon:"✍️",
    color:"#ea580c",
    description:"বাংলা বিষয়ক কুইজ",
    totalQuiz:0,
    featured:true,
    isActive:true,
    order:9
},

{
    id:"riddle",
    name:"ধাঁধা",
    slug:"riddle",
    icon:"🧩",
    color:"#9333ea",
    description:"ধাঁধা ও ব্রেইন গেম",
    totalQuiz:0,
    featured:true,
    isActive:true,
    order:10
},

{
    id:"job",
    name:"চাকরির প্রস্তুতি",
    slug:"job",
    icon:"💼",
    color:"#15803d",
    description:"চাকরির প্রস্তুতির কুইজ",
    totalQuiz:0,
    featured:false,
    isActive:true,
    order:11
},

{
    id:"bcs",
    name:"BCS",
    slug:"bcs",
    icon:"🎓",
    color:"#b91c1c",
    description:"BCS প্রস্তুতি",
    totalQuiz:0,
    featured:true,
    isActive:true,
    order:12
},

{
    id:"university",
    name:"বিশ্ববিদ্যালয় ভর্তি",
    slug:"university",
    icon:"🏛️",
    color:"#0f766e",
    description:"University Admission Quiz",
    totalQuiz:0,
    featured:false,
    isActive:true,
    order:13
},

{
    id:"daily-quiz",
    name:"Daily Quiz",
    slug:"daily-quiz",
    icon:"📅",
    color:"#f59e0b",
    description:"প্রতিদিনের নতুন কুইজ",
    totalQuiz:0,
    featured:true,
    isActive:true,
    order:14
}

);

/*==========================================================
    SEED CATEGORIES
==========================================================*/

async function seedCategories() {

    try {

        const snapshot = await getDocs(

            collection(db, "categories")

        );

        if (!snapshot.empty) {

            console.log(
                "Categories already exist."
            );

            return;

        }

        for (const category of DEFAULT_CATEGORIES) {

            await setDoc(

                doc(

                    db,

                    "categories",

                    category.id

                ),

                {

                    ...category,

                    createdAt:

                    serverTimestamp(),

                    updatedAt:

                    serverTimestamp()

                }

            );

        }

        console.log(

            "Categories seeded successfully."

        );

    }

    catch (error) {

        console.error(

            "Seeder Error:",

            error

        );

    }

}

/*==========================================================
    INITIALIZE
==========================================================*/

document.addEventListener(

    "DOMContentLoaded",

    () => {

        seedCategories();

    }

);

/*==========================================================
    GLOBAL EXPORT
==========================================================*/

window.Database = {

    seedCategories

};

/*==========================================================
    END OF FILE
==========================================================*/
