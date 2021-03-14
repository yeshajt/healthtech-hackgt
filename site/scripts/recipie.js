import {
    currRecipie
} from './global-variables.js'


window.onload = async function() {
    const recipie_name_div = Document.getElementById("recipie-name");
    const serving_size_div = Document.getElementById("serving-size");
    const image_div = Document.getElementById("recipie-image");
    const ingredients_div = Document.getElementById("recipie-ingredients");
    const instructions_div = Document.getElementById("recipie-instructions");
    const nutrional_div = Document.getElementById("nutritional-info");
    const cost_div = Document.getElementById("cost-info");

    const back_button = Document.getElementById("back-button");


    recipie_name_div.innerHTML = currRecipie.name;
    serving_size_div.innerHTML = currRecipie.servingSize;
    
    var img = Document.createElement('img')
    img.src = currRecipie.img_src;
    img.alt = "Picture of " + currRecipie.name;
    image_div.appendChild(img);

    cost_div = currRecipie.cost;

    // not sure how the lists for ingredients, instructions, and nutritional are given.
    // nutritional might need separate divs for each type of nutrition


    back_button.onclick = function() {
        window.location.href = "/html/meals.html"
    }
}