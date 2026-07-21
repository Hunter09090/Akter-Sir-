document.body.style.background = "red";
alert("question-import.js Loaded");
/* =====================================
   File : question-import.js
   Part : 1
===================================== */

// Firestore
const db = firebase.firestore();

// Collection
const QUESTIONS = "questions";

// Elements
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
        "Ready to Import...";

}

/* =========================
   Clear Text
========================= */

clearBtn.addEventListener("click", () => {

    questionInput.value = "";

    resetReport();

});

/* =========================
   Start Import
========================= */

importBtn.addEventListener("click", () => {

    importQuestions();

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
   Parse Questions
========================= */

    const blocks = text
        .split("===")
        .map(item => item.trim())
        .filter(item => item.length);

    totalCount.textContent =
        blocks.length;

    let success = 0;

    let duplicate = 0;

    let failed = 0;

    for (const block of blocks) {

        try {

            const lines = block
                .split("\n")
                .map(item => item.trim())
                .filter(item => item);

            const question =
                lines.find(line =>
                    line.startsWith("Q:") ||
                    line.startsWith("প্রশ্ন:")
                );

            const optionA =
                lines.find(line =>
                    line.startsWith("A:")
                );

            const optionB =
                lines.find(line =>
                    line.startsWith("B:")
                );

            const optionC =
                lines.find(line =>
                    line.startsWith("C:")
                );

            const optionD =
                lines.find(line =>
                    line.startsWith("D:")
                );

            const answer =
                lines.find(line =>
                    line.toLowerCase().startsWith("answer:")
                );

            if (
                !question ||
                !optionA ||
                !optionB ||
                !optionC ||
                !optionD ||
                !answer
            ) {

                failed++;

                continue;

            }

            const questionText =
                question.replace(/^Q:|^প্রশ্ন:/, "").trim();

            const options = [

                optionA.replace(/^A:/, "").trim(),

                optionB.replace(/^B:/, "").trim(),

                optionC.replace(/^C:/, "").trim(),

                optionD.replace(/^D:/, "").trim()

            ];

            const answerLetter =
                answer
                .replace(/^Answer:/i, "")
                .trim()
                .toUpperCase();

            const answerMap = {

                A: options[0],

                B: options[1],

                C: options[2],

                D: options[3]

            };
                      const finalAnswer =
                answerMap[answerLetter];

            if (!finalAnswer) {

                failed++;

                continue;

            }

            /* =========================
               Duplicate Check
            ========================= */

            const duplicateSnapshot =
                await db
                    .collection(QUESTIONS)
                    .where("category", "==", category)
                    .where("question", "==", questionText)
                    .limit(1)
                    .get();

            if (!duplicateSnapshot.empty) {

                duplicate++;

                continue;

            }

            /* =========================
               Save Question
            ========================= */

            await db
                .collection(QUESTIONS)
                .add({

                    category,

                    question: questionText,

                    options,

                    answer: finalAnswer,

                    difficulty: "Easy",

                    createdAt:
                        firebase.firestore.FieldValue.serverTimestamp()

                });

            success++;

            statusBox.textContent =
                `Importing ${success}/${blocks.length}...`;

        }

        catch (error) {

            console.error(error);

            failed++;

        }

    }

    /* =========================
       Import Report
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
