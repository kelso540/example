
import {pickedFood, getSimilarFoods, getRecipeDetails} from "./getFood.js";
import {setSrc, starRating, setText, createNappend, detailsLink} from "./util-func.js";
const title = document.querySelector("#title");
const cookingSteps = document.querySelector("#second-container-JS");
const descript = document.querySelector("#description");
const ingredientsContainer = document.querySelector("#ingredients");
const rating = document.querySelector("#rating");
const similarFoodList = document.querySelector("#similar-food-list");
const preview = document.querySelector("#thumbnail");
const video = document.querySelector("#video");

let name;
let thumbnail;
let id;
let description;
let recipe = [];
let videoUrl;
let userRating = 0;
let ingredientsList = [];


async function getFoodInfo (){
    const mainFeature = await pickedFood ();
    const similars = await getSimilarFoods (mainFeature.id);
    const details = await getRecipeDetails (mainFeature.id);
    console.log(details.thumbnail);
    console.log(details.name);
    console.log(details.recipe);
    console.log(details.ingredients);
    console.log(similars);
    for (let i = 0; i < similars.length && i <3; i++){
        console.log(`This item's id is ${similars[i].id}`);
        createNappend ("a", similarFoodList, detailsLink(similars[i].name, similars[i].id));
    }
    name = mainFeature.name;
    thumbnail = mainFeature.thumbnail;
    id = mainFeature.id;
    description = mainFeature.description;
    videoUrl = mainFeature.video;
    mainFeature.recipe.forEach(function(instruction){
        recipe.push(instruction.display_text);
    })
    mainFeature.ingredients.forEach(function(ingredient){
        ingredientsList.push(ingredient.raw_text);
    });
    userRating = mainFeature.rating * 5;
    console.log(name);
    console.log(thumbnail);
    console.log(id);
    console.log(description);
    console.log(videoUrl);
    console.log(recipe);
    console.log(ingredients);
    console.log(userRating);
    console.log(mainFeature);


    const button = `<a href="details.html?id=${id}" id ="moreRecipeButton">More Details</a>`;
        moreBtn.innerHTML = button;

        
    setText(title, name);
    setText(descript, description);
    for (let steps in recipe){
        createNappend("p", cookingSteps, recipe[steps]);
    }
    for (let ingredients in ingredientsList){
        createNappend("p", ingredientsContainer, ingredientsList[ingredients]);
    }
    createNappend("p", rating, starRating(userRating));
    setSrc(preview, thumbnail);
    setSrc(video, videoUrl);
}   

getFoodInfo ();
