//begin by grabbing each element we will have to modify or listen to events
var qaSection = $("#qa-section");
var qaStart = $("#qa-start");
var qaWelcome = $("#qa-welcome");

// start time at 60 seconds
var count = 60;

// start at question 0 in array and iterate by 1 each time
var currentQuestion = 0;

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
];

// after document is ready, add event listener for initial start button
$(() => {
  qaStart.click(() => {
    // after click, fadeout welcome screen for 2 seconds then trigger start game function
    qaWelcome.fadeOut(2000, () => startGame());
  });
});

// what to do when time is up?
function timesUp() {
  console.log("Time is up!");
}

function startGame() {
  //start by fading the question section in
  qaSection.fadeIn();

  //start the countdown
  var countDown = setInterval(() => {
    // when timer reaches 0 remove interval and execute timesUp
    if (count < 0) {
      countDown = null;
      timesUp();
      return;
    }

    console.log(count);
    // update time ever second and -1 until we get to 0
    // (also, give them 1 more second after 0 but dont show it)
    $("#cur-time").text(count);
    count--;
  }, 1000);
}
