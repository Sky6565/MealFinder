const searchEl = document.getElementById("search");
const submitEl = document.getElementById("submit");
const randomEl = document.getElementById("random");
const mealsEl = document.getElementById("meals");
const resultHeadingEl = document.getElementById("result-heading");
const single_mealEl = document.getElementById("single-meal");

//Search meal and fetch from Api
function searchMeal(e) {
  e.preventDefault();

  //Clear single meal
  single_mealEl.innerHTML = "";

  //   Get search Term
  const term = searchEl.value;

  //   Check for empty
  if (term.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then((res) => res.json())
      .then((data) => {
        resultHeadingEl.innerHTML = `<h2>Search results for '${term}':</h2>`;
        if (data.meals === null) {
          resultHeadingEl.innerHTML = `<p>There are no search results. Try again!</p>`;
        } else {
          mealsEl.innerHTML = data.meals
            .map(
              (meal) => `
              <div class="meal">
              <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
              <div class="meal-info" data-mealID="${meal.idMeal}">
                <h3>${meal.strMeal}</h3>
              </div>
            </div>
          `
            )
            .join("");
        }
      });

    //   Clear search text
    searchEl.value = "";
  } else {
    alert("please enter a search term");
  }
}

// Event listener
submitEl.addEventListener("submit", searchMeal);
