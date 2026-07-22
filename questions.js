/* =====================================
   File : questions.js
   Final Professional Version
   Part : 1
===================================== */

/* =====================================
   Question Storage
===================================== */

let allQuestions = [];

/* =====================================
   Load Questions
===================================== */

async function loadQuestions(category){

    try{

        const snapshot = await db

        .collection(QUESTIONS)

        .where("category","==",category)

        .get();

        allQuestions = snapshot.docs.map(doc=>({

            id:doc.id,

            ...doc.data()

        }));

        return shuffleArray([...allQuestions]);

    }

    catch(error){

        console.error(

            "Question Load Error :",

            error

        );

        return [];

    }

}

/* =====================================
   Shuffle Array
===================================== */

function shuffleArray(array){

    for(

        let i=array.length-1;

        i>0;

        i--

    ){

        const j=

        Math.floor(

            Math.random()*(i+1)

        );

        [array[i],array[j]]

        =

        [array[j],array[i]];

    }

    return array;

}
/* =====================================
   File : questions.js
   Final Professional Version
   Part : 2
===================================== */

/* =====================================
   Get Question By Index
===================================== */

function getQuestion(index){

    if(

        index < 0 ||

        index >= allQuestions.length

    ){

        return null;

    }

    return allQuestions[index];

}

/* =====================================
   Get Total Questions
===================================== */

function getTotalQuestions(){

    return allQuestions.length;

}

/* =====================================
   Check Empty
===================================== */

function hasQuestions(){

    return allQuestions.length > 0;

}

/* =====================================
   Get All Questions
===================================== */

function getAllQuestions(){

    return [...allQuestions];

}

/* =====================================
   Reset Questions
===================================== */

function resetQuestions(){

    allQuestions = [];

}

/* =====================================
   Random Number Helper
===================================== */

function randomNumber(min,max){

    return Math.floor(

        Math.random() *

        (max-min+1)

    ) + min;

}
