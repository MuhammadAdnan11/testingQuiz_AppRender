const popupInfo = document.querySelector('.popup-info');
const exitBtn = document.querySelector('.exit-btn');
const main = document.querySelector('.main');
const continueBtn = document.querySelector('.continue-btn');
// const quizSection = document.querySelector('.quiz-section'); // Currently unused, keep commented
const quizBox = document.querySelector('.quiz-box');
const resultBox = document.querySelector('.result-box');
const tryAgainBtn = document.querySelector('.tryAgain-btn');
const goHomeBtn = document.querySelector('.goHome-btn');

let questionCount = 0;
let questionNumb = 1;
let userScore = 0;  // Declare once here

const nextBtn = document.querySelector('.next-btn');
const optionsList = document.querySelector('.option-list');


function getRandomQuestionsFromCourse(course, limit = 10) {
  const filtered = questionBank.filter(q => q.course === course);
  const shuffled = [...filtered].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, limit);
}


// Handle Start Quiz button click
document.getElementById('startQuizBtn').addEventListener('click', function () {
  const courseSelected = document.getElementById('courseSelect').value;
  
  if (!courseSelected) {
    alert('Please select a course before starting the quiz.');
    document.getElementById('homePage').style.display = 'block';
    document.getElementById('startQuizBtn').style.display = 'block';
    document.getElementById('quizSection').style.display = 'none';
  } else {
    document.getElementById('homePage').style.display = 'none';
    document.getElementById('startQuizBtn').style.display = 'none';
    document.getElementById('quizSection').style.display = 'block';
  }
});


// Exit button closes quiz popup
exitBtn.onclick = () => {
  popupInfo.classList.remove('active');
  main.classList.remove('active');
};


// Continue button starts the quiz
continueBtn.onclick = () => {
  popupInfo.classList.remove("active");
  main.classList.add("active");
  quizBox.classList.add("active");

  // Clone and shuffle questions safely
  const shuffled = [...questions].sort(() => Math.random() - 0.5).slice(0, 5);
  questions = shuffled; // <-- This must be set BEFORE showQuestions

  // Reset counters
  questionCount = 0;
  questionNumb = 1;
  userScore = 0;

  if (!questions[0]) {
    alert("No questions loaded. Please check your questions.js file.");
    return;
  }

  // Update UI
  document.querySelector(".total-questions").textContent = questions.length;
  document.querySelector(".current-score").textContent = userScore;

  showQuestions(questionCount);
  questionCounter(questionNumb);
  headerScore();
};


// Try Again Button
tryAgainBtn.onclick = () => {
  quizBox.classList.add('active');
  resultBox.classList.remove('active');
  nextBtn.classList.remove('active');
  resetGame();
  showQuestions(questionCount);
  questionCounter(questionNumb);
  headerScore();
};

// Go Home button
goHomeBtn.onclick = () => {
  // quizSection may be undefined/commented, so safely check before removing class
  const quizSection = document.querySelector('.quiz-section');
  if (quizSection) quizSection.classList.remove('active');
  resultBox.classList.remove('active');
  nextBtn.classList.remove('active');
  resetGame();
  showQuestions(questionCount);
  questionCounter(questionNumb);
};


// Next Button
nextBtn.onclick = () => {
  if (questionCount < questions.length - 1) {
    questionCount++;
    questionNumb++;
    showQuestions(questionCount);
    questionCounter(questionNumb);
    nextBtn.classList.remove('active');
  } else {
    showResultBox();
  }
};


// Reset Game
function resetGame() {
  questionCount = 0;
  questionNumb = 1;
  userScore = 0;
}


// Show Question
function showQuestions(index) {
  if (!questions || !questions[index]) {
    console.warn("No question found at index:", index);
    return;
  }

  const questionText = document.querySelector('.question-text');
  questionText.textContent = `${questions[index].numb}. ${questions[index].question}`;

  let optionTag = '';
  questions[index].options.forEach(option => {
    optionTag += `<div class="option"><span>${option}</span></div>`;
  });

  optionsList.innerHTML = optionTag;
  const option = document.querySelectorAll('.option');
  option.forEach(opt => {
    opt.setAttribute('onclick', 'optionSelected(this)');
  });

  document.querySelector(".current-question").textContent = index + 1;
  document.querySelector(".total-questions").textContent = questions.length;
}


// Option selection logic
function optionSelected(answer) {
  const userAnswer = answer.textContent;
  const correctAnswer = questions[questionCount].answer;
  const allOptions = optionsList.children.length;

  if (userAnswer === correctAnswer) {
    answer.classList.add('correct');
    userScore++;
    document.querySelector(".current-score").textContent = userScore;
    headerScore();
  } else {
    answer.classList.add('incorrect');
    for (let i = 0; i < allOptions; i++) {
      if (optionsList.children[i].textContent === correctAnswer) {
        optionsList.children[i].setAttribute('class', 'option correct');
      }
    }
  }

  for (let i = 0; i < allOptions; i++) {
    optionsList.children[i].classList.add('disabled');
  }

  nextBtn.classList.add("active");
}


// Update question counter
function questionCounter(index) {
  const questionTotal = document.querySelector('.question-total');
  questionTotal.textContent = `${index} of ${questions.length} Questions`;
}


// Update score header
function headerScore() {
  const headerScoreText = document.querySelector(".header-score");
  headerScoreText.textContent = `Score: ${userScore} / ${questions.length}`;
}


// Show result
function showResultBox() {
  quizBox.classList.remove('active');
  resultBox.classList.add('active');

  const scoreText = document.querySelector('.score-text');
  scoreText.textContent = `Your Score: ${userScore} out of ${questions.length}`;

  const circularProgress = document.querySelector('.circular-progress');
  const progressValue = document.querySelector('.progress-value');
  let progressStartValue = -1;
  let progressEndValue = (userScore / questions.length) * 100;
  let speed = 20;

  let progress = setInterval(() => {
    progressStartValue++;
    circularProgress.style.background = `conic-gradient(#c40094 ${progressStartValue * 3.6}deg, rgba(255,255,255,.1) 0deg)`;
    progressValue.textContent = `${progressStartValue}%`;
    if (progressStartValue === progressEndValue) {
      clearInterval(progress);
    }
  }, speed);
}
