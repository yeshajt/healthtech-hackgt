import {
    currRecipie,
    email,
    password
} from './global-variables.js'


window.onload = async function() {
    const meals_wrapper_div = document.getElementById("meals-wrapper");
    const back_button = document.getElementById("back-button");

    const url = "http://1faac51a2a99.ngrok.io"


    back_button.onclick = function() {
        window.location.href = "/html/tracker.html"
    }
    
    const loginUser = (email, password) => {
    return new Promise(function (resolve, reject) {
        resolve(fetch(url + "/users/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:8080'
            },
            body: JSON.stringify({
                "email": "ninaadlakshman@gmail.com",
                "password": "Ninaad123"
            })
        }).then((response) => response.json())
            .then((data) => {
                return data
            }))
        })
    }

    const addFoodChoices = (token) => {
        return new Promise(function (resolve, reject) {
            resolve(fetch(url + "/foods/", {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "name": name,
                    "age": age,
                    "email": email,
                    "sex": sex,
                    "password": password,
                    "restrictions": restrictions
                })
            }).then((response) => response.json())
            .then((data) => {
                return data
            }))
        })
    }
    
    //Have to make all calls to user and updates, etc. here
    //Adding food choices
    loginUser(email, password).then(async (user) => {
    //Essentially, when you login, you get a new password to do functions
        token = user.token
        console.log("ADD FOOD: ", token, email, password)

        //Have to make all calls to user and updates, etc. here
        addFoodChoices(token).then(async (foods) => {
            //an array of foods
            //to call a specific food item, use []
            //to call components in the food items, use Ex: foods[0].protein
            console.log("FOOD ITEMS: " + foods)
            //UPDATE STUFF HERE TO PAGE
            foods.forEach(function (food) {
                let foodName = food.label
                let src = food.image
                let cost = food.price

                var container = Document.createElement("div");
                container.className = "meal-container";
                var containerWrapper = Document.createElement("div");
                containerWrapper.className = "containerWrapper";
                container.appendChild(containerWrapper);
                    
                var img = Document.createElement("img");
                img.src = src;
                img.className = "meal-image";
                containerWrapper.appendChild(img);

                var bottom_container = Document.createElement("div");
                bottom_container.className = "bottom-container";
                containerWrapper.appendChild(bottom_container);

                var info_container = Document.createElement("div");
                info_container.className = "info-container";
                bottom_container.appendChild(info_container);

                var name = Document.createElement("div");
                name.className = "food-name";
                name.innerHTML = foodName;
                info_container.appendChild(name);

                var cost_item = Document.createElement("div");
                cost_item.className = "food-cost";
                cost_item.innerHTML = cost;
                info_container.appendChild(cost_item);

                var checkbox = Document.createElement("input");
                checkbox.type = "checkbox"
                checkbox.className = "food-eaten"
                checkbox.value = "food-eaten"
                bottom_container.appendChild(checkbox);
                
                meals_wrapper_div.appendChild(container)
        })
    })
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


    })
}
