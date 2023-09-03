const mealsContainer = document.getElementById("displayMeals");
const searchPage = document.getElementById("searchPage");
const searchByName = document.getElementById("searchByName");
const searchByFirstletter = document.getElementById("searchByFirstletter");
const categoryBtn = document.getElementById("categoryBtn");
const AreaBtn = document.getElementById("AreaBtn");
const ingredientsBtn = document.getElementById("ingredientsBtn");
const Ingredients = document.getElementById("Ingredients");
const contact = document.getElementById("contact");
const contactBtn = document.getElementById("contactBtn");
const displayArea = document.getElementById("displayArea");
const categories = document.getElementById("categories");
let mealsData = "";
let categoriesList = "";
let testedInput = 0;
const mySet = new Set();

//////////////////// ////////////////////
animateHideLi();
$("header ul li").on("click", function () {
  hideAside();
});
function hideAside() {
  if ($("aside").css("display") == "block") {
    $("aside").animate({ width: "toggle" }, 500);
    changeIcon();
  }
}

async function getInfo(url) {
  var response = await fetch(url);
  var response = await response.json();
  return response;
}

function showSpinner() {
  $(".spinner").removeClass("d-none");
}

function hideSpinner() {
  $(".spinner").addClass("d-none");
}

function hideAllButNot(elemnt) {
  $("section").addClass("d-none");
  $("header").removeClass("d-none");
  $(elemnt).removeClass("d-none");
}

(() => {
  $("section , header").addClass("d-none");
  const url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
  displayMeals(url);
})();

function displayMeals(url) {
  let DisplayMealsVar = "";
  getInfo(url)
    .then((data) => {
      $(".dislay-meals , header").removeClass("d-none");
      hideSpinner();
      try {
        mealsData = data.meals.slice(0, 20);
      } catch {
        return "";
      }
      for (let i = 0; i < mealsData.length; i++) {
        const meal = `
      <div class="col rounded-2 d-flex">
      <div
        class="meal-container position-relative overflow-hidden rounded-2"
      >
        <div class="meal-img">
          <img
            src="${mealsData[i].strMealThumb}"
            alt="meal temp img"
            class="img-fluid rounded-2"
          />
        </div>
  
        <div class="layer position-absolute">
          <div class="meal-info d-flex h-100 align-items-center" data-id="${mealsData[i].idMeal}">
            <h3 class="text-black ms-2">${mealsData[i].strMeal}</h3>
          </div>
        </div>
      </div>
    </div>
      
      `;
        DisplayMealsVar += meal;
      }
    })
    .then(() => {
      mealsContainer.innerHTML = DisplayMealsVar;
    });
}

mealsContainer.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("meal-info") ||
    e.target.parentElement.classList.contains("meal-info")
  ) {
    document.getElementById("displayMeals").innerHTML = "";
    let currentClickedMeal = -1;

    if (e.target.classList.contains("meal-info")) {
      currentClickedMeal = e.target.getAttribute("data-id");
    } else {
      currentClickedMeal = e.target.parentElement.getAttribute("data-id");
    }

    let url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${currentClickedMeal}`;
    displayMealInfo(url);
  }
});

function displayMealInfo(url) {
  showSpinner();
  getInfo(url).then((data) => {
    data = data.meals[0];
    let tags = "";
    try {
      tags = data.strTags
        .split(",")
        .map((tag) => `<li class="alert alert-danger p-1 m-2">${tag}</li>`)
        .join("");
    } catch {
      tags = "";
    }
    const mealInfo = `
    
    <div class="col-12 col-md-4">
    <div>
      <img
        src="${data.strMealThumb}"
        alt="${data.strMeal} image"
        class="img-fluid rounded-3"
      />
      <h2>${data.strMeal}</h2>
    </div>
  </div>
  <div class="col-12 col-md-8">
    <div class="meal-info">
      <h2>Instructions</h2>
      <p>
            ${data.strInstructions}
      </p>
    </div>
    <div class="meal-recipes">
      <h3 class="fw-bolder">
        Area : <span class="fw-semibold">${data.strArea}</span>
      </h3>
      <h3 class="fw-bolder">
        Category : <span class="fw-semibold"> ${data.strCategory}</span>
      </h3>
      <h3>Recipes :</h3>
      <div class="recipes mt-3 ms-2">
        <ul class="list-unstyled d-flex flex-wrap column-gap-3">
            ${getIngerdiant(data)}
        </ul>
      </div>

      <h3>Tags :</h3>
      <ul class="list-unstyled d-flex">
      ${tags}
      </ul>

      <a href="${
        data.strSource
      } " target="_blank" class="btn btn-success">Source</a>
      <a href="${
        data.strYoutube
      }" target="_blank" class="btn btn-danger">Youtube</a>
    </div>
  </div>

    `;
    hideAllButNot("#displayMeal");
    document.getElementById("putMealsInfo").innerHTML = mealInfo;
    hideSpinner();
  });
}

function getIngerdiant(currentMeal) {
  let ingrediant = "";
  for (let i = 1; i <= 20; i++) {
    if (currentMeal[`strIngredient${i}`]) {
      ingrediant += `
            <li class="alert alert-info p-1">${currentMeal[`strMeasure${i}`]} ${
        currentMeal[`strIngredient${i}`]
      }</li>
            `;
    }
  }
  return ingrediant;
}

$("#displaySideDiv").on("click", () => {
  changeIcon();
  $("aside").animate({ width: "toggle" }, 500);
});

searchPage.addEventListener("click", (e) => {
  hideAllButNot("#search");
});

function changeIcon() {
  if ($("aside").css("display") == "none") {
    $("#displaySideDiv").html('<i class="fa-solid fa-x"></i>');
    animateShowLi();
  } else {
    $("#displaySideDiv").html(`
    <div class="bar bg-black rounded-pill"></div>
    <div class="bar bg-black rounded-pill"></div>
    <div class="bar bg-black rounded-pill"></div>
    <div class="bar bg-black rounded-pill"></div>
    `);
    animateHideLi();
  }
}

function animateShowLi() {
  let li = document.querySelectorAll("aside ul li");
  for (let i = 0; i < li.length; i++) {
    let currentTop = li[i].style.top;
    $(li[i]).animate({ top: "0px" }, 220 * i);
  }
}

function animateHideLi() {
  $("aside ul li").animate({ top: "200px" }, 300);
}

searchByName.addEventListener("input", () => {
  showSpinner();
  mealsContainer.innerHTML = "";
  if ($("aside").css("display") == "block") {
    $("aside").animate({ width: "toggle" }, 500);
    changeIcon();
  }
  const searchInput = document.getElementById("searchByName").value;
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`;
  displayMeals(url);
});

searchByFirstletter.addEventListener("input", () => {
  showSpinner();
  mealsContainer.innerHTML = "";

  if ($("aside").css("display") == "block") {
    $("aside").animate({ width: "toggle" }, 500);
    changeIcon();
  }

  const searchInput = document.getElementById("searchByFirstletter").value;
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchInput}`;
  displayMeals(url);
});

categories.addEventListener("click", (e) => {
  if (e.target.parentElement.classList.contains("meal-info")) {
    showSpinner();
    $("#displayCategories").html("");
    let category = e.target.parentElement.getAttribute("data-category");
    let url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
    displayMeals(url);
  }
});

categoryBtn.addEventListener("click", () => {
  showSpinner();
  hideAllButNot("#categories");
  const url = `www.themealdb.com/api/json/v1/1/categories.php`;
  displayAllCategories(url);
});

function displayAllCategories() {
  const url = "https://www.themealdb.com/api/json/v1/1/categories.php";
  getInfo(url)
    .then((data) => {
      let categoriesData = data.categories.slice(0, 14);
      for (let i = 0; i < categoriesData.length; i++) {
        categoriesList += `
        <div class="col rounded-2 d-flex">
        <div
          class="meal-container position-relative overflow-hidden rounded-2"
        >
          <div class="meal-img">
            <img
              src="${categoriesData[i].strCategoryThumb}"
              alt="meal temp img"
              class="img-fluid rounded-2"
            />
          </div>

          <div class="layer position-absolute">
            <div class="meal-info py-3 px-2" data-category="${
              categoriesData[i].strCategory
            }">
              <h3 class="text-black ms-2 text-center ">${
                categoriesData[i].strCategory
              }</h3>
              <p class="text-black text-center">
                  ${categoriesData[i].strCategoryDescription.substring(0, 100)}
              </p>
            </div>
          </div>
        </div>
      </div>
      `;
      }
    })
    .then(() => {
      hideSpinner();
      document.getElementById("displayCategories").innerHTML = categoriesList;
    });
}

displayArea.addEventListener("click", (e) => {
  if (e.target.parentElement.classList.contains("pointer")) {
    showSpinner();
    $("#dislay-meals").html("");
    hideAllButNot("#dislay-meals");
    let area = e.target.parentElement.getAttribute("data-area");
    let url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`;
    displayMeals(url);
  }
});

AreaBtn.addEventListener("click", () => {
  showSpinner();
  hideAllButNot("#AreaContainer");
  const url = `https://www.themealdb.com/api/json/v1/1/list.php?a=list`;
  displayAllArea(url);
});

function displayAllArea(url) {
  let mealsListHtml = "";

  getInfo(url)
    .then((data) => {
      let mealsList = data.meals;
      for (let i = 0; i < mealsList.length; i++) {
        mealsListHtml += `
        <div class="col ">
        <div class="text-center pointer" data-area="${mealsList[i].strArea}">
          <i class="fa-solid fa-house-laptop"></i>
          <h3>${mealsList[i].strArea}</h3>
        </div>
      </div>
      `;
      }
    })
    .then(() => {
      hideSpinner();
      document.getElementById("displayArea").innerHTML = mealsListHtml;
    });
}

Ingredients.addEventListener("click", (e) => {
  showSpinner();
  $("#displayIngredients").html("");
  hideAllButNot("#dislay-meals");
  let ingredients = e.target.parentElement.getAttribute("data-ingredients");
  let url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`;
  displayMeals(url);
});

ingredientsBtn.addEventListener("click", () => {
  showSpinner();
  hideAllButNot("#Ingredients");
  const url = `https://www.themealdb.com/api/json/v1/1/list.php?i=list`;
  displayAllIngredients(url);
});

function displayAllIngredients(url) {
  let mealsListHtml = "";

  getInfo(url)
    .then((data) => {
      let mealsList = data.meals;
      for (let i = 0; i < 20; i++) {
        mealsListHtml += `
        <div class="col ">
        <div class="text-center pointer" data-ingredients="${
          mealsList[i].strIngredient
        }">
          <i class="fa-solid fa-drumstick-bite"></i>
          <h3>${mealsList[i].strIngredient}</h3>
          <p>${String(mealsList[i].strDescription).substring(0, 130)}</p>
        </div>
      </div>
      `;
      }
    })
    .then(() => {
      hideSpinner();
      document.getElementById("displayIngredients").innerHTML = mealsListHtml;
    });
}

contactBtn.addEventListener("click", () => {
  showSpinner();
  hideAllButNot("#contact");
  hideSpinner();
});

contact.addEventListener("input", (e) => {
  const regexName = /^[A-Za-z -]+$/;
  const regexEmail = /^.+@.{2,}\..{2,}$/;
  const regexPhone = /^0(10|11|15)\d{8}$/;
  const regexAge = /^(?:[1-9]|[1-9][0-9])$/;
  const regexPassword = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
  const inputs = document.querySelectorAll("#contact p");
  const passwordSelector = document.getElementById("ContactPasswordInput");
  const RepasswordSelector = document.getElementById("ContactrePasswordInput");
  let regex = "";

  if (e.target.getAttribute("name") == "name") {
    regex = regexName;
    mySet.add(1);
  }
  if (e.target.getAttribute("name") == "email") {
    regex = regexEmail;
    mySet.add(2);
  }

  if (e.target.getAttribute("name") == "phone") {
    regex = regexPhone;
    mySet.add(3);
  }

  if (e.target.getAttribute("name") == "age") {
    regex = regexAge;
    mySet.add(4);
  }

  if (e.target.getAttribute("name") == "Password") {
    regex = regexPassword;
    mySet.add(5);
  }

  if (
    passwordSelector.value == RepasswordSelector.value &&
    e.target.getAttribute("id") == "ContactrePasswordInput"
  ) {
    $(e.target).next().addClass("d-none");
    mySet.add(6);
  } else {
    $(e.target).next().removeClass("d-none");
  }

  try {
    if (!regex.test(e.target.value)) {
      $(e.target).next().removeClass("d-none");
    } else {
      $(e.target).next().addClass("d-none");
    }
  } catch {}

  if (mySet.size == 6) {
    if (document.querySelectorAll("#contact p.d-none").length == 6) {
      document
        .getElementById("ContactButtonSubmit")
        .removeAttribute("disabled");
    }
  }
});
