/* Quiz V4 — global rank + weekly champion UI */
(function(){
 const esc=s=>String(s??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
 async function renderRank(){if(!window.quizGlobalRanking)return;const weekly=document.getElementById('v4WeeklyRank');if(weekly){const top=await quizGlobalRanking.topWeekly(10);if(top.length){const me=currentUser?.uid;const idx=top.findIndex(x=>x.uid===me);weekly.textContent=me&&idx>=0?`#${idx+1} · ${top[idx].score}`:`🥇 ${top[0].name||'Champion'} · ${top[0].score}`; }else weekly.textContent='No scores yet'}const global=document.getElementById('v4GlobalList');if(global){const top=await quizGlobalRanking.topGlobal(10);global.innerHTML=top.length?top.map((x,i)=>`<div class="v3-row"><div><b>${['🥇','🥈','🥉'][i]||`#${i+1}`} ${esc(x.name||'Guest')}</b><small>${esc(x.category||'General')}</small></div><strong>${Number(x.score||0)}</strong></div>`).join(''):'<p>No global scores yet.</p>'}}
 document.addEventListener('DOMContentLoaded',()=>setTimeout(renderRank,500));window.addEventListener('quiz:completed',()=>setTimeout(renderRank,200));window.quizV4RenderRank=renderRank;
})();
