/* =====================================
   File : profile.js
===================================== */

/* =========================
   Load Header & Footer
========================= */

async function initProfile() {

    await loadHeader();

    await loadFooter();

}

/* =========================
   Auth State
========================= */

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

    }

    catch (error) {

        console.error(error);

    }

}

/* =========================
   Start
========================= */

initProfile();
