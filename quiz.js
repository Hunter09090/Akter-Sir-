/* =====================================
   File : quiz.js
   Part : 1
===================================== */

let selectedCategory = "";

let quizTime = 600; // 10 Minutes

let timer = null;

/* =========================
   Start Quiz
========================= */

async function startQuiz(category) {

    selectedCategory = category;

    const questions = await loadQuestions(category);

    if (!questions.length) {

        alert("এই ক্যাটাগরিতে এখনো কোনো প্রশ্ন যোগ করা হয়নি।");

        return;

    }

    document
        .getElementById("category-section")
        .classList.add("hidden");

    document
        .getElementById("top-three")
        .classList.add("hidden");

    document
        .getElementById("quiz-section")
        .classList.remove("hidden");

    currentQuestion = 0;

    userAnswers = [];

    quizTime = 600;

    startTimer();

    showQuestion();

}

/* =========================
   Show Question
========================= */

function showQuestion() {

    const question = getQuestion();

    if (!question) return;

    document.getElementById("quizCategory").textContent =
        selectedCategory;

    document.getElementById("questionText").textContent =
        question.question;

    const optionContainer =
        document.getElementById("optionContainer");

    optionContainer.innerHTML = "";

    const options = shuffleArray([
        question.options[0],
        question.options[1],
        question.options[2],
        question.options[3]
    ]);

    options.forEach(option => {

        optionContainer.innerHTML += `

            <button
                class="option-btn"
                onclick="selectAnswer(this,'${option.replace(/'/g,"\\'")}')">

                ${option}

            </button>

        `;

    });

}
/* =====================================
   File : quiz.js
   Part : 2
===================================== */

/* =========================
   Select Answer
========================= */

function selectAnswer(button, answer) {

    document
        .querySelectorAll(".option-btn")
        .forEach(btn => btn.classList.remove("selected"));

    button.classList.add("selected");

    saveAnswer(answer);

}

/* =========================
   Timer
========================= */

function startTimer() {

    clearInterval(timer);

    updateTimer();

    timer = setInterval(() => {

        quizTime--;

        updateTimer();

        if (quizTime <= 0) {

            clearInterval(timer);

            finishQuiz();

        }

    }, 1000);

}

function updateTimer() {

    const minutes = Math.floor(quizTime / 60);

    const seconds = quizTime % 60;

    document.getElementById("quizTimer").textContent =
        `⏱️ ${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

}

/* =========================
   Navigation
========================= */

document.addEventListener("click", e => {

    if (e.target.id === "nextBtn") {

        nextQuestion();

    }

    if (e.target.id === "prevBtn") {

        previousQuestion();

    }

    if (e.target.id === "finishBtn") {

        if (confirm("আপনি কি কুইজ শেষ করতে চান?")) {

            finishQuiz();

        }

    }

});
/* =====================================
   File : quiz.js
   Part : 3
===================================== */

/* =========================
   Finish Quiz
========================= */

async function finishQuiz() {

    clearInterval(timer);

    let correct = 0;

    quizQuestions.forEach((question, index) => {

        if (userAnswers[index] === question.answer) {

            correct++;

        }

    });

    const wrong = quizQuestions.length - correct;
    const score = correct;

    // Leaderboard Save
    await saveLeaderboard({

        score,
        correct,
        wrong,
        time: 600 - quizTime

    });

    // Hide Quiz
    document
        .getElementById("quiz-section")
        .classList.add("hidden");

    // Show Result
    document
        .getElementById("result-section")
        .classList.remove("hidden");

    document.getElementById("correctAnswer").textContent = correct;
    document.getElementById("wrongAnswer").textContent = wrong;
    document.getElementById("finalScore").textContent = score;

}

/* =========================
   Result Buttons
========================= */

document
    .getElementById("playAgainBtn")
    .addEventListener("click", () => {

        resetQuiz();

        document
            .getElementById("result-section")
            .classList.add("hidden");

        document
            .getElementById("category-section")
            .classList.remove("hidden");

        document
            .getElementById("top-three")
            .classList.remove("hidden");

    });

document
    .getElementById("homeBtn")
    .addEventListener("click", () => {

        location.reload();

    });
