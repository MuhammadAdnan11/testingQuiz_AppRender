const startBtn = document.querySelector('.start-btn');
const popupInfo = document.querySelector('.popup-info');
const exitBtn = document.querySelector('.exit-btn');
const main = document.querySelector('.main');
const continueBtn = document.querySelector('.continue-btn');
const quizSection = document.querySelector('.quiz-section');
const quizBox = document.querySelector('.quiz-box');
const resultBox = document.querySelector('.result-box');
const tryAgainBtn = document.querySelector('.tryAgain-btn');
const goHomeBtn = document.querySelector('.goHome-btn');

let questionCount = 0;
let questionNumb = 1;
let userScore = 0;

const nextBtn = document.querySelector('.next-btn');
const optionsList = document.querySelector('.option-list');

function getRandomQuestionsFromCourse(course, limit = 10) {
  const filtered = questionBank.filter(q => q.course === course);
  const shuffled = [...filtered].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, limit);
}

document.getElementById('startQuizBtn').addEventListener('click', function () {
  const courseSelected = document.getElementById('courseSelect').value;

  if (!courseSelected) {
    alert('Please select a course before starting the quiz.');
    document.getElementById('homePage').style.display = 'block';
    document.getElementById('startQuizBtn').style.display = 'block';
    document.getElementById('quizSection').style.display = 'none';
  } else {
    localStorage.setItem("selectedSubject", courseSelected); // Save subject for report

    document.getElementById('homePage').style.display = 'none';
    document.getElementById('startQuizBtn').style.display = 'none';
    document.getElementById('quizSection').style.display = 'block';

    questions = getRandomQuestionsFromCourse(courseSelected, 10);
    questionCount = 0;
    questionNumb = 1;
    userScore = 0;

    if (!questions.length) {
      alert("No questions found for selected course.");
      return;
    }

    showQuestions(questionCount);
    questionCounter(questionNumb);
    headerScore();
  }
});

exitBtn.onclick = () => {
  popupInfo.classList.remove('active');
  main.classList.remove('active');
};

continueBtn.onclick = () => {
  popupInfo.classList.remove("active");
  main.classList.add("active");
  quizBox.classList.add("active");

  const shuffled = [...questions].sort(() => Math.random() - 0.5).slice(0, 5);
  questions = shuffled;

  questionCount = 0;
  questionNumb = 1;
  userScore = 0;

  if (!questions[0]) {
    alert("No questions loaded. Please check your questions.js file.");
    return;
  }

  document.querySelector(".total-questions").textContent = questions.length;
  document.querySelector(".current-score").textContent = userScore;

  showQuestions(questionCount);
  questionCounter(questionNumb);
  headerScore();
};

tryAgainBtn.onclick = () => {
  quizBox.classList.add('active');
  resultBox.classList.remove('active');
  nextBtn.classList.remove('active');
  resetGame();
  showQuestions(questionCount);
  questionCounter(questionNumb);
  headerScore();
};

goHomeBtn.onclick = () => {
  quizSection.classList.remove('active');
  resultBox.classList.remove('active');
  nextBtn.classList.remove('active');
  resetGame();
  showQuestions(questionCount);
  questionCounter(questionNumb);
};

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

function resetGame() {
  questionCount = 0;
  questionNumb = 1;
  userScore = 0;
}

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

function questionCounter(index) {
  const questionTotal = document.querySelector('.question-total');
  questionTotal.textContent = `${index} of ${questions.length} Questions`;
}

function headerScore() {
  const headerScoreText = document.querySelector(".header-score");
  headerScoreText.textContent = `Score: ${userScore} / ${questions.length}`;
}

function submitScore(email, subject, score) {
  fetch('/submit-score', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, subject, score })
  })
  .then(res => {
    if (!res.ok) throw new Error('Failed to submit score');
    return res.json();
  })
  .then(data => {
    console.log('Score submitted:', data.message);
  })
  .catch(err => {
    console.error('Error submitting score:', err);
  });
}

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

  // Submit quiz score
  const userEmail = localStorage.getItem("userEmail");
  const selectedSubject = localStorage.getItem("selectedSubject") || "General";

  if (userEmail) {
    submitScore(userEmail, selectedSubject, userScore);
  } else {
    console.warn("User not logged in - score not submitted");
  }
}
