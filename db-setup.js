import { db } from './firebase-config.js';
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

// স্যাম্পল প্রশ্ন যা ডাটাবেজে অটোমেটিক সেভ হবে
const sampleQuestions = [
    {
        question: "বাংলাদেশের রাজধানীর নাম কি?",
        options: ["ঢাকা", "চট্টগ্রাম", "সিলেট", "খুলনা"],
        answer: "ঢাকা"
    },
    {
        question: "কম্পিউটারের মস্তিষ্ক কাকে বলা হয়?",
        options: ["Monitor", "CPU", "Keyboard", "Mouse"],
        answer: "CPU"
    }
];

export async function initializeDatabase() {
    try {
        const quizCollection = collection(db, "quizzes");
        
        for (const q of sampleQuestions) {
            await addDoc(quizCollection, q);
        }
        
        console.log("Database initialized successfully with sample questions!");
        alert("ডাটাবেজ সফলভাবে তৈরি হয়েছে!");
    } catch (error) {
        console.error("Error creating database: ", error);
    }
}
