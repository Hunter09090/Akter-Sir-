/* Quiz V3 — dashboard + history + streak UI */
(function(){
  const esc=s=>String(s??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  function render(){
    if(!window.quizAnalytics)return;
    const s=quizAnalytics.summary(),set=(id,v)=>{const e=document.getElementById(id);if(e)e.textContent=v};
    set('v3Total',s.total);set('v3Best',s.best);set('v3Average',s.average);set('v3Streak',`${s.streak} day${s.streak===1?'':'s'}`);
    const cp=document.getElementById('categoryPerformance'),hist=document.getElementById('quizHistoryList');
    if(cp){const rows=Object.entries(s.cats).sort((a,b)=>b[1].plays-a[1].plays).slice(0,8);cp.innerHTML=rows.length?rows.map(([name,x])=>`<div class="v3-row"><div><b>${esc(name)}</b><small>${x.plays} quiz${x.plays===1?'':'zes'} · ${x.correct} correct</small></div><strong>${x.score}</strong></div>`).join(''):'<p>এখনো কোনো quiz history নেই।</p>'}
    if(hist){const rows=quizAnalytics.all().slice(-6).reverse();hist.innerHTML=rows.length?rows.map(x=>`<div class="v3-row"><div><b>${esc(x.category||'General')}</b><small>${new Date(x.at).toLocaleDateString('bn-BD')} · ${x.percentage||0}%</small></div><strong>${Number(x.score||0)}</strong></div>`).join(''):'<p>আপনার completed quiz এখানে দেখা যাবে।</p>'}
  }
  function wire(){
    document.getElementById('clearHistoryBtn')?.addEventListener('click',()=>{if(confirm('Quiz history মুছে ফেলবেন?')){localStorage.removeItem('quizHistoryV3');render()}});
    const original=window.finishQuiz;
    if(typeof original==='function'&&!original.__v3Wrapped){
      const wrapped=async function(){
        const before=window.quizFinished;await original.apply(this,arguments);
        if(!before&&window.quizFinished&&window.quizAnalytics){
          quizAnalytics.record({category:window.selectedCategory||'General',score:window.finalScore||0,correct:window.finalCorrect||0,wrong:window.finalWrong||0,skipped:Math.max(0,(window.quizQuestions?.length||0)-(window.finalCorrect||0)-(window.finalWrong||0)),percentage:window.quizQuestions?.length?Math.round((window.finalScore||0)/window.quizQuestions.length*100):0});
          render();
        }
      };wrapped.__v3Wrapped=true;window.finishQuiz=wrapped;
    }
    render();
  }
  document.addEventListener('DOMContentLoaded',()=>setTimeout(wire,100));
  window.addEventListener('load',render);
})();
