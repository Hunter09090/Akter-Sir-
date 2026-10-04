/* Quiz V3 — local analytics engine */
(function(){
  const KEY='quizHistoryV3';
  const get=()=>{try{return JSON.parse(localStorage.getItem(KEY)||'[]')}catch{return[]}};
  const save=a=>localStorage.setItem(KEY,JSON.stringify(a.slice(-100)));
  window.quizAnalytics={
    record(result){const a=get();a.push({...result,at:result.at||Date.now()});save(a)},
    all:get,
    summary(){
      const a=get(),total=a.length;
      const scores=a.reduce((s,x)=>s+Number(x.score||0),0),correct=a.reduce((s,x)=>s+Number(x.correct||0),0),wrong=a.reduce((s,x)=>s+Number(x.wrong||0),0),skipped=a.reduce((s,x)=>s+Number(x.skipped||0),0),best=a.reduce((m,x)=>Math.max(m,Number(x.score||0)),0);
      const cats={};a.forEach(x=>{const c=x.category||'General';cats[c]??={plays:0,score:0,correct:0};cats[c].plays++;cats[c].score+=Number(x.score||0);cats[c].correct+=Number(x.correct||0)});
      const days=new Set(a.map(x=>new Date(x.at).toDateString()));let streak=0,d=new Date();while(days.has(d.toDateString())){streak++;d.setDate(d.getDate()-1)}
      return{total,average:total?Math.round(scores/total*10)/10:0,correct,wrong,skipped,best,streak,cats};
    }
  };
})();
