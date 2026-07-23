/* =====================================
   File : quiz.js
   Professional Final Version
   Part : 1
===================================== */
/* ==========================
   Share Score Data
========================== */

let finalCorrect = 0;

let finalWrong = 0;

let finalScore = 0;

/* =====================================
   Quiz Variables
===================================== */

let selectedCategory = "";

let currentQuestion = 0;

let quizQuestions = [];

let userAnswers = [];

let answeredQuestions = [];

let quizTime = 600;

let timer = null;

let endTime = 0;

let canAnswer = true;

/* =====================================
   Quiz Sounds
===================================== */

const correctSound =
document.getElementById("correctSound");

const wrongSound =
document.getElementById("wrongSound");

const answerStatus =
document.getElementById("answerStatus");

/* =====================================
   Quiz Elements
===================================== */

const quizSection =
document.getElementById("quiz-section");

const resultSection =
document.getElementById("result-section");

const questionText =
document.getElementById("questionText");

const optionContainer =
document.getElementById("optionContainer");

const quizCategory =
document.getElementById("quizCategory");

const quizTimer =
document.getElementById("quizTimer");

/* =====================================
   Start Quiz
===================================== */

async function startQuiz(category){

    selectedCategory = category;

    const questions =
    await loadQuestions(category);

    if(!questions.length){

        alert("এই ক্যাটাগরিতে এখনো কোনো প্রশ্ন নেই।");

        return;

    }

    quizQuestions = questions;

    currentQuestion = 0;

    userAnswers = [];

    answeredQuestions = [];

    quizTime = 600;

    canAnswer = true;

    document
    .getElementById("category-section")
    .classList.add("hidden");

    document
    .getElementById("top-three")
    .classList.add("hidden");

    quizSection.classList.remove("hidden");

    hideAnswerStatus();

    startTimer();

    showQuestion();

}
/* =====================================
   Show Question
===================================== */

function showQuestion(){

    canAnswer = true;

    hideAnswerStatus();

    const question =
    quizQuestions[currentQuestion];

    if(!question) return;

    quizCategory.textContent =
    selectedCategory;

    questionText.textContent =
    `${currentQuestion + 1}. ${question.question}`;

    optionContainer.innerHTML = "";

    const options =
    shuffleArray([...question.options]);

    options.forEach(option=>{

        const button =
        document.createElement("button");

        button.className =
        "option-btn";

        button.innerHTML =
        option;

        button.onclick = ()=>{

            selectAnswer(
                button,
                option
            );

        };

        optionContainer
        .appendChild(button);

    });

    restoreAnswer();

}

/* =====================================
   Restore Previous Answer
===================================== */

function restoreAnswer(){

    const savedAnswer =
    userAnswers[currentQuestion];

    if(!savedAnswer) return;

    document
    .querySelectorAll(".option-btn")
    .forEach(btn=>{

        if(
            btn.textContent.trim() ===
            savedAnswer
        ){

            btn.classList.add(
                "selected"
            );

        }

    });

}

/* =====================================
   Enable Buttons
===================================== */

function enableOptions(){

    document
    .querySelectorAll(".option-btn")
    .forEach(btn=>{

        btn.disabled = false;

    });

}

/* =====================================
   Disable Buttons
===================================== */

function disableOptions(){

    document
    .querySelectorAll(".option-btn")
    .forEach(btn=>{

        btn.disabled = true;

    });

}
/* =====================================
   Select Answer
===================================== */

function selectAnswer(button, answer){

    if(!canAnswer) return;

    canAnswer = false;

    userAnswers[currentQuestion] = answer;

    answeredQuestions[currentQuestion] = true;

    disableOptions();

    const question =
    quizQuestions[currentQuestion];

    const buttons =
    document.querySelectorAll(".option-btn");

    buttons.forEach(btn=>{

        const text =
        btn.textContent.trim();

        if(text === question.answer){

            btn.classList.add("correct");

        }

        if(

            text === answer &&

            answer !== question.answer

        ){

            btn.classList.add("wrong");

        }

    });

    if(answer === question.answer){

        if(correctSound){

            correctSound.currentTime = 0;

            correctSound.play().catch(()=>{});

        }

        showAnswerStatus(

            "✔️ Correct!",

            "correct"

        );

    }

    else{

        if(wrongSound){

            wrongSound.currentTime = 0;

            wrongSound.play().catch(()=>{});

        }

        showAnswerStatus(

            "❌ Wrong!",

            "wrong"

        );

    }

    setTimeout(()=>{

        if(

            currentQuestion <

            quizQuestions.length - 1

        ){

            currentQuestion++;

            showQuestion();

        }

        else{

            finishQuiz();

        }

    },1000);

           }
/* =====================================
   Accurate Timer
===================================== */

function startTimer(){

    clearInterval(timer);

    endTime =
    Date.now() + (quizTime * 1000);

    updateTimer();

    timer =
    setInterval(updateTimer,250);

}

/* =====================================
   Update Timer
===================================== */

function updateTimer(){

    const remaining =
    Math.max(

        0,

        Math.ceil(

            (endTime - Date.now())

            / 1000

        )

    );

    quizTime = remaining;

    const minutes =
    Math.floor(remaining / 60);

    const seconds =
    remaining % 60;

    quizTimer.textContent =
    `⏱️ ${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`;

    if(remaining <= 0){

        clearInterval(timer);

        finishQuiz();

    }

}

/* =====================================
   Stop Timer
===================================== */

function stopTimer(){

    clearInterval(timer);

}
/* =====================================
   Finish Quiz
===================================== */

async function finishQuiz(){

    stopTimer();

    let correct = 0;

    let wrong = 0;

    let skipped = 0;

    quizQuestions.forEach((question,index)=>{

        const answer =
        userAnswers[index];

        if(

            answer === undefined ||

            answer === null ||

            answer === ""

        ){

            skipped++;

            return;

        }

        if(answer === question.answer){

            correct++;

        }

        else{

            wrong++;

        }

    });

    const score = correct;
/* ==========================
   Save Final Result
========================== */

finalCorrect = correct;

finalWrong = wrong;

finalScore = score;
   
    try{

        await saveLeaderboard({

            score,

            correct,

            wrong,

            time : 600 - quizTime

        });

    }

    catch(error){

        console.error(error);

    }

    quizSection.classList.add("hidden");

    resultSection.classList.remove("hidden");

    
   
    document.getElementById("correctAnswer").textContent =
    correct;

    document.getElementById("wrongAnswer").textContent =
    wrong;

    document.getElementById("finalScore").textContent =
    score;
/* =====================================
   Level Badge
===================================== */

const badge =
document.getElementById("levelBadge");

const percentage =
Math.round(

(score / quizQuestions.length)

*100

);

badge.className =
"level-badge";

if(percentage>=90){

    badge.innerHTML =
    "🏆 Expert";

    badge.classList.add(
    "level-expert");

}

else if(percentage>=70){

    badge.innerHTML =
    "🥇 Advanced";

    badge.classList.add(
    "level-advanced");

}

else if(percentage>=50){

    badge.innerHTML =
    "🥈 Intermediate";

    badge.classList.add(
    "level-intermediate");

}

else if(percentage>=30){

    badge.innerHTML =
    "🥉 Beginner";

    badge.classList.add(
    "level-beginner");

}

else{

    badge.innerHTML =
    "📘 Practice More";

    badge.classList.add(
    "level-practice");

}
   /* ==========================
   Save Badge
========================== */

const user = firebase.auth().currentUser;

if (user) {

    await db.collection(USERS)

    .doc(user.uid)

    .update({

        badge: badge.innerHTML

    });

}
    console.log({

        correct,

        wrong,

        skipped,

        score

    });

}
/* ==========================
   Save Badge & Highest Score
========================== */

const user = firebase.auth().currentUser;

if (user) {

    const userRef = db.collection(USERS).doc(user.uid);

    const userDoc = await userRef.get();

    const oldHighest =
        userDoc.exists
        ? (userDoc.data().highestScore || 0)
        : 0;

    await userRef.update({

        badge: badge.innerHTML,

        highestScore: Math.max(oldHighest, score)

    });

}

/* =====================================
   Navigation
===================================== */

document
.getElementById("nextBtn")
.addEventListener("click",()=>{

    if(

        currentQuestion <

        quizQuestions.length - 1

    ){

        currentQuestion++;

        showQuestion();

    }

});

document
.getElementById("prevBtn")
.addEventListener("click",()=>{

    if(currentQuestion > 0){

        currentQuestion--;

        showQuestion();

    }

});

/* =====================================
   Finish Button
===================================== */

document
.getElementById("finishBtn")
.addEventListener("click",()=>{

    if(

        confirm("আপনি কি কুইজ শেষ করতে চান?")

    ){

        finishQuiz();

    }

});

/* =====================================
   Play Again
===================================== */

document
.getElementById("playAgainBtn")
.addEventListener("click",()=>{

    resetQuiz();

    resultSection.classList.add("hidden");

    document
    .getElementById("category-section")
    .classList.remove("hidden");

    document
    .getElementById("top-three")
    .classList.remove("hidden");

});

/* =====================================
   Home Button
===================================== */

document
.getElementById("homeBtn")
.addEventListener("click",()=>{

    location.reload();

});

/* =====================================
   Reset Quiz
===================================== */

function resetQuiz(){

    stopTimer();

    selectedCategory = "";

    currentQuestion = 0;

    quizQuestions = [];

    userAnswers = [];

    answeredQuestions = [];

    quizTime = 600;

    endTime = 0;

    canAnswer = true;

    hideAnswerStatus();

   }
/* =====================================
   File : quiz.js
   Final Professional Version
   Part : 7
===================================== */

/* =====================================
   Answer Status
===================================== */

function showAnswerStatus(message,type){

    if(!answerStatus) return;

    answerStatus.className =
    "answer-status";

    answerStatus.classList.add(type);

    answerStatus.classList.remove("hidden");

    answerStatus.textContent = message;

}

/* =====================================
   Hide Status
===================================== */

function hideAnswerStatus(){

    if(!answerStatus) return;

    answerStatus.className =
    "answer-status hidden";

}

/* =====================================
   Play Sound
===================================== */

function playCorrectSound(){

    if(!correctSound) return;

    correctSound.pause();

    correctSound.currentTime = 0;

    correctSound.play()

    .catch(()=>{});

}

function playWrongSound(){

    if(!wrongSound) return;

    wrongSound.pause();

    wrongSound.currentTime = 0;

    wrongSound.play()

    .catch(()=>{});

}

/* =====================================
   Enable / Disable Buttons
===================================== */

function enableButtons(){

    document

    .querySelectorAll(".option-btn")

    .forEach(btn=>{

        btn.disabled = false;

    });

}

function disableButtons(){

    document

    .querySelectorAll(".option-btn")

    .forEach(btn=>{

        btn.disabled = true;

    });

}

/* =====================================
   End
===================================== */

console.log(

"✅ quiz.js Final Loaded Successfully"

);
/* =====================================
   Share Score
===================================== */

async function shareScore() {

    const shareText =

`🎉 আমি Quiz Of AKTER SIR-এ ${finalScore} Score করেছি!

✅ Correct : ${finalCorrect}
❌ Wrong : ${finalWrong}

তুমিও খেলো 👇

https://hunter09090.github.io/Akter-Sir-/`;

    if (navigator.share) {

        try {

            await navigator.share({

                title: "Quiz Of AKTER SIR",

                text: shareText

            });

        }

        catch (error) {

            console.log(error);

        }

    } else {

        await navigator.clipboard.writeText(shareText);

        alert("✅ Score copied to clipboard!");

    }

}
/* =====================================
   Share Button
===================================== */

document.addEventListener("DOMContentLoaded", () => {

    const shareBtn = document.getElementById("shareBtn");

    if (shareBtn) {

        shareBtn.addEventListener("click", shareScore);

    }

});
