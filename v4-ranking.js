/* Quiz V4 — local-first XP, levels, achievements and weekly ranking */
(function(){
  const KEY='quizV4Profile';
  const defaultProfile={xp:0,level:1,weeklyScore:0,weeklyPlays:0,achievements:[],lastWeek:''};
  function load(){try{return {...defaultProfile,...JSON.parse(localStorage.getItem(KEY)||'{}')}}catch{return {...defaultProfile}}}
  function save(p){localStorage.setItem(KEY,JSON.stringify(p));return p}
  function weekKey(d=new Date()){const x=new Date(d);x.setHours(0,0,0,0);x.setDate(x.getDate()-((x.getDay()+6)%7));return x.toISOString().slice(0,10)}
  function normalize(p){const w=weekKey();if(p.lastWeek!==w){p.weeklyScore=0;p.weeklyPlays=0;p.lastWeek=w}return p}
  function levelFor(xp){return Math.max(1,Math.floor(Math.sqrt(Math.max(0,xp)/100))+1)}
  const defs=[
    ['first_quiz','🎓 First Step','Complete your first quiz'],['five_quizzes','🔥 Quiz Regular','Complete 5 quizzes'],['ten_quizzes','⚡ Quiz Machine','Complete 10 quizzes'],['perfect','💯 Perfect Score','Get a perfect score'],['high_score','🏆 High Scorer','Score 90 or more'],['streak3','🔥 3-Day Streak','Maintain a 3-day streak'],['xp500','⭐ XP Hunter','Earn 500 XP']
  ];
  window.quizV4={
    definitions:defs,
    profile(){const p=normalize(load());save(p);return p},
    record(r){let p=normalize(load());const total=Number(r.total||0),score=Number(r.score||0),correct=Number(r.correct||0);const gained=Math.max(10,Math.round(score*2)+correct*5);p.xp+=gained;p.level=levelFor(p.xp);p.weeklyScore+=score;p.weeklyPlays++;
      const count=(window.quizAnalytics?.all()||[]).length+1;
      const unlocked=[];const unlock=(id,ok)=>{if(ok&&!p.achievements.includes(id)){p.achievements.push(id);unlocked.push(id)}};
      unlock('first_quiz',count>=1);unlock('five_quizzes',count>=5);unlock('ten_quizzes',count>=10);unlock('perfect',total>0&&correct===total);unlock('high_score',score>=90);unlock('streak3',(window.quizAnalytics?.summary()?.streak||0)>=3);unlock('xp500',p.xp>=500);save(p);return{...p,gained,unlocked};
    },
    reset(){save({...defaultProfile,lastWeek:weekKey()});return this.profile()}
  };
})();
