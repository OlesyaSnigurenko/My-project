"use strict";

const nowDate = document.getElementsByTagName("td");
const captionMonth = document.getElementsByTagName("caption");
const nowYear = document.getElementById("year");
const image = document.getElementById("image");

const reserve = document.getElementById("reserve");

const leftToggle = document.getElementById("left");
const rightToggle = document.getElementById("right");

// Вывод текущего месяца и года
const verification = new Date();
const day = verification.getDate(); // получаю день
let now = new Date(); // назначаю дату

function calendar() {
  let year = now.getFullYear(); // получаю год
  let month = now.getMonth(); // получаю месяц

  let firstDayOfMonth = new Date(year, month, 1).getDay(); // день недели первого дня месяца
  let numberDays = new Date(year, month + 1, 0).getDate(); // последний день месяца (или количество дней в месяце)

  nowYear.textContent = year;
  captionMonth[0].textContent = nameMonth[month];
  image.setAttribute("src", imageMonth[month]);

  if (firstDayOfMonth === 0) {
    for (let i = 1; i <= numberDays; i++) {
      nowDate[i + 5].textContent = i;
    }
  } else {
    for (let i = 1; i <= numberDays; i++) {
      nowDate[i - 1 + (firstDayOfMonth - 1)].textContent = i;
    }
  }

  // Выделение сегодняшнего дня

  let nowYearMonth = now.toLocaleDateString("default", {
    year: "numeric",
    month: "long",
  });

  let verificationYearMonth = verification.toLocaleDateString("default", {
    year: "numeric",
    month: "long",
  });

  if (nowYearMonth === verificationYearMonth) {
    nowDate[day + 1].classList.add("calendar-table__now-day");
  } else {
    nowDate[day + 1].classList.remove("calendar-table__now-day");
  }
}
calendar();

// Листаем месяцы вперед

rightToggle.addEventListener("click", function () {
  let nextMonth = Number(nameMonth.indexOf(document.getElementsByTagName("caption")[0].textContent)) + 1;

  let newYear = () => {
    let numberYear = Number(document.getElementById("year").textContent.slice(0, 4));

    if (nextMonth === 0) {
      return numberYear + 1;
    } else {
      return numberYear;
    }
  };

  for (let i = 0; i < nowDate.length; i++) {
    nowDate[i].textContent = "";
  }
  now = new Date(newYear(), nextMonth);

  calendar();
});

// Листаем месяцы назад

leftToggle.addEventListener("click", function () {
  let lastMonth = Number(nameMonth.indexOf(document.getElementsByTagName("caption")[0].textContent)) - 1;

  let newYear = () => {
    let numberYear = Number(document.getElementById("year").textContent.slice(0, 4));

    if (lastMonth === 11) {
      return numberYear - 1;
    } else {
      return numberYear;
    }
  };

  for (let i = 0; i < nowDate.length; i++) {
    nowDate[i].textContent = "";
  }

  now = new Date(newYear(), lastMonth);

  calendar();
});
