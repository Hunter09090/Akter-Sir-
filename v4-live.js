/* Quiz V4.1 — live progression bridge */
(function(){
  function award(result){
    if(!window.quizV4?.record)return null;
    const reward=window.quizV4.record({total:Number(result.total||0),score:Number(result.score||0),correct:Number(result.correct||0)});
    window.dispatchEvent(new CustomEvent('quiz:v4-awarded',{detail:reward}));
    return reward;
  }
  window.awardQuizV4=award;
})();
