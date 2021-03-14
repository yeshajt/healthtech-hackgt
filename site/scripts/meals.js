import {
    currRecipie
} from './global-variables.js'

window.onload = async function() {
    const meals_wrapper_div = Document.getElementById("meals-wrapper");
    const back_button = Document.getElementById("back-button");


    back_button.onclick = function() {
        window.location.href = "/html/tracker.html"
    }

    // logic:
    // for each recipie from the call:
        // var imgLink = link from api call;
        // var foodName = name from api call;
        // var servingSize = size from api call;
        // var cost = cost from api call;

        // variables for nutrition, ingredients, and instructions just not sure how they're set up

        // setCurrRecipie(imgLink, foodName, servingSize, cost, etc.)


        // var container = Document.createElement("div");
        // container.className = "meal-container";
        // var containerWrapper = Document.createElement("div");
        // containerWrapper.className = "containerWrapper";
        // container.appendChild(containerWrapper);


        // var img = Document.createElement("img");
        // img.src = link from api call
        // containerWrapper.appendChild(img);

        // var bottom_container = Document.createElement("div");
        // bottom_container.className = "bottom-container";
        // containerWrapper.appendChild(bottom_container);

        // var info_container = Document.createElement("div");
        // info_container.className = "info-container";
        // bottom_container.appendChild(info_container);
        
        // var name = Document.createElement("div");
        // name.className = "food-name";
        // name.innerHTML = foodName;
        // info_container.appendChild(name);
        
        // var cost = Document.createElement("div");
        // cost.className = "food-cost";
        // cost.innerHTML = cost;
        // info_container.appendChild(cost);

        // var checkbox = Document.createElement("input");
        // checkbox.type = "checkbox"
        // checkbox.className = "food-eaten"
        // bottom_container.appendChild(checkbox);


}
