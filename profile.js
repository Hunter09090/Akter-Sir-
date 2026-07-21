/* =====================================
   File : profile.js
===================================== */

/* =========================
   Load Header & Footer
========================= */

async function initProfile() {

    async function initProfile() {

    await loadHeader();

    await loadFooter();

    if (typeof bindHeaderEvents === "function") {

        bindHeaderEvents();

    }

}

/* =========================
   Auth State
========================= */

auth.onAuthStateChanged(async (user) => {

    if (!user) {

        location.href = "index.html";

        return;

    }
    updateUserUI(user);
    document.getElementById("profilePhoto").src =
        user.photoURL || "https://via.placeholder.com/100";

    document.getElementById("profileName").textContent =
        user.displayName || "Guest";

    document.getElementById("profileEmail").textContent =
        user.email || "-";

    loadProfileStats(user.uid);

});

/* =========================
   Profile Stats
========================= */

async function loadProfileStats(uid) {

    try {

        const snapshot = await db
            .collection("leaderboard")
            .where("uid", "==", uid)
            .get();

        let highest = 0;

        let total = snapshot.size;

        snapshot.forEach(doc => {

            const item = doc.data();

            if (item.score > highest) {

                highest = item.score;

            }

        });

        document.getElementById("highestScore").textContent =
            highest;

        document.getElementById("quizPlayed").textContent =
            total;

       await loadRecentQuiz(uid);
       
    }

    catch (error) {

        console.error(error);

    }

}

/* =========================
   Start
========================= */
/* =========================
   Recent 5 Quiz
========================= */

async function loadRecentQuiz(uid) {

    const box =
        document.getElementById("recentQuizList");

    if (!box) return;

    try {

        const snapshot = await db
            .collection("leaderboard")
            .where("uid","==",uid)
            .orderBy("createdAt","desc")
            .limit(5)
            .get();

        if(snapshot.empty){

            box.innerHTML =
                "<p>No Quiz Played.</p>";

            return;

        }

        box.innerHTML="";

        snapshot.forEach(doc=>{

            const item=doc.data();

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

                <span class="recent-time">

                    ${item.time}s

                </span>

            </div>

            `;

        });

    }

    catch(error){

        console.error(error);

    }

}
initProfile();
