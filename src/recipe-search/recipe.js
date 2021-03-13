const API_KEY = "49f53a154deef1d48b72f23c300dd1bd"
const API_ID = "66b20be7"
const request = require('sync-request')
const { find } = require('../models/food')

const findRecipe = (searchTerm, minCalorie, maxCalorie, restrictions) => {
    let recipeData = {
        label: "",
        caloriesPerServing: ""
    }
    let url = "https://api.edamam.com/search?"
    url += "q=" + searchTerm + "&"
    url += "app_id=" + API_ID + "&"
    url += "app_key=" + API_KEY + "&"
    url += "calories=" + minCalorie + "-" + maxCalorie + "&"
    if (restrictions) {
        url += "health=" + restrictions + "&"
    }
    const res = request('GET', url);
    const body = JSON.parse(res.getBody('utf8'))

    //HOW MUCH IN ONE SERVING
    const randItem = Math.floor(Math.random() * 10)
    recipeData.label = body.hits[randItem].recipe.label
    recipeData.caloriesPerServing = (body.hits[randItem].recipe.calories / body.hits[randItem].recipe.yield)
    return recipeData;
}

module.exports = findRecipe