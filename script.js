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




// Start button opens quiz popup
// startBtn.onclick = () => {
//   popupInfo.classList.add('active');
//   main.classList.add('active');
// };


// startBtn.addEventListener("click", () => {
//   const courseDropdown = document.getElementById("course-select");
//   selectedCourse = courseDropdown.value;

//   if (!selectedCourse) {
//     alert("Please select a course to begin the quiz.");
//     return;
//   }

//   questions = getRandomQuestionsFromCourse(selectedCourse, 10);

//   if (questions.length === 0) {
//     alert("No questions found for selected course.");
//     return;
//   }

//   document.getElementById("home-section").style.display = "none";
//   quizSection.style.display = "block";

//   questionIndex = 0;
//   userScore = 0;
//   totalQuestionEls.forEach(el => el.textContent = questions.length);
//   showQuestion(questionIndex);
//   updateProgressBar(questionIndex);
// });


 // JavaScript code for handling the Start Quiz button click
    document.getElementById('startQuizBtn').addEventListener('click', function () {
      const courseSelected = document.getElementById('courseSelect').value;
      
      if (!courseSelected) {
        // Show a pop-up alert if no course is selected
        alert('Please select a course before starting the quiz.');
        
        // Ensure the home page and "Start Quiz" button are visible again
        document.getElementById('homePage').style.display = 'block';
        document.getElementById('startQuizBtn').style.display = 'block';  // Ensure button is visible
        
        // Hide quiz section to avoid confusion
        document.getElementById('quizSection').style.display = 'none';
      } else {
        // Proceed with starting the quiz if a course is selected
        document.getElementById('homePage').style.display = 'none';
        document.getElementById('startQuizBtn').style.display = 'none';  // Hide start button after quiz begins
        document.getElementById('quizSection').style.display = 'block';  // Show the quiz section
      }
    });




// Exit button closes quiz popup
exitBtn.onclick = () => {
  popupInfo.classList.remove('active');
  main.classList.remove('active');
};

// Continue button starts the quiz
// continueBtn.onclick = () => {
//   popupInfo.classList.remove("active");
//   main.classList.add("active");
//   quizBox.classList.add("active");

//   // Clone and shuffle questions safely
//   const shuffled = [...questions].sort(() => Math.random() - 0.5).slice(0, 5);
//   questions = shuffled;

//   // Reset counters
//   questionCount = 0;
//   questionNumb = 1;
//   userScore = 0;

//   // Safety: Check if question[0] exists
//   if (!questions[0]) {
//     alert("No questions loaded. Please check your questions.js file.");
//     return;
//   }

//   // Update UI
//   document.querySelector(".total-questions").textContent = questions.length;
//   document.querySelector(".current-score").textContent = userScore;

//   showQuestions(questionCount);
//   questionCounter(questionNumb);
//   headerScore();
// };
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

  // ❗ These must come AFTER setting the questions array
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
  quizSection.classList.remove('active');
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

  // Update current and total question number in UI
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


document.addEventListener("DOMContentLoaded", () => {
  const loginLink = document.getElementById("login-link");
  const registerLink = document.getElementById("register-link");
  const profileContainer = document.getElementById("profile-container");
  const profilePic = document.getElementById("profile-pic");

  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  if (user && user.email) {
    // Hide login and register links
    if (loginLink) loginLink.style.display = "none";
    if (registerLink) registerLink.style.display = "none";

    // Show profile image
    profileContainer.style.display = "flex";
    profilePic.src = user.photoURL || "images/default-avatar.png";
  } else {
    profileContainer.style.display = "none";
    if (loginLink) loginLink.style.display = "inline";
    if (registerLink) registerLink.style.display = "inline";
  }
});


