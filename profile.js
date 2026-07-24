/* =====================================
   File : profile.js
===================================== */

/* =========================
   Initialize Profile Page
========================= */

async function initProfile() {

    await loadHeader();
    await loadFooter();

    if (typeof bindHeaderEvents === "function") {
        bindHeaderEvents();
    }

    auth.onAuthStateChanged(async (user) => {

        if (!user) {

            location.href = "index.html";
            return;

        }

        document.getElementById("profilePhoto").src =
            user.photoURL || "https://via.placeholder.com/100";

        document.getElementById("profileName").textContent =
            user.displayName || "Guest";

        document.getElementById("profileEmail").textContent =
            user.email || "-";

        await loadProfileStats(user.uid);
await loadUserBadge(user.uid);
       
    });

}

/* =========================
   Load Profile Statistics
========================= */

async function loadProfileStats(uid) {

    try {

        const snapshot = await db
            .collection("leaderboard")
            .where("uid", "==", uid)
            .get();

        let highestScore = 0;
        let totalQuiz = 0;
        let totalCorrect = 0;

        snapshot.forEach(doc => {

            const item = doc.data();

            totalQuiz++;

            totalCorrect += item.correct || 0;

            if ((item.score || 0) > highestScore) {

                highestScore = item.score;

            }

        });

        const highest =
            document.getElementById("highestScore");

        if (highest)
            highest.textContent = highestScore;

        const quizPlayed =
            document.getElementById("quizPlayed");

        if (quizPlayed)
            quizPlayed.textContent = totalQuiz;

        const totalCorrectBox =
            document.getElementById("totalCorrect");

        if (totalCorrectBox)
            totalCorrectBox.textContent = totalCorrect;

        await loadRecentQuiz(uid);

    }

    catch (error) {

        console.error("Profile Stats Error :", error);

    }

}

/* =========================
   Recent 5 Quiz History
========================= */

async function loadRecentQuiz(uid) {

    const box =
        document.getElementById("recentQuizList");

    if (!box) return;

    try {

        const snapshot = await db
            .collection("leaderboard")
            .where("uid", "==", uid)
            .orderBy("createdAt", "desc")
            .limit(5)
            .get();

        if (snapshot.empty) {

            box.innerHTML =
                "<p>No Quiz Played Yet.</p>";

            return;

        }

        box.innerHTML = "";

        snapshot.forEach(doc => {

            const item = doc.data();

            box.innerHTML += `

                <div class="recent-item">

                    <div class="recent-left">

                        <span class="recent-score">

                            Score : ${item.score}

                        </span>

                        <span>

                            Correct : ${item.correct}

                        </span>

                        <span>

                            Wrong : ${item.wrong}

                        </span>

                    </div>

                    <div class="recent-time">

                        ${item.time}s

                    </div>

                </div>

            `;

        });

    }

    catch (error) {

        console.error(error);

    alert(error.message);

    box.innerHTML = error.message;

}

}

/* =========================
   Start Profile
========================= */
/* =========================
   Load Badge
========================= */

async function loadUserBadge(uid){

    try{

        const doc = await db
        .collection("users")
        .doc(uid)
        .get();

        if(!doc.exists) return;

        const badge =
        document.getElementById("levelBadge");

        if(badge){

            badge.textContent =
            doc.data().badge || "🏅 Beginner";

        }

    }

    catch(error){

        console.error(error);

    }

}
/* =========================
   Start Profile
========================= */

initProfile();
