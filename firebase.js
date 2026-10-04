/* =====================================
   Firebase / Auth / Leaderboard
   Quiz V4 — stable + global/weekly ranking
===================================== */
const provider=new firebase.auth.GoogleAuthProvider(),USERS="users",QUESTIONS="questions",LEADERBOARD="leaderboard";let currentUser=null;
function leaderboardWeekKey(d=new Date()){const x=new Date(d);x.setHours(0,0,0,0);x.setDate(x.getDate()-((x.getDay()+6)%7));return x.toISOString().slice(0,10)}
async function login(){try{const result=await auth.signInWithPopup(provider);currentUser=result.user;await saveUser(currentUser);updateUserUI(currentUser);await loadTopThreeUI()}catch(error){console.error("Login Error:",error);alert("Login failed. Please try again.")}}
async function logout(){try{await auth.signOut();currentUser=null;updateUserUI(null);await loadTopThreeUI()}catch(error){console.error("Logout Error:",error)}}
auth.onAuthStateChanged(async user=>{currentUser=user;if(user)await saveUser(user);if(typeof updateUserUI==="function")updateUserUI(user)})
async function saveUser(user){if(!user)return;try{const r=db.collection(USERS).doc(user.uid),s=await r.get(),old=s.exists?s.data():{};await r.set({uid:user.uid,name:user.displayName||"Guest",email:user.email||"",photo:user.photoURL||"",updatedAt:firebase.firestore.FieldValue.serverTimestamp(),badge:old.badge||"🏅 Beginner",highestScore:Number(old.highestScore||0)},{merge:true})}catch(error){console.error("Save User Error:",error)}}
async function saveLeaderboard(data){if(!data||!Number.isFinite(Number(data.score)))return;try{await db.collection(LEADERBOARD).add({uid:currentUser?.uid||"guest",name:currentUser?.displayName||"Guest",score:Number(data.score),correct:Number(data.correct||0),wrong:Number(data.wrong||0),skipped:Number(data.skipped||0),time:Number(data.time||0),category:data.category||selectedCategory||"General",weekKey:leaderboardWeekKey(),createdAt:firebase.firestore.FieldValue.serverTimestamp()})}catch(error){console.error("Leaderboard Error:",error)}}
async function loadTopThree(){try{const s=await db.collection(LEADERBOARD).orderBy("score","desc").limit(3).get();return s.docs.map(d=>({id:d.id,...d.data()}))}catch(error){console.error("Load Top Three Error:",error);return[]}}
async function loadTopThreeUI(){const box=document.getElementById("leaderboardList");if(!box)return;box.innerHTML='<p class="leader-loading">Loading leaderboard…</p>';const players=await loadTopThree();if(!players.length){box.innerHTML='<p class="leader-empty">🏆 No scores yet. Be the first!</p>';return}const medals=["🥇","🥈","🥉"];box.innerHTML=players.map((p,i)=>`<div class="leader-item"><span class="leader-rank">${medals[i]||`#${i+1}`}</span><span class="leader-name">${escapeHTML(p.name||"Guest")}</span><span class="leader-score">${Number(p.score||0)}</span></div>`).join("")}
function escapeHTML(v){return String(v).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}
window.quizGlobalRanking={
 async topGlobal(limit=10){try{const s=await db.collection(LEADERBOARD).orderBy('score','desc').limit(limit).get();return s.docs.map(d=>d.data())}catch(e){console.error('Global ranking:',e);return[]}},
 async topWeekly(limit=10){try{const s=await db.collection(LEADERBOARD).where('weekKey','==',leaderboardWeekKey()).orderBy('score','desc').limit(limit).get();return s.docs.map(d=>d.data())}catch(e){console.error('Weekly ranking:',e);return[]}},
 async myGlobalRank(){if(!currentUser)return null;try{const s=await db.collection(LEADERBOARD).orderBy('score','desc').get();let rank=0,seen=new Set();for(const d of s.docs){const x=d.data();if(!seen.has(x.uid)){seen.add(x.uid);rank++;if(x.uid===currentUser.uid)return rank}}return null}catch(e){console.error('Global rank:',e);return null}}
};
