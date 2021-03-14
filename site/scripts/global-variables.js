
// TO DO PUT THE INGREDIENTS, NUTRITION INFO, AND INSTRUCTIONS


var currRecipie = {
    'name': '',
    'servingSize': '',
    'img_src': '',
    'cost': '',
}

function setCurrRecipie(imgLink, foodName, servingSize, cost) {
    currRecipie.name = foodName;
    currRecipie.servingSize = servingSize;
    currRecipie.img_src = imgLink;
    currRecipie.cost = cost;
}
