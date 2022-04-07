var qaSection = $("#qa-section");
var qaStart = $("#qa-start");
var qaWelcome = $("#qa-welcome");
var count = 60;
var currentQuestion = 0;

var questions = [
  {
    qs: "Commonly used data types DO NOT include:",
    answers: ["strings", "booleans", "alerts", "numbers"],
    correctAnswer: "alerts",
  },
];

$(() => {
  qaStart.click(() => {
    qaWelcome.fadeOut(2000, () => startGame());
    // startGame();
  });
});

function timesUp() {
  console.log("Time is up!");
}

function startGame() {
  qaSection.fadeIn();
  var countDown = setInterval(() => {
    if (count < 0) {
      countDown = null;
      timesUp();
      return;
    }

    console.log(count);
    $("#cur-time").text(count);
    count--;
  }, 1000);
}
