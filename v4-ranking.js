/* Quiz V4.1 — live XP, levels, achievements and weekly progression */
(function(){
  const KEY='quizV4Profile';
  const defaults={xp:0,level:1,totalQuizzes:0,weeklyScore:0,weeklyPlays:0,achievements:[],lastWeek:''};
  function load(){try{return {...defaults,...JSON.parse(localStorage.getItem(KEY)||'{}')}}catch{return {...defaults}}}
  function save(p){localStorage.setItem(KEY,JSON.stringify(p));return p}
  function weekKey(d=new Date()){const x=new Date(d);x.setHours(0,0,0,0);x.setDate(x.getDate()-((x.getDay()+6)%7));return `${x.getFullYear()}-${String(x.getMonth()+1).padStart(2,'0')}-${String(x.getDate()).padStart(2,'0')}`}
  function normalize(p){const w=weekKey();if(p.lastWeek!==w){p.weeklyScore=0;p.weeklyPlays=0;p.lastWeek=w}p.totalQuizzes=Number(p.totalQuizzes||0);p.xp=Number(p.xp||0);p.level=levelFor(p.xp);return p}
  function levelFor(xp){return Math.floor(Math.max(0,Number(xp)||0)/100)+1}
  const defs=[
    ['first_quiz','🎓 First Step','Complete your first quiz'],['five_quizzes','🔥 Quiz Regular','Complete 5 quizzes'],['ten_quizzes','⚡ Quiz Machine','Complete 10 quizzes'],['perfect','💯 Perfect Score','Get a perfect score'],['high_score','🏆 High Scorer','Score 90 or more'],['streak3','🔥 3-Day Streak','Maintain a 3-day streak'],['xp500','⭐ XP Hunter','Earn 500 XP'],['level5','🚀 Level 5','Reach level 5']
  ];
  window.quizV4={
    definitions:defs,
    profile(){const p=normalize(load());save(p);return p},
    record(r){
      let p=normalize(load());
      const total=Number(r.total||0),score=Number(r.score||0),correct=Number(r.correct||0);
      const gained=Math.max(10,Math.round(score*2)+correct*5);
      const oldLevel=p.level;
      p.xp+=gained;p.totalQuizzes++;p.weeklyScore+=score;p.weeklyPlays++;p.level=levelFor(p.xp);
      const unlocked=[];
      const unlock=(id,ok)=>{if(ok&&!p.achievements.includes(id)){p.achievements.push(id);unlocked.push(id)}};
      unlock('first_quiz',p.totalQuizzes>=1);unlock('five_quizzes',p.totalQuizzes>=5);unlock('ten_quizzes',p.totalQuizzes>=10);unlock('perfect',total>0&&correct===total);unlock('high_score',total>0&&(correct/total)*100>=90);unlock('streak3',(window.quizAnalytics?.summary()?.streak||0)>=3);unlock('xp500',p.xp>=500);unlock('level5',p.level>=5);
      save(p);
      return {...p,gained,unlocked,levelUp:p.level>oldLevel,oldLevel};
    },
    reset(){save({...defaults,lastWeek:weekKey()});return this.profile()}
  };
})();
