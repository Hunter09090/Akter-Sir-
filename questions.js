/* =====================================
   File : questions.js
   Part : 1
===================================== */

let allQuestions = [];
let quizQuestions = [];

/* =========================
   Load Questions
========================= */

async function loadQuestions(category) {

    try {

        const snapshot = await db
            .collection(QUESTIONS)
            .where("category", "==", category)
            .get();

        allQuestions = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        // Random Order
        quizQuestions = shuffleArray([...allQuestions]);

        return quizQuestions;

    }

    catch (error) {

        console.error("Question Load Error :", error);

        return [];

    }

}

/* =========================
   Shuffle Array
========================= */

function shuffleArray(array) {

    for (let i = array.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [array[i], array[j]] =
        [array[j], array[i]];

    }

    return array;

}
/* =====================================
   File : questions.js
   Part : 2
===================================== */

let currentQuestion = 0;
let userAnswers = [];

/* =========================
   Get Question
========================= */

function getQuestion() {

    return quizQuestions[currentQuestion];

}

/* =========================
   Save Answer
========================= */

function saveAnswer(answer) {

    userAnswers[currentQuestion] = answer;

}

/* =========================
   Next Question
========================= */

function nextQuestion() {

    if (currentQuestion < quizQuestions.length - 1) {

        currentQuestion++;

        showQuestion();

    }

}

/* =========================
   Previous Question
========================= */

function previousQuestion() {

    if (currentQuestion > 0) {

        currentQuestion--;

        showQuestion();

    }

}

/* =========================
   Reset Quiz
========================= */

function resetQuiz() {

    currentQuestion = 0;

    userAnswers = [];

    quizQuestions = [];

    allQuestions = [];

}
