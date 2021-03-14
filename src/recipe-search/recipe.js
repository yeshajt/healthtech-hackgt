const API_KEY = "49f53a154deef1d48b72f23c300dd1bd"
const API_ID = "66b20be7"
const request = require('sync-request')
const { find } = require('../models/food')

const findRecipe = (searchTerm, minCalorie, maxCalorie, restrictions) => {
    let recipeData = {
        label: "",
        caloriesPerServing: "",
        fat: 0,
        protein: 0,
        carb: 0,
        sugar: 0,
        ingredients: "",
        image: ""
    }
    let url = "https://api.edamam.com/search?"
    url += "q=" + searchTerm + "&"
    url += "app_id=" + API_ID + "&"
    url += "app_key=" + API_KEY + "&"
    url += "calories=" + minCalorie + "-" + maxCalorie + "&"
    url += "diet=" + "balanced" + "&"
    if (restrictions) {
        url += "health=" + restrictions + "&"
    }
    url += "imageSize=" + "SMALL" + "&"
    const res = request('GET', url);
    const body = JSON.parse(res.getBody('utf8'))

    //HOW MUCH IN ONE SERVING
    const randItem = Math.floor(Math.random() * 10)
    if (!body.hits[randItem]) {
        console.log("Error, no food item")
        randItem = 0
    }
    recipeData.label = body.hits[randItem].recipe.label
    recipeData.caloriesPerServing = Math.floor((body.hits[randItem].recipe.calories / body.hits[randItem].recipe.yield))
    recipeData.fat = Math.floor(body.hits[randItem].recipe.totalNutrients.FAT.quantity)
    recipeData.carb = Math.floor(body.hits[randItem].recipe.totalNutrients.CHOCDF.quantity)
    recipeData.sugar = Math.floor(body.hits[randItem].recipe.totalNutrients.SUGAR.quantity)
    recipeData.protein = Math.floor(body.hits[randItem].recipe.totalNutrients.PROCNT.quantity)
    recipeData.image = body.hits[randItem].recipe.image

    let ingredients = ""
    body.hits[randItem].recipe.ingredientLines.forEach((val) => {
        ingredients += val + ", "
    })
    ingredients = ingredients.substring(0, ingredients.length - 2)
    recipeData.ingredients = ingredients
    return recipeData;
}

module.exports = findRecipe