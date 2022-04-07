var count = 60;

$(() => {
  console.log("ready");
  let qaSection = $("#qa-section");
  qaSection.fadeIn(10000);

  var countDown = setInterval(() => {
    if (count === 0) {
      countDown = null;
      return;
    }
    count--;
    console.log(count);
    $("#cur-time").text(count);
  }, 1000);
});
