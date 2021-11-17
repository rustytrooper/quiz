const option1 = document.querySelector('.option1'),
      option2 = document.querySelector('.option2'),
      option3 = document.querySelector('.option3'),
      option4 = document.querySelector('.option4');

const optionElements = document.querySelectorAll('.option');

const question = document.getElementById('question');

const numberOfQuestion = document.getElementById('number-of-question'),
      numberOfAllQuestions = document.getElementById('number-of-all-questions');

let indexOfQuestion,
    indexOfPage=0;

const answersTracker = document.getElementById('answers-tracker');

const btnNext = document.getElementById('btn-next');

let score=0;

const correctAnswer = document.getElementById('correct-answer'),
      numberOfAllQuestions2 = document.getElementById('number-of-all-questions-2'),
      btnTryAgain = document.getElementById('btn-try-again');

const questions = [
    {
        question: 'Сколько в метре сантиметров?',
        options: [
             '100',
             '980',
             '234',
             'в метре бывают сантиметры?',
        ],
        rightAnswer: 0
    },
    {
        question: 'Люк, я твой...',
        options: [
            'кузнец',
            'на дуде игрец',
            'ларец',
            'отец',
        ],
        rightAnswer: 3
    },
    {
        question: 'Зачем они достали пушку?',
        options: [
            'Потому что могут',
            'А! Они будут стрелять!',
            'А почему нет?',
            'Не смотрел, не шарю',
        ],
        rightAnswer: 1
    },
    {
        question: 'Кто дошел до конца марафона?',
        options: [
            'не я',
            'тоже не я, но в другом окошке',
            'я',
            'что происходит',
        ],
        rightAnswer:2
    }
];

numberOfAllQuestions.innerHTML=questions.length;

const load = () =>{
    question.innerHTML=questions[indexOfQuestion].question;

    option1.innerHTML=questions[indexOfQuestion].options[0];
    option2.innerHTML=questions[indexOfQuestion].options[1];
    option3.innerHTML=questions[indexOfQuestion].options[2];
    option4.innerHTML=questions[indexOfQuestion].options[3];

    numberOfQuestion.innerHTML = indexOfPage + 1;
    indexOfPage++;
};

let complitedAnswers = [];

const randomQuestion = () =>{
    let randomNumber = Math.floor(Math.random() * questions.length);
    let hitDublicate = false;

    if (indexOfPage==questions.length){
        quizOver();
        console.log('конец игры');
    } else {
        if (complitedAnswers>0){
            complitedAnswers.forEach(item=>{
            if (item==randomNumber){
                hitDublicate=true;
            }
        });
        if (hitDublicate){
            randomQuestion();
        }else{
            indexOfQuestion=randomNumber;
            load(); 
        }
        }
    if (complitedAnswers.length==0){
            indexOfQuestion=randomNumber;
            load();
    }
}
    complitedAnswers.push(indexOfQuestion);
};

const checkAnswer = el => {
   if(el.target.dataset.id==questions[indexOfQuestion].rightAnswer){
    el.target.classList.add('correct');
    updateAnswerTracker('correct');
    score++;
   } else {
    el.target.classList.add('wrong');
    updateAnswerTracker('wrong');
   }
   disabledOptions();
}

for (option of optionElements){
    option.addEventListener('click', e => checkAnswer(e));
}

const disabledOptions = () =>{
    optionElements.forEach(item =>{
        item.classList.add('disabled');
        if (item.dataset.id == questions[indexOfQuestion].rightAnswer){
            item.classList.add('correct');
        }
    })
}

const enableOptions = () =>{
    optionElements.forEach(item =>{
        item.classList.remove('disabled', 'correct', 'wrong');
    })
}

const answerTracker = () => {
    questions.forEach(() =>{
        const div = document.createElement('div');
        answersTracker.appendChild(div);
    })
}

updateAnswerTracker = status =>{
    answersTracker.children[indexOfPage-1].classList.add(`${status}`);
}

const validate =() =>{
    if (!optionElements[0].classList.contains('disabled')){
        alert('Выберите правильный вариант ответа');
    }else{
        randomQuestion();
        enableOptions();
    }
}

const quizOver= () =>{
    document.querySelector('.quiz-over-modal').classList.add('active');
    correctAnswer.innerHTML=score;
    numberOfAllQuestions2.innerHTML=questions.length;
};

const tryAgain = () =>{
    window.location.reload();
};

btnTryAgain.addEventListener('click', tryAgain);

btnNext.addEventListener('click', () =>{
    validate();
})

    window.addEventListener('load',() => {
    randomQuestion();
    answerTracker();
    })