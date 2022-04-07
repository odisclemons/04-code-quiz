var count = 3;

$(() => {
  console.log("ready");
  let qaSection = $("#qa-section");
  //qaSection.fadeIn(1000);

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
});

function timesUp() {
  console.log("Time is up!");
}
