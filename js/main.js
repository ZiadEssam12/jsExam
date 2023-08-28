/// <reference types="../@types/jquery" />

const parts = "25/10/2023".split("/");
const date = new Date(parts[2], parts[1] - 1, parts[0]);

let nowDate = new Date();

// Result in milliseconds
let result = date.getTime() - nowDate.getTime();

//intial all p to be hidden
$(".Singer .info-background")
  .css("display", "none")
  .eq(0)
  .css("display", "block");

// Set time for the countdown
setInterval(() => {
  let nowDate = new Date();
  let result = date.getTime() - nowDate.getTime();
  // milliseconds to days *1000 to seconds
  // 60 to minutes
  // 60 to hours
  // 24 to days

  let days = Math.floor(result / (1000 * 60 * 60 * 24));
  let hours = Math.floor((result % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((result % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((result % (1000 * 60)) / 1000);

  $("#daysCount").text(days);
  $("#hoursCount").text(hours);
  $("#minutesCount").text(minutes);
  $("#secondsCount").text(seconds);
}, 1000);

$(".Singer").on("click", (e) => {
  const clickedH2 = $(e.target).next();
  $(".Singer .info-background")
    .not(clickedH2)
    .slideUp()
    .animate({ padding: "0px" }, 100);
  $(clickedH2).slideToggle();
});

$("#message").on("input", (e) => {
  let length = e.target.value.length;
  $(".reaminingChar").text(100 - length);
  if (length >= 100) {
    e.target.value = e.target.value.substring(0, 100);

    $(".reaminingChar").text("your available character finished");
  }
});

$("#closeButton").on("click", () => {
  $(".nav").animate({ width: "toggle" }, 500);
  $("#home .head").animate({ right: "0px" }, 500);
});

$("#openNav").on("click", () => {
  if ($(".nav").css("display") == "none") {
    $(".nav").animate({ width: "toggle" }, 500);
    $("#home .head").animate({ right: "-250px" }, 500);
  }
});
