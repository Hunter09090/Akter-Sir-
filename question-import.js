/* =====================================
   File : question-import.js
   Part : 1
===================================== */

/* =========================
   Firestore
========================= */

const db = firebase.firestore();

const QUESTIONS = "questions";

/* =========================
   Elements
========================= */

const categorySelect =
    document.getElementById("category");

const questionInput =
    document.getElementById("questions");

const importBtn =
    document.getElementById("importBtn");

const clearBtn =
    document.getElementById("clearBtn");

const statusBox =
    document.getElementById("statusBox");

const totalCount =
    document.getElementById("totalCount");

const successCount =
    document.getElementById("successCount");

const duplicateCount =
    document.getElementById("duplicateCount");

const failedCount =
    document.getElementById("failedCount");

/* =========================
   Reset Report
========================= */

function resetReport() {

    totalCount.textContent = "0";

    successCount.textContent = "0";

    duplicateCount.textContent = "0";

    failedCount.textContent = "0";

    statusBox.textContent =
        "Ready to Import";

}

/* =========================
   Clear
========================= */

clearBtn.addEventListener("click", () => {

    questionInput.value = "";

    resetReport();

});

/* =========================
   Import Button
========================= */

importBtn.addEventListener("click", async () => {

    await importQuestions();

});

/* =========================
   Import Questions
========================= */

async function importQuestions() {

    resetReport();

    const category =
        categorySelect.value.trim();

    const text =
        questionInput.value.trim();

    if (!text) {

        alert("প্রশ্ন Paste করুন।");

        return;

    }

    statusBox.textContent =
        "Reading Questions...";

}
/* =========================
   Split Question Blocks
========================= */

    const blocks = text
        .split("===")
        .map(item => item.trim())
        .filter(item => item.length > 0);

    totalCount.textContent =
        blocks.length;

    const parsedQuestions = [];

    for (const block of blocks) {

        const lines = block
            .split("\n")
            .map(item => item.trim())
            .filter(item => item);

        if (lines.length < 6) {

            continue;

        }

        const questionLine = lines.find(line =>
            line.startsWith("Q:")
        );

        const optionA = lines.find(line =>
            line.startsWith("A:")
        );

        const optionB = lines.find(line =>
            line.startsWith("B:")
        );

        const optionC = lines.find(line =>
            line.startsWith("C:")
        );

        const optionD = lines.find(line =>
            line.startsWith("D:")
        );

        const answerLine = lines.find(line =>
            line.toLowerCase().startsWith("answer:")
        );

        if (
            !questionLine ||
            !optionA ||
            !optionB ||
            !optionC ||
            !optionD ||
            !answerLine
        ) {

            continue;

        }

        const question =
            questionLine.replace(/^Q:/, "").trim();

        const options = [

            optionA.replace(/^A:/, "").trim(),

            optionB.replace(/^B:/, "").trim(),

            optionC.replace(/^C:/, "").trim(),

            optionD.replace(/^D:/, "").trim()

        ];

        const answerLetter =
            answerLine
            .replace(/^Answer:/i, "")
            .trim()
            .toUpperCase();

        const answerMap = {

            A: options[0],

            B: options[1],

            C: options[2],

            D: options[3]

        };

        if (!answerMap[answerLetter]) {

            continue;

        }

        parsedQuestions.push({

            category,

            question,

            options,

            answer: answerMap[answerLetter]

        });

    }

    statusBox.textContent =
        `${parsedQuestions.length} Questions Parsed...`;
/* =========================
   Load Existing Questions
========================= */

    const snapshot =
        await db
            .collection(QUESTIONS)
            .where("category", "==", category)
            .get();

    const existingQuestions =
        new Set();

    snapshot.forEach(doc => {

        const item = doc.data();

        existingQuestions.add(
            item.question.trim().toLowerCase()
        );

    });

    let success = 0;

    let duplicate = 0;

    let failed = 0;

    /* =========================
       Import Loop
    ========================= */

    for (const item of parsedQuestions) {

        const key =
            item.question
                .trim()
                .toLowerCase();

        if (existingQuestions.has(key)) {

            duplicate++;

            continue;

        }

        try {

            await db
                .collection(QUESTIONS)
                .add({

                    category: item.category,

                    question: item.question,

                    options: item.options,

                    answer: item.answer,

                    difficulty: "Easy",

                    createdAt:
                        firebase.firestore.FieldValue.serverTimestamp()

                });

            existingQuestions.add(key);

            success++;

            statusBox.textContent =
                `Imported ${success} / ${parsedQuestions.length}`;

        }

        catch (error) {

            console.error(error);

            failed++;

        }

    }

    /* =========================
       Report
    ========================= */

    successCount.textContent =
        success;

    duplicateCount.textContent =
        duplicate;

    failedCount.textContent =
        failed;

    statusBox.textContent =
        "✅ Import Completed";

    questionInput.value = "";

}
