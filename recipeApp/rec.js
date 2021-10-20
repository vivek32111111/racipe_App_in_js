//toggle recipe-card

document.getElementById("Add").addEventListener("click", function () {
  document.querySelector(".resultA").style.display = "none";
  document.querySelector(".resultB").style.display = "block";
  document.querySelector(".search").style.display = "none";
  document.querySelector(".resultC").style.display = "block";
});
//ingredients==========================================
const ingredientsText = document.getElementById("ingreText");
const addTab = document.getElementById("addIngre");
const list = document.querySelector(".resultB ul");
addTab.addEventListener("click", (e) => {
  if (ingredientsText != "") {
    e.preventDefault();
    const myLi = document.createElement("li");
    myLi.innerHTML = ingredientsText.value;
    list.appendChild(myLi);
  }
});
//========
let addBtn = document.getElementById("submit-recipe");
const addTitle = document.getElementById("input-title");
const addMethod = document.getElementById("input-method");
//===
//====
addBtn.addEventListener("click", (e) => {
  let recipes = localStorage.getItem("recipes");
  if (recipes == null) {
    recipesObj = [];
  } else {
    recipesObj = JSON.parse(recipes);
  }
  let myObj = {
    title: addTitle.value,
    method: addMethod.value,
    ingre: ingredientsText.value,
  };
  recipesObj.push(myObj);
  localStorage.setItem("recipes", JSON.stringify(recipesObj));
  addTitle.value = "";
  addMethod.value = "";
  ingredientsText.value = [];
  showRecipes();
});

function showRecipes() {
  let recipes = localStorage.getItem("recipes");
  if (recipes == null) {
    recipesObj = [];
  } else {
    recipesObj = JSON.parse(recipes);
  }

  let html = "";
  recipesObj.forEach(function (element, index) {
    html += `
   <div class="recipe-card" id ="recipes">
            <div class="title">
              <h3 id="recipe-title">${element.title}</h3>
            </div>
            <div class="recipe-details">
              <p id="recipe-method">${element.method}</p>
              <ul id="recipe-ingredients">
                <li>${element.ingre}</li>
                
              </ul>
            </div>
  <br/>
            <button class ="delete" id="${index}" onClick = "deleteRecipe(this.id)">delete</button>
            <button class ="edit" id="${index}" onClick = "editRecipe(this.id)">edit</button>
          </div>
          </div>
  `;
  });

  let recipeElm = document.getElementById("recipes");
  if (recipesObj.length != 0) {
    recipeElm.innerHTML = html;
  } else {
    recipeElm.innerHTML = null;
  }
  console.log(recipesObj);
}
showRecipes();

function deleteRecipe(index) {
  console.log("deleting", index);
  let recipes = localStorage.getItem("recipes");
  if (recipes == null) {
    recipesObj = [];
  } else {
    recipesObj = JSON.parse(recipes);
  }
  recipesObj.splice(index, 1);
  localStorage.setItem("recipes", JSON.stringify(recipesObj));
  showRecipes();
}

let search = document.getElementById("search");
search.addEventListener("input", function () {
  let inputVal = search.value;
  console.log("input fired", inputVal);
  let recipeCard = document.getElementsByClassName("recipe-card");
  Array.from(recipeCard).forEach(function (element) {
    let recipeTitle = document.getElementsByTagName("h3")[0].innerText;
    console.log(recipeTitle);
    if (recipeTitle.includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});
//ingtediets
