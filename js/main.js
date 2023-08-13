var navbarUL = document.querySelector(".navbar-nav");
var navbarULIndideLI = navbarUL.querySelectorAll(".nav-link");
var weatherDisplayCardsContainer = document.getElementById(
  "weatherDisplayCardsContainer"
);
var cityInput = document.getElementById("cityInput");
var dayIndex;
var day;
var days = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
};

var months = {
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December",
};

navbarUL.addEventListener("click", function (e) {
  // console.log(navbarULIndideLI)
  for (var index = 0; index < navbarULIndideLI.length; index++) {
    if (
      navbarULIndideLI[index].getAttribute("data-index") ==
        e.target.getAttribute("data-index") &&
      !navbarULIndideLI[index].classList.contains("active")
    ) {
      navbarULIndideLI[index].classList.add("active");
    } else {
      navbarULIndideLI[index].classList.remove("active");
    }
  }
});

cityInput.addEventListener("input", function () {
  console.log("1 " + cityInput.value);
  if (cityInput.value.length >= 2) {
    console.log("2 " + cityInput.value);
    initResponse(cityInput.value);
  }
});

async function initResponse(cityInput) {
  try {
    var response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=0b365913742342db89e153315230708&q=${cityInput}&days=3`
    );
    var response = await response.json();

    var city = response.location.name;
    var dayIndex = new Date(response.location.localtime).getDay();
    day = days[dayIndex];

    weatherCards =
      setTodayCard(response.current, day, city) +
      setLaterCard(response.forecast.forecastday[1]) +
      setLaterCard(response.forecast.forecastday[2]);

    weatherDisplayCardsContainer.innerHTML = weatherCards;
  } catch {}
}

function setTodayCard(today, day, city) {
  var index = new Date(today.last_updated);
  var dayNumber = new Date(today.last_updated).getDate();
  var index = index.getMonth();
  var month = months[index];
  var temp = today.temp_c;
  var condition = today.condition;
  var card = `
    <div class="col" id="todayWeather">
    <div class="card pb-4 rounded-0">
      <div
        class="head d-flex justify-content-between px-2 align-items-center py-2"
      >
        <p class="m-0 p-0">${day}</p>
        <p class="m-0 p-0">${dayNumber}${month}</p>
      </div>
      <div
        class="body px-3 d-flex flex-column justify-content-center h-100"
      >
        <h2 class="weather__city mt-4">${city}</h2>
        <div
          class="degree d-flex justify-content-between align-items-center pb-4"
        >
          <h3 class="degree__C">${temp}<sup>o</sup>C</h3>
          <img src="${condition.icon}" alt="moon" />
        </div>
        <span class="watherStatus">${condition.text}</span>

        <div class="mt-3 d-flex column-gap-4 p-0">
          <div>
            <img src="./images/icon-umberella.png" alt="" />
            <span>${today.cloud}%</span>
          </div>
          <div>
            <img src="./images/icon-wind.png" alt="" />
            <span>${today.wind_kph}km/h</span>
          </div>
          <div>
            <img src="./images/icon-compass.png" alt="" />
            <span>${today.wind_dir}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
    `;
  return card;
}

function setLaterCard(responseDay) {
  day = responseDay.date;
  day = new Date(day).getDay();
  day = days[day];

  var card = `
    <div class="col text-center laterWeather">
    <div class="card pb-4 rounded-0">
      <div class="head d-flex justify-content-center px-2 py-2">
        <p class="m-0 p-0">${day}</p>
      </div>
      <div
        class="body px-3 d-flex flex-column justify-content-center h-100"
      >
        <img
          src="${responseDay.day.condition.icon}"
          alt="moon"
          class="mx-auto"
        />
        <div class="degree py-4">
          <h3 class="degree__C">${responseDay.day.maxtemp_c}<sup>o</sup>C</h3>
          <span>${responseDay.day.mintemp_c}<sup>o</sup></span>
        </div>
        <span class="watherStatus">${responseDay.day.condition.text}</span>
      </div>
    </div>
  </div>
    `;

  return card;
}

if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(function (position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    getcountryinfo(latitude,longitude);
  });
}

async function getcountryinfo(latitude ,longitude) {
  var response = await fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
  );
  response = await response.json();
  city=response.principalSubdivision
  initResponse(city)
}
