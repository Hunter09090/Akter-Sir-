/* =====================================
   Firebase / Auth / Leaderboard
   Quiz V2 — stable release
===================================== */

const provider = new firebase.auth.GoogleAuthProvider();
const USERS = "users";
const QUESTIONS = "questions";
const LEADERBOARD = "leaderboard";
let currentUser = null;

async function login(){
    try{
        const result = await auth.signInWithPopup(provider);
        currentUser = result.user;
        await saveUser(currentUser);
        updateUserUI(currentUser);
        await loadTopThreeUI();
    }catch(error){
        console.error("Login Error:", error);
        alert("Login failed. Please try again.");
    }
}

async function logout(){
    try{
        await auth.signOut();
        currentUser = null;
        updateUserUI(null);
        await loadTopThreeUI();
    }catch(error){
        console.error("Logout Error:", error);
    }
}

auth.onAuthStateChanged(async user=>{
    currentUser = user;
    if(user) await saveUser(user);
    if(typeof updateUserUI === "function") updateUserUI(user);
});

async function saveUser(user){
    if(!user) return;
    try{
        const userRef = db.collection(USERS).doc(user.uid);
        const snap = await userRef.get();
        const old = snap.exists ? snap.data() : {};
        await userRef.set({
            uid:user.uid,
            name:user.displayName || "Guest",
            email:user.email || "",
            photo:user.photoURL || "",
            updatedAt:firebase.firestore.FieldValue.serverTimestamp(),
            badge:old.badge || "🏅 Beginner",
            highestScore:Number(old.highestScore || 0)
        },{merge:true});
    }catch(error){
        console.error("Save User Error:",error);
    }
}

async function saveLeaderboard(data){
    if(!data || !Number.isFinite(Number(data.score))) return;
    try{
        await db.collection(LEADERBOARD).add({
            uid:currentUser?.uid || "guest",
            name:currentUser?.displayName || "Guest",
            score:Number(data.score),
            correct:Number(data.correct || 0),
            wrong:Number(data.wrong || 0),
            skipped:Number(data.skipped || 0),
            time:Number(data.time || 0),
            category:data.category || selectedCategory || "General",
            createdAt:firebase.firestore.FieldValue.serverTimestamp()
        });
    }catch(error){
        console.error("Leaderboard Error:",error);
    }
}

async function loadTopThree(){
    try{
        const snapshot = await db.collection(LEADERBOARD)
            .orderBy("score","desc").limit(3).get();
        return snapshot.docs.map(doc=>({id:doc.id,...doc.data()}));
    }catch(error){
        console.error("Load Top Three Error:",error);
        return [];
    }
}

async function loadTopThreeUI(){
    const box=document.getElementById("leaderboardList");
    if(!box) return;
    box.innerHTML='<p class="leader-loading">Loading leaderboard…</p>';
    const players=await loadTopThree();
    if(!players.length){
        box.innerHTML='<p class="leader-empty">🏆 No scores yet. Be the first!</p>';
        return;
    }
    const medals=["🥇","🥈","🥉"];
    box.innerHTML=players.map((player,index)=>`
        <div class="leader-item">
            <span class="leader-rank">${medals[index] || `#${index+1}`}</span>
            <span class="leader-name">${escapeHTML(player.name || "Guest")}</span>
            <span class="leader-score">${Number(player.score || 0)}</span>
        </div>
    `).join("");
}

function escapeHTML(value){
    return String(value).replace(/[&<>'"]/g,char=>({
        '&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'
    }[char]));
}
