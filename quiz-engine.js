import { db } from './firebase-config.js';
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

const quizContainer = document.getElementById('quiz-container');

async function loadQuiz() {
    quizContainer.innerHTML = "<p>প্রশ্ন লোড হচ্ছে...</p>";
    
    try {
        // Firestore থেকে 'quizzes' কালেকশনটি নিচ্ছি
        const querySnapshot = await getDocs(collection(db, "quizzes"));
        
        let htmlContent = "<h2>কুইজ শুরু করুন</h2>";
        
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            // ডাটাবেজের ফিল্ড অনুযায়ী প্রশ্ন সাজাচ্ছি
            htmlContent += `
                <div class="question-card">
                    <p><strong>${data.question}</strong></p>
                    <div class="options">
                        ${data.options.map(opt => `<button class="opt-btn">${opt}</button>`).join('')}
                    </div>
                </div>
            `;
        });
        
        quizContainer.innerHTML = htmlContent;
    } catch (error) {
        console.error("Error loading quiz: ", error);
        quizContainer.innerHTML = "<p>প্রশ্ন লোড করতে সমস্যা হয়েছে। দয়া করে ইন্টারনেট চেক করুন।</p>";
    }
}

// পেজ লোড হলেই কুইজ ফেচ করবে
loadQuiz();
