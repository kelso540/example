import accessKey from "./key.js";

let random = randNum ();

//Generates a random number - used for picking a random food.
function randNum (){
    return Math.floor(Math.random()*20)
}

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': accessKey,
		'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
	}
};

//Fetch data from the API
async function getData (){
    try{
        const data = await fetch('https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=under_30_minutes', options);
        const json = await data.json ();
        console.log(json);
        return json;
    }catch (err){
        return err;
    }
}

//Function that returns the main information we need from the API
async function pickedFood (){
    const foodlist = await getData();
    const food = foodlist.results[random];

    return {
        id: food.id, 
        thumbnail: food.thumbnail_url, 
        description: food.description, 
        video: food.original_video_url, 
        recipe: food.instructions, 
        rating: food.user_ratings.score, 
        name: food.name,
        ingredients: food.sections[0].components
    };
}

//Function to get similiar foods based on selected food
async function getSimilarFoods (pickedFoodId){
    try{
        const data = await fetch(`https://tasty.p.rapidapi.com/recipes/list-similarities?recipe_id=${pickedFoodId}`, options);
        const similarsList = await data.json();
        console.log(similarsList);
        return similarsList.results;
    }catch(err){
        return err;
    }

}

//Function to get the details of a recipe by Id
async function getRecipeDetails (foodId){
    try{
        const data = await fetch(`https://tasty.p.rapidapi.com/recipes/get-more-info?id=${foodId}`, options);
        const foodDetails = await data.json ();
        console.log(foodDetails);
        return {
            id: foodDetails.id, 
            thumbnail: foodDetails.thumbnail_url, 
            description: foodDetails.description, 
            video: foodDetails.original_video_url, 
            recipe: foodDetails.instructions, 
            rating: foodDetails.user_ratings.score, 
            name: foodDetails.name,
            ingredients: foodDetails.sections[0].components
        };
    }catch (err){
        return err;
    }
}

export {pickedFood, getSimilarFoods, getRecipeDetails};