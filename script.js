// const startBtn = document.querySelector('.start-btn');
// const popupInfo = document.querySelector('.popup-info');
// const exitBtn = document.querySelector('.exit-btn');
// const main = document.querySelector('.main');
// const continueBtn = document.querySelector('.continue-btn');
// const quizSection = document.querySelector('.quiz-section');
// const quizBox = document.querySelector('.quiz-box');
// const resultBox = document.querySelector('.result-box');
// const tryAgainBtn = document.querySelector('.tryAgain-btn');
// const goHomeBtn = document.querySelector('.goHome-btn');

// let questionCount = 0;
// let questionNumb = 1;
// let userScore = 0;

// const nextBtn = document.querySelector('.next-btn');
// const optionsList = document.querySelector('.option-list');


// function getRandomQuestionsFromCourse(course, limit = 10) {
//   const filtered = questionBank.filter(q => q.course === course);
//   const shuffled = [...filtered].sort(() => Math.random() - 0.5);
//   return shuffled.slice(0, limit);
// }




// // Start button opens quiz popup
// // startBtn.onclick = () => {
// //   popupInfo.classList.add('active');
// //   main.classList.add('active');
// // };


// // startBtn.addEventListener("click", () => {
// //   const courseDropdown = document.getElementById("course-select");
// //   selectedCourse = courseDropdown.value;

// //   if (!selectedCourse) {
// //     alert("Please select a course to begin the quiz.");
// //     return;
// //   }

// //   questions = getRandomQuestionsFromCourse(selectedCourse, 10);

// //   if (questions.length === 0) {
// //     alert("No questions found for selected course.");
// //     return;
// //   }

// //   document.getElementById("home-section").style.display = "none";
// //   quizSection.style.display = "block";

// //   questionIndex = 0;
// //   userScore = 0;
// //   totalQuestionEls.forEach(el => el.textContent = questions.length);
// //   showQuestion(questionIndex);
// //   updateProgressBar(questionIndex);
// // });


//  // JavaScript code for handling the Start Quiz button click
//     document.getElementById('startQuizBtn').addEventListener('click', function () {
//       const courseSelected = document.getElementById('courseSelect').value;
      
//       if (!courseSelected) {
//         // Show a pop-up alert if no course is selected
//         alert('Please select a course before starting the quiz.');
        
//         // Ensure the home page and "Start Quiz" button are visible again
//         document.getElementById('homePage').style.display = 'block';
//         document.getElementById('startQuizBtn').style.display = 'block';  // Ensure button is visible
        
//         // Hide quiz section to avoid confusion
//         document.getElementById('quizSection').style.display = 'none';
//       } else {
//         // Proceed with starting the quiz if a course is selected
//         document.getElementById('homePage').style.display = 'none';
//         document.getElementById('startQuizBtn').style.display = 'none';  // Hide start button after quiz begins
//         document.getElementById('quizSection').style.display = 'block';  // Show the quiz section
//       }
//     });




// // Exit button closes quiz popup
// exitBtn.onclick = () => {
//   popupInfo.classList.remove('active');
//   main.classList.remove('active');
// };

// // Continue button starts the quiz
// // continueBtn.onclick = () => {
// //   popupInfo.classList.remove("active");
// //   main.classList.add("active");
// //   quizBox.classList.add("active");

// //   // Clone and shuffle questions safely
// //   const shuffled = [...questions].sort(() => Math.random() - 0.5).slice(0, 5);
// //   questions = shuffled;

// //   // Reset counters
// //   questionCount = 0;
// //   questionNumb = 1;
// //   userScore = 0;

// //   // Safety: Check if question[0] exists
// //   if (!questions[0]) {
// //     alert("No questions loaded. Please check your questions.js file.");
// //     return;
// //   }

// //   // Update UI
// //   document.querySelector(".total-questions").textContent = questions.length;
// //   document.querySelector(".current-score").textContent = userScore;

// //   showQuestions(questionCount);
// //   questionCounter(questionNumb);
// //   headerScore();
// // };
// // Continue button starts the quiz
// continueBtn.onclick = () => {
//   popupInfo.classList.remove("active");
//   main.classList.add("active");
//   quizBox.classList.add("active");

//   // Clone and shuffle questions safely
//   const shuffled = [...questions].sort(() => Math.random() - 0.5).slice(0, 5);
//   questions = shuffled; // <-- This must be set BEFORE showQuestions

//   // Reset counters
//   questionCount = 0;
//   questionNumb = 1;
//   userScore = 0;

//   if (!questions[0]) {
//     alert("No questions loaded. Please check your questions.js file.");
//     return;
//   }

//   // Update UI
//   document.querySelector(".total-questions").textContent = questions.length;
//   document.querySelector(".current-score").textContent = userScore;

//   // ❗ These must come AFTER setting the questions array
//   showQuestions(questionCount);
//   questionCounter(questionNumb);
//   headerScore();
// };


// // Try Again Button
// tryAgainBtn.onclick = () => {
//   quizBox.classList.add('active');
//   resultBox.classList.remove('active');
//   nextBtn.classList.remove('active');
//   resetGame();
//   showQuestions(questionCount);
//   questionCounter(questionNumb);
//   headerScore();
// };

// // Go Home button
// goHomeBtn.onclick = () => {
//   quizSection.classList.remove('active');
//   resultBox.classList.remove('active');
//   nextBtn.classList.remove('active');
//   resetGame();
//   showQuestions(questionCount);
//   questionCounter(questionNumb);
// };

// // Next Button
// nextBtn.onclick = () => {
//   if (questionCount < questions.length - 1) {
//     questionCount++;
//     questionNumb++;
//     showQuestions(questionCount);
//     questionCounter(questionNumb);
//     nextBtn.classList.remove('active');
//   } else {
//     showResultBox();
//   }
// };

// // Reset Game
// function resetGame() {
//   questionCount = 0;
//   questionNumb = 1;
//   userScore = 0;
// }

// // Show Question
// function showQuestions(index) {
//   if (!questions || !questions[index]) {
//     console.warn("No question found at index:", index);
//     return;
//   }

//   const questionText = document.querySelector('.question-text');
//   questionText.textContent = `${questions[index].numb}. ${questions[index].question}`;

//   let optionTag = '';
//   questions[index].options.forEach(option => {
//     optionTag += `<div class="option"><span>${option}</span></div>`;
//   });

//   optionsList.innerHTML = optionTag;
//   const option = document.querySelectorAll('.option');
//   option.forEach(opt => {
//     opt.setAttribute('onclick', 'optionSelected(this)');
//   });

//   // Update current and total question number in UI
//   document.querySelector(".current-question").textContent = index + 1;
//   document.querySelector(".total-questions").textContent = questions.length;
// }

// // Option selection logic
// function optionSelected(answer) {
//   const userAnswer = answer.textContent;
//   const correctAnswer = questions[questionCount].answer;
//   const allOptions = optionsList.children.length;

//   if (userAnswer === correctAnswer) {
//     answer.classList.add('correct');
//     userScore++;
//     document.querySelector(".current-score").textContent = userScore;
//     headerScore();
//   } else {
//     answer.classList.add('incorrect');
//     for (let i = 0; i < allOptions; i++) {
//       if (optionsList.children[i].textContent === correctAnswer) {
//         optionsList.children[i].setAttribute('class', 'option correct');
//       }
//     }
//   }

//   for (let i = 0; i < allOptions; i++) {
//     optionsList.children[i].classList.add('disabled');
//   }

//   nextBtn.classList.add("active");
// }

// // Update question counter
// function questionCounter(index) {
//   const questionTotal = document.querySelector('.question-total');
//   questionTotal.textContent = `${index} of ${questions.length} Questions`;
// }

// // Update score header
// function headerScore() {
//   const headerScoreText = document.querySelector(".header-score");
//   headerScoreText.textContent = `Score: ${userScore} / ${questions.length}`;
// }

// // Show result
// function showResultBox() {
//   quizBox.classList.remove('active');
//   resultBox.classList.add('active');

//   const scoreText = document.querySelector('.score-text');
//   scoreText.textContent = `Your Score: ${userScore} out of ${questions.length}`;

//   const circularProgress = document.querySelector('.circular-progress');
//   const progressValue = document.querySelector('.progress-value');
//   let progressStartValue = -1;
//   let progressEndValue = (userScore / questions.length) * 100;
//   let speed = 20;

//   let progress = setInterval(() => {
//     progressStartValue++;
//     circularProgress.style.background = `conic-gradient(#c40094 ${progressStartValue * 3.6}deg, rgba(255,255,255,.1) 0deg)`;
//     progressValue.textContent = `${progressStartValue}%`;
//     if (progressStartValue === progressEndValue) {
//       clearInterval(progress);
//     }
//   }, speed);
// }




// // --- DOM Elements ---
// const startBtn = document.getElementById('startQuizBtn'); // Your Start Quiz button ID
// const popupInfo = document.querySelector('.popup-info');
// const exitBtn = document.querySelector('.exit-btn');
// const main = document.querySelector('.main');
// const continueBtn = document.querySelector('.continue-btn');
// const quizSection = document.getElementById('quizSection');  // Make sure this ID matches your HTML
// const quizBox = document.querySelector('.quiz-box');
// const resultBox = document.querySelector('.result-box');
// const tryAgainBtn = document.querySelector('.tryAgain-btn');
// const goHomeBtn = document.querySelector('.goHome-btn');
// const nextBtn = document.querySelector('.next-btn');
// const optionsList = document.querySelector('.option-list');

// let questionCount = 0;
// let questionNumb = 1;
// let userScore = 0;
// let questions = [];
// let selectedCourse = '';

// // Utility: get logged in user email from localStorage
// function getLoggedInEmail() {
//   return localStorage.getItem("userEmail");
// }

// // Function: get questions for selected course, max limit 10
// function getRandomQuestionsFromCourse(course, limit = 10) {
//   console.log("Filtering questions for course:", course);
//   const filtered = questionBank.filter(q => q.course === course);
//   if (!filtered.length) {
//     console.warn("No questions found for course:", course);
//   }
//   const shuffled = [...filtered].sort(() => Math.random() - 0.5);
//   return shuffled.slice(0, limit);
// }

// // Start Quiz button click handler
// startBtn.addEventListener('click', () => {
//   selectedCourse = document.getElementById('courseSelect').value;
//   const loggedInEmail = getLoggedInEmail();

//   console.log("Start Quiz clicked");
//   console.log("Selected course:", selectedCourse);
//   console.log("Logged in email:", loggedInEmail);

//   if (!loggedInEmail) {
//     alert("You must log in before starting the quiz.");
//     return;
//   }

//   if (!selectedCourse) {
//     alert("Please select a course before starting the quiz.");
//     return;
//   }

//   questions = getRandomQuestionsFromCourse(selectedCourse, 10);

//   if (questions.length === 0) {
//     alert("No questions found for the selected course.");
//     return;
//   }

//   // Hide home, show quiz
//   document.getElementById('homePage').style.display = 'none';
//   startBtn.style.display = 'none';
//   quizSection.style.display = 'block';

//   // Reset quiz data
//   questionCount = 0;
//   questionNumb = 1;
//   userScore = 0;

//   document.querySelector(".total-questions").textContent = questions.length;
//   document.querySelector(".current-score").textContent = userScore;

//   showQuestions(questionCount);
//   questionCounter(questionNumb);
//   headerScore();
// });

// // Continue button (if used)
// continueBtn.onclick = () => {
//   popupInfo.classList.remove("active");
//   main.classList.add("active");
//   quizBox.classList.add("active");

//   // Shuffle and limit to 5 questions if you want
//   questions = [...questions].sort(() => Math.random() - 0.5).slice(0, 5);

//   questionCount = 0;
//   questionNumb = 1;
//   userScore = 0;

//   if (!questions[0]) {
//     alert("No questions loaded. Please check your questionBank.");
//     return;
//   }

//   document.querySelector(".total-questions").textContent = questions.length;
//   document.querySelector(".current-score").textContent = userScore;

//   showQuestions(questionCount);
//   questionCounter(questionNumb);
//   headerScore();
// };

// // Exit button closes popup
// exitBtn.onclick = () => {
//   popupInfo.classList.remove('active');
//   main.classList.remove('active');
// };

// // Try Again button resets quiz
// tryAgainBtn.onclick = () => {
//   quizBox.classList.add('active');
//   resultBox.classList.remove('active');
//   nextBtn.classList.remove('active');
//   resetGame();
//   showQuestions(questionCount);
//   questionCounter(questionNumb);
//   headerScore();
// };

// // Go Home button resets UI
// goHomeBtn.onclick = () => {
//   quizSection.classList.remove('active');
//   resultBox.classList.remove('active');
//   nextBtn.classList.remove('active');
//   resetGame();

//   document.getElementById('homePage').style.display = 'block';
//   startBtn.style.display = 'block';
// };

// // Next button moves to next question or result
// nextBtn.onclick = () => {
//   if (questionCount < questions.length - 1) {
//     questionCount++;
//     questionNumb++;
//     showQuestions(questionCount);
//     questionCounter(questionNumb);
//     nextBtn.classList.remove('active');
//   } else {
//     showResultBox();
//   }
// };

// // Reset quiz counters
// function resetGame() {
//   questionCount = 0;
//   questionNumb = 1;
//   userScore = 0;
// }

// // Display current question and options
// function showQuestions(index) {
//   if (!questions || !questions[index]) {
//     console.warn("No question found at index", index);
//     return;
//   }

//   const questionText = document.querySelector('.question-text');
//   questionText.textContent = `${questions[index].numb}. ${questions[index].question}`;

//   let optionTag = '';
//   questions[index].options.forEach(option => {
//     optionTag += `<div class="option"><span>${option}</span></div>`;
//   });

//   optionsList.innerHTML = optionTag;

//   const optionElements = document.querySelectorAll('.option');
//   optionElements.forEach(opt => {
//     opt.setAttribute('onclick', 'optionSelected(this)');
//   });

//   document.querySelector(".current-question").textContent = index + 1;
//   document.querySelector(".total-questions").textContent = questions.length;
// }

// // User selects an option
// function optionSelected(answer) {
//   const userAnswer = answer.textContent;
//   const correctAnswer = questions[questionCount].answer;
//   const allOptions = optionsList.children.length;

//   if (userAnswer === correctAnswer) {
//     answer.classList.add('correct');
//     userScore++;
//     document.querySelector(".current-score").textContent = userScore;
//     headerScore();
//   } else {
//     answer.classList.add('incorrect');
//     // Highlight correct answer
//     for (let i = 0; i < allOptions; i++) {
//       if (optionsList.children[i].textContent === correctAnswer) {
//         optionsList.children[i].classList.add('correct');
//       }
//     }
//   }

//   // Disable all options after selection
//   for (let i = 0; i < allOptions; i++) {
//     optionsList.children[i].classList.add('disabled');
//   }

//   nextBtn.classList.add("active");
// }

// // Update question counter UI
// function questionCounter(index) {
//   const questionTotal = document.querySelector('.question-total');
//   questionTotal.textContent = `${index} of ${questions.length} Questions`;
// }

// // Update score display in header
// function headerScore() {
//   const headerScoreText = document.querySelector(".header-score");
//   headerScoreText.textContent = `Score: ${userScore} / ${questions.length}`;
// }

// // Show results and submit score
// function showResultBox() {
//   quizBox.classList.remove('active');
//   resultBox.classList.add('active');

//   const scoreText = document.querySelector('.score-text');
//   scoreText.textContent = `Your Score: ${userScore} out of ${questions.length}`;

//   const circularProgress = document.querySelector('.circular-progress');
//   const progressValue = document.querySelector('.progress-value');
//   let progressStartValue = -1;
//   let progressEndValue = (userScore / questions.length) * 100;
//   let speed = 20;

//   let progress = setInterval(() => {
//     progressStartValue++;
//     circularProgress.style.background = `conic-gradient(#c40094 ${progressStartValue * 3.6}deg, rgba(255,255,255,.1) 0deg)`;
//     progressValue.textContent = `${progressStartValue}%`;
//     if (progressStartValue === progressEndValue) {
//       clearInterval(progress);
//     }
//   }, speed);

//   // Submit score to backend
//   const email = getLoggedInEmail();
//   if (!email) {
//     alert("You must log in before submitting your score.");
//     return;
//   }

//   console.log("Submitting score", { email, userScore, total: questions.length, selectedCourse });

//   fetch('/submit-score', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({
//       email: email,
//       score: userScore,
//       total: questions.length,
//       course: selectedCourse
//     }),
//   })
//     .then(res => {
//       if (!res.ok) throw new Error("Failed to submit score");
//       console.log("Score submitted successfully");
//     })
//     .catch(err => {
//       console.error(err);
//       alert("Failed to submit your score. Please try again later.");
//     });
// }









// Global variables
let questionBank = [];  // This should be loaded from questions.js or defined here
let questions = [];
let questionCount = 0;
let questionNumb = 1;
let userScore = 0;

// Utility: get random questions for the selected course
function getRandomQuestionsFromCourse(course, limit = 10) {
  const filtered = questionBank.filter(q => q.course === course);
  const shuffled = [...filtered].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, limit);
}

// Display question and options
function showQuestions(index) {
  const questionText = document.querySelector(".question-text");
  const optionList = document.querySelector(".option-list");

  questionText.textContent = questions[index].question;
  optionList.innerHTML = "";

  questions[index].options.forEach((option, i) => {
    const optionDiv = document.createElement("div");
    optionDiv.classList.add("option");
    optionDiv.textContent = option;
    optionDiv.addEventListener("click", () => optionSelected(optionDiv));
    optionList.appendChild(optionDiv);
  });
}

// Handle option selection
function optionSelected(selectedOption) {
  const answer = questions[questionCount].answer;
  const options = document.querySelectorAll(".option");
  
  // Disable all options after one is selected
  options.forEach(opt => opt.style.pointerEvents = "none");

  if (selectedOption.textContent === answer) {
    userScore++;
    selectedOption.classList.add("correct");
  } else {
    selectedOption.classList.add("incorrect");
    // Highlight correct option
    options.forEach(opt => {
      if (opt.textContent === answer) {
        opt.classList.add("correct");
      }
    });
  }

  // Update score display
  document.querySelector(".current-score").textContent = userScore;

  // Show Next button
  document.querySelector(".next-btn").style.display = "inline-block";
}

// Update question number display
function questionCounter(number) {
  document.querySelector(".current-question").textContent = number;
}

// Optional: update header or other score UI parts
function headerScore() {
  document.querySelectorAll(".total-questions").forEach(elem => {
    elem.textContent = questions.length;
  });
}

// On DOM load, set up all event listeners and initial states
document.addEventListener('DOMContentLoaded', () => {
  // Check login, redirect if not logged in
  if (!localStorage.getItem("isLoggedIn")) {
    window.location.href = "login.html";
    return;
  }

  // Load your full questionBank here or ensure it's loaded by questions.js before this script
  // For example: questionBank = [...]; // from your questions.js file

  // Setup course selection and documents display
  const courseSelect = document.getElementById("course-select");
  const documentSection = document.getElementById("document-section");
  const documentLinks = document.getElementById("document-links");

  const documentsBySubject = {
    ict: [
      { name: "Network", url: "docs/network.pdf" },
      { name: "Network Topologies", url: "docs/network-topologies.pdf" }
    ],
    ck: [
      { name: "Network", url: "docs/network.pdf" },
      { name: "Network Topologies", url: "docs/network-topologies.pdf" }
    ]
  };

  courseSelect.addEventListener("change", () => {
    const selected = courseSelect.value;
    documentLinks.innerHTML = "";

    if (documentsBySubject[selected]) {
      documentsBySubject[selected].forEach(doc => {
        const li = document.createElement("li");
        const link = document.createElement("a");
        link.href = doc.url;
        link.download = "";
        link.textContent = doc.name;
        li.appendChild(link);
        documentLinks.appendChild(li);
      });
      documentSection.style.display = "block";
    } else {
      documentSection.style.display = "none";
    }
  });

  // Start Quiz button
  const startBtn = document.getElementById('start-quiz-btn');
  startBtn.addEventListener('click', () => {
    const courseSelected = courseSelect.value;
    if (!courseSelected) {
      alert("Please select a course before starting the quiz.");
      return;
    }

    // Get random questions from selected course
    questions = getRandomQuestionsFromCourse(courseSelected, 10);

    if (questions.length === 0) {
      alert("No questions found for selected course.");
      return;
    }

    // Reset quiz variables
    questionCount = 0;
    questionNumb = 1;
    userScore = 0;

    // Update UI
    document.getElementById("home-section").style.display = "none";
    document.querySelector(".quiz-section").style.display = "block";
    documentSection.style.display = "none";
    document.getElementById("selected-course-label").textContent = courseSelected.toUpperCase();

    headerScore();
    document.querySelector(".current-score").textContent = userScore;

    // Hide Next button initially
    document.querySelector(".next-btn").style.display = "none";

    // Show first question
    showQuestions(questionCount);
    questionCounter(questionNumb);
  });

  // Next button logic
  const nextBtn = document.querySelector(".next-btn");
  nextBtn.addEventListener("click", () => {
    questionCount++;
    questionNumb++;

    if (questionCount < questions.length) {
      showQuestions(questionCount);
      questionCounter(questionNumb);
      nextBtn.style.display = "none";  // Hide Next button until option selected
    } else {
      // Quiz finished
      alert(`Quiz completed! Your score is ${userScore} out of ${questions.length}.`);
      // You can redirect or reset quiz here
      window.location.reload(); // simple reload to reset quiz
    }
  });
});
