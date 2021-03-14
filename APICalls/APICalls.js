//THIS IS NOT REQUIRED IN PLAIN JS, just Node
const fetch = require('node-fetch')


const url = "http://1faac51a2a99.ngrok.io"
let authToken = ""
let user = {}

const createUser = (name, age, email, sex, password, restrictions) => {
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
            user = data
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
            user = data
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
            user = data
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
            user = data
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
            user = data
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
            user = data
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
            console.log(data)
            return data
        }))
    })
}

const deleteUser = (token) => {
    return new Promise(function (resolve, reject) {
        resolve(fetch(url + "/users/me", {
            method: 'delete',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        }).then((response) => response.json())
        .then((data) => {
            console.log(data)
            return data
        }))
    })
}


const name = "Ninaad"
const age = 18
const email = "nlakshman12@gatech.edu"
const sex = "male"
const password = "Ninaad123"
const restrictions = "vegetarian"
createUser(name, age, email, sex, password, restrictions).then((value) => {
    //Think of this token as the password to get in, you get one when you create a user
    let token = value.token

    //Have to make all calls to user and updates, etc. here
    console.log(value)
    
})

loginUser(email, password).then((user) => {
    //Essentially, when you login, you get a new password to do functions
    token = user.token

    //Have to make all calls to user and updates, etc. here
    addFoodChoices(token).then((foods) => {
        //an array of foods
        //to call a specific food item, use []
        //to call components in the food items, use Ex: foods[0].protein
        console.log(foods)
        
        //EX:
        const _id1 = foods[0]._id
        const _id2 = foods[1]._id
        const _id3 = foods[2]._id

        //ID of the Food that has been checked
        let _id = {}
        //Some condition like when the _id1 button has been clicked
        if(true) {
            //Set this id to the food's id that has been clicked
            _id = _id1
        }
        //Have to make update call in addFoodChoices or readFoodChoices
        updateFoodAsEaten(_id, token).then((dailyCaloriesEaten) => {
            console.log(dailyCaloriesEaten)
        })
    })

    getUserProfile(token).then((user) => {
        //a user object
        //to call components in the food items, use Ex: user.currentCalorieCount
        console.log(user)
    })

    getFoods(token).then((foods) => {
        //an array of foods
        //to call a specific food item, use []
        //to call components in the food items, use Ex: foods[0].protein
        console.log(foods)
    })

    //For the demo: skipping a week, cutting 200 calories
    updateNewDay(token).then((user) => {
        //a user object
        //to call components in the food items, use Ex: user.currentCalorieCount
        console.log(user)
    })

    //Deletes user from database... token becomes invalid
    deleteUser(token).then((user) => {
        //a user object
        console.log(user)
    })

    //Deletes food choices for a user from database
    deleteFoodChoices(token).then((user) => {
        //a user object
        console.log(user)
    })
})
