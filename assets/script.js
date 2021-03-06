//begin by grabbing each element we will have to modify or listen to events
var qaSection = $("#qa-section");
var qaStart = $("#qa-start");
var qaWelcome = $("#qa-welcome");
var qaGameOver = $("#qa-game-over");
var questionPrompt = $("#question-prompt");
var answerChoicees = $("#answer-choices");
var btnHsSubmit = $("#btn-hs-submit");
var inpHs = $("#inp-hs")[0];
var highScores = $("#high-scores");
var highScoreList = $("#high-score-list");
var viewHighScores = $("#view-high-scores");

var btnGoBack = $("#btn-go-back");
var btnClearScores = $("#btn-clear-scores");

var correct = $("#correct");
var wrong = $("#wrong");

// ********************************* remove ********************************* \\
var lsTest = $("#ls-test");

// ********************************* remove ********************************* \\

// start time at 60 seconds
var count = 60;

// countDown will store timer globally so we can remove it later
var countDown;

// start at question 0 in array and iterate by 1 each time
var currentQuestion = 0;

var correctAnswers = 0;
var wrongAnswers = 0;

//array of possible questions
var questions = [
  {
    qs: "Commonly used data types DO NOT include:",
    answers: ["strings", "booleans", "alerts", "numbers"],
    correctAnswer: "alerts",
  },
  {
    qs: "The condition in an if / else statement is enclosed within _____",
    answers: ["quotes", "curly brackets", "parentheses", "square brackets"],
    correctAnswer: "parentheses",
  },
  {
    qs: "Arrays in javascript can be used to store _____",
    answers: [
      "numbers and strings",
      "other arrays",
      "booleans",
      "all of the above",
    ],
    correctAnswer: "all of the above",
  },
];

// what to do when time is up?
function handleGameOver() {
  // remove interval
  clearInterval(countDown);
  countDown = null;

  // just making sure the count stops
  count = 0;

  $("#cur-time").text("0");

  // show the score
  // if they got 80% or more, they get hype !!!, otherwise they get the boring "."
  $("#score").text(
    `${correctAnswers} out of ${questions.length} correct${
      correctAnswers / questions.length >= 0.8 ? "!!!" : "."
    }`
  );
  // hide the question list
  // after its hidden, callback displays game over screen
  qaSection.hide(() => {
    qaGameOver.css({ display: "flex" });
    $(qaGameOver.fadeIn());
  });
}

function startGame() {
  // make sure these values are reset because it will cause wierd behavior after
  // completing a game and starting a new one
  count = 60;
  currentQuestion = 0;
  correctAnswers = 0;
  wrongAnswers = 0;
  inpHs.value = "";

  //start the countdown
  countDown = setInterval(() => {
    // when timer reaches 0 remove interval and execute gameOver
    if (count < 0) {
      clearInterval(countDown);
      countDown = null;
      handleGameOver();
      return;
    }

    nextQuestion();

    // update time every second and -1 until we get to 0
    // (also, give them 1 more second after 0 but dont show it)
    $("#cur-time").text(count);
    count--;
  }, 1000);
}

function nextQuestion() {
  // if no more questions, gameOver
  if (currentQuestion >= questions.length) {
    handleGameOver();
    return;
  }

  // destructure next question and possible answers
  let { qs, answers } = questions[currentQuestion];

  questionPrompt.text(qs);
  answerChoicees.html("");

  // loop through answers and make buttons for them
  answers.forEach((ans, i) => {
    // format the button like this: 1. first answer
    let btnCaption = `${i + 1}. ${ans}`;
    let qsButton = `<button type="button" class="btn btn-sm" onClick="checkAnswer('${ans}')" aria-label="option ${
      i + 1
    }: ${ans}">${btnCaption}</button>`;
    answerChoicees.append(qsButton);
  });

  // fade the question section in
  qaSection.fadeIn();
}

// check if the answer they chose matches the correct answer
function checkAnswer(answer) {
  // if correct, show correct notification for 3 seconds,
  // then increment correct answers
  if (questions[currentQuestion].correctAnswer === answer) {
    correct.show();
    correct.hide(3000);
    correctAnswers++;
  } else {
    // if wrong, show incorrect notification for 3 seconds, increment wrong answers,
    // and take 10 seconds off the timer
    wrong.show();
    wrong.hide(3000);
    count = count - 10;
    wrongAnswers++;
  }

  // go to next question
  currentQuestion++;

  // fade the section and execute next question as the callback
  qaSection.fadeOut(nextQuestion);
}

// handle submit for initials screen
function handleHsSubmit() {
  // make sure length is only 3 chars
  if (!inpHs || inpHs.length > 3 || inpHs.length < 1) return;

  // store name (uppercase) and score values
  let newScore = { name: inpHs.value.toUpperCase(), score: correctAnswers };

  //get current array from localstorage
  let scores = JSON.parse(localStorage.getItem("cqScores"));

  // if its an array, spread operator to add new score to it
  if (Array.isArray(scores)) {
    localStorage.setItem("cqScores", JSON.stringify([...scores, newScore]));
  } else {
    // otherwise, something else is in there or its null
    // replace it with the new score in its own array
    localStorage.setItem("cqScores", JSON.stringify([newScore]));
  }

  getHighScores();
}

function getHighScores() {
  // if timer is running, dont bother showing scores
  if (countDown) return;

  //get current scores from localstorage
  let scores = JSON.parse(localStorage.getItem("cqScores"));

  //empty the list (each time you click, it will keep duplicating)
  highScoreList.empty();

  // if scores is an array
  if (Array.isArray(scores)) {
    //first sort them by score
    scores
      .sort((a, b) => b.score - a.score)
      // then map through and create a new li for each one
      .map((usr) => {
        let { name, score } = usr;
        let li = `<li>${name} - ${score}</li>`;

        //append li to ul of high scores
        highScoreList.append(li);
      });
  }

  // make sure these sections are hidden
  qaWelcome.hide();
  qaGameOver.hide();

  qaGameOver.hide(() => {
    //show the high scores now
    highScores.css({ display: "flex" });
    $(highScores.fadeIn());
  });
}

// after document is ready, add event listener for initial start button
$(() => {
  qaStart.click(() => {
    // after click, fadeout welcome screen for 1 second then trigger start game function
    qaWelcome.fadeOut(1000, () => startGame());
  });

  // hide the high scores and show welcome screen
  btnGoBack.click(() => {
    highScores.fadeOut(1000, () => qaWelcome.fadeIn(1000));
  });

  // clear local storage of scores
  btnClearScores.click(() => {
    localStorage.removeItem("cqScores");
    getHighScores();
  });

  // handle the high scores link
  viewHighScores.click(getHighScores);
});
