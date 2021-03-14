//DON'T ADD THE LINE BELOW IN PLAIN JS, just Node
const fetch = require('node-fetch')


const url = "http://1faac51a2a99.ngrok.io"

const createUser = async (name, age, email, sex, password, restrictions) => {
    return new Promise(function (resolve, reject) {
        resolve(fetch(url + "/users/", {
            method: 'POST',
            headers: {
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
            console.log("CREATE USER METHOD: ", data)
            return data
        }))
    })
}

const loginUser = (email, password) => {
    return new Promise(function (resolve, reject) {
        resolve(fetch(url + "/users/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": email,
                "password": password
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

const getUserProfile = (token) => {
    return new Promise(function (resolve, reject) {
        resolve(fetch(url + "/users/me", {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        }).then((response) => response.json())
        .then((data) => {
            return data
        }))
    })
}

const getFoods = (token) => {
    return new Promise(function (resolve, reject) {
        resolve(fetch(url + "/foods", {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        }).then((response) => response.json())
        .then((data) => {
            return data
        }))
    })
}

const updateFoodAsEaten = (_id, token) => {
    return new Promise(function (resolve, reject) {
        resolve(fetch(url + "/foods/" + _id + "/eaten", {
            method: 'PATCH',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        }).then((response) => response.json())
        .then((data) => {
            return data
        }))
    })
}

const updateNewDay = (token) => {
    return new Promise(function (resolve, reject) {
        resolve(fetch(url + "/users/update", {
            method: 'PATCH',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        }).then((response) => response.json())
        .then((data) => {
            return data
        }))
    })
}

const deleteUser = (token) => {
    return new Promise(function (resolve, reject) {
        resolve(fetch(url + "/users/me", {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        }).then((response) => response.text())
    )})
}

const deleteFoodChoices = (token) => {
    return new Promise(function (resolve, reject) {
        resolve(fetch(url + "/foods", {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        }).then((response) => response.text()))
    })
}
const name = "Ninaad"
const age = 18
const email = "nlakshman16@gatech.edu"
const sex = "male"
const password = "Ninaad123"
const restrictions = "vegetarian"
var app = {token: null};
globalThis.app = app

//For Creating a User
createUser(name, age, email, sex, password, restrictions).then(async (value) => {
    //Think of this token as the password to get in, you get one when you create a user
    let token = value.token
    console.log("CREATE USER: " + token, email, password)
})

//For logging in a user
loginUser(email, password).then(async (user) => {
    //Essentially, when you login, you get a new password to do functions
    token = user.token
    console.log("LOGIN USER ONLY: ", token, email, password)
})

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
    })
})

//Update a Food as eaten
loginUser(email, password).then(async (user) => {
    //Essentially, when you login, you get a new password to do functions
    token = user.token
    console.log("UPDATE FOOD: ", token, email, password)

    //Have to make all calls to user and updates, etc. here
    addFoodChoices(token).then(async (foods) => {
        //an array of foods
        //to call a specific food item, use []
        //to call components in the food items, use Ex: foods[0].protein
        console.log("UPDATE FOOD: ", foods)
        
        //EX:
        let _id1 = ""
        let _id2 = ""
        let _id3 = ""
        //Only if foods are available will you update one
        if (!foods === undefined) {
            console.log(foods[0])
            _id1 = foods[0]._id
            _id2 = foods[1]._id
            _id3 = foods[2]._id
            //ID of the Food that has been checked
            let _idOfFood = {}
            //Some condition like when the _id1 button has been clicked
            if(true) {
                //Set this id to the food's id that has been clicked
                _idOfFood = _id2
            }
            //Have to make updateFoodAsEaten call in addFoodChoices or readFoodChoices
            updateFoodAsEaten(_idOfFood, token).then((dailyCaloriesEaten) => {
                console.log("UPDATE FOOD: ", dailyCaloriesEaten)
                //UPDATE STUFF HERE TO PAGE
            })
        }
    })
})

// Get a user profile
loginUser(email, password).then(async (user) => {
    //Essentially, when you login, you get a new password to do functions
    token = user.token
    console.log("USER PROFILE: ", token, email, password)
    getUserProfile(token).then((user) => {
        //a user object
        //to call components in the food items, use Ex: user.currentCalorieCount
        console.log("USER PROFILE: ", user)
        //UPDATE STUFF HERE TO PAGE
    })
})

// Get food choices
loginUser(email, password).then(async (user) => {
    //Essentially, when you login, you get a new password to do functions
    token = user.token
    console.log("FOOD CHOICES PROFILE: ", token, email, password)
    getFoods(token).then((foods) => {
        //an array of foods
        //to call a specific food item, use []
        //to call components in the food items, use Ex: foods[0].protein
        console.log("FOOD CHOICES: ", foods)
        //UPDATE STUFF HERE TO PAGE
    })
})

//Update to a new day
//For the demo: skipping a week, cutting 200 calories
loginUser(email, password).then(async (user) => {
    //Essentially, when you login, you get a new password to do functions
    token = user.token
    console.log("UPDATE TO NEW DAY: ", token, email, password)
    updateNewDay(token).then((user) => {
        //a user object
        //to call components in the food items, use Ex: user.currentCalorieCount
        console.log("UPDATE TO NEW DAY: ", user)
        //UPDATE STUFF HERE TO PAGE
    })
})

//Deletes user from database
loginUser(email, password).then(async (user) => {
    //Essentially, when you login, you get a new password to do functions
    token = user.token
    console.log(token)
    deleteUser(token).then((user) => {
        //Nothing is sent back
    })
})

//Deletes food choices for a user from database
loginUser(email, password).then(async (user) => {
    //Essentially, when you login, you get a new password to do functions
    token = user.token
    console.log(token)
    deleteFoodChoices(token).then((message) => {
        //Nothing is sent back
    })
})






// createUser(name, age, email, sex, password, restrictions).then(async (value) => {
//     //Think of this token as the password to get in, you get one when you create a user
//     let token = value.token
//     globalThis.app.token = token

//     //Have to make all calls to user and updates, etc. here
//     //console.log(value)
//     loginUser(email, password).then(async (user) => {
//         //Essentially, when you login, you get a new password to do functions
//         token = user.token
//         console.log(token)
    
//         //Have to make all calls to user and updates, etc. here
//         addFoodChoices(token).then(async (foods) => {
//             //an array of foods
//             //to call a specific food item, use []
//             //to call components in the food items, use Ex: foods[0].protein
//             console.log(foods)
            
//             //EX:
//             let _id1 = ""
//             let _id2 = ""
//             let _id3 = ""
//             //Only if foods are available will you update one
//             if (!foods === undefined) {
//                 console.log(foods[0])
//                 _id1 = foods[0]._id
//                 _id2 = foods[1]._id
//                 _id3 = foods[2]._id
//                 //ID of the Food that has been checked
//                 let _idOfFood = {}
//                 //Some condition like when the _id1 button has been clicked
//                 if(true) {
//                     //Set this id to the food's id that has been clicked
//                     _idOfFood = _id2
//                 }
//                 //Have to make updateFoodAsEaten call in addFoodChoices or readFoodChoices
//                 updateFoodAsEaten(_idOfFood, token).then((dailyCaloriesEaten) => {
//                     //console.log(dailyCaloriesEaten)
//                     getUserProfile(token).then((user) => {
//                         //a user object
//                         //to call components in the food items, use Ex: user.currentCalorieCount
//                         //console.log(user)
//                         getFoods(token).then((foods) => {
//                             //an array of foods
//                             //to call a specific food item, use []
//                             //to call components in the food items, use Ex: foods[0].protein
//                             //console.log(foods)
//                             //For the demo: skipping a week, cutting 200 calories
//                             updateNewDay(token).then((user) => {
//                                 //a user object
//                                 //to call components in the food items, use Ex: user.currentCalorieCount
//                                 //console.log(user)
//                             })
//                         })
//                     })
//                 })
//             }
//         })
    
//         //Deletes user from database... token becomes invalid
//         deleteUser(token).then((user) => {
//             //Nothing is sent back
//         })
    
//         //Deletes food choices for a user from database
//         deleteFoodChoices(token).then((message) => {
//             //Nothing is sent back
//         })
//     })
    
// })



