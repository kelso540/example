import {getSimilarFoods, getRecipeDetails} from "./getFood.js";
import {setSrc, starRating, setText, createNappend, detailsLink} from "./util-func.js";

const video = document.querySelector("#video");
const title = document.querySelector("#title");
const cookingSteps = document.querySelector("#second-container-JS");
const descript = document.querySelector("#description");
const ingredientsContainer = document.querySelector("#ingredients");
const rating = document.querySelector("#rating");
const similarFoodList = document.querySelector("#similar-food-list");
const preview = document.querySelector("#thumbnail");

let currentId;
let recipe = [];
let ingredientsList = [];

window.onload = function() {
  const urlParams = new URLSearchParams (window.location.search);
  currentId = urlParams.get("id");
  console.log("currentId: " + currentId);
  loadInfo();

}

//Populate the webpage with the correct details
async function loadInfo (){
    const food = await getRecipeDetails(currentId);
    const similars = await getSimilarFoods (food.id);
    for (let i = 0; i < similars.length && i <3; i++){
        console.log(`This item's id is ${similars[i].id}`);
        createNappend ("a", similarFoodList, detailsLink(similars[i].name, similars[i].id));
    }
    setText(title, food.name);
    setSrc(video, food.video);
    setText(descript, food.description);
    food.recipe.forEach(function(instruction){
        recipe.push(instruction.display_text);
    })
    for (let steps in recipe){
        createNappend("p", cookingSteps, recipe[steps]);
    }
    food.ingredients.forEach(function(ingredient){
        ingredientsList.push(ingredient.raw_text);
    });
    for (let ingredients in ingredientsList){
        createNappend("p", ingredientsContainer, ingredientsList[ingredients]);
    }
    createNappend("p", rating, starRating(food.rating*5));
    setSrc(preview, thumbnail);
    setSrc(video, videoUrl);

}

loadInfo();