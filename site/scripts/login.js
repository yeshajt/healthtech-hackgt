//window.onload = async function() {
    const login_button = document.getElementById("login-button");
    const email_field = document.getElementById("login-username");
    const password_field = document.getElementById("login-password");
    const signup_button = document.getElementById("signup-button"); //delete if you don't use this
    const url = "http://1faac51a2a99.ngrok.io"
    //const url = "localhost:3000"
    window.onload = function() {
    console.log("hello")
    
    const loginUser = (email, password) => {
        return new Promise(function (resolve, reject) {
            // what is url??
            resolve(fetch(url + "/users/login", {
                mode: "no-cors",
                method: 'POST',
                headers: {
                    'Access-Control-Allow-Headers': 'Content-Type, Accept, Access-Control-Allow-Origin, Authorization',
                    'Access-Control-Allow-Origin':'http://1faac51a2a99.ngrok.io',
                    'Access-Control-Allow-Methods': 'OPTIONS, HEAD, DELETE, POST, GET, PATCH',
                    'Access-Control-Expose-Headers': '',
                    'Access-Control-Max-Age': "'21600'",
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
   
    
    login_button.onclick = async () => {
        var email = email_field.value;
        var password = password_field.value;
        console.log("EMAIL: ", email)

        //const user = await loginUser(email, password)
        const test = await fetch(url + '/test', {
            mode: 'no-cors',
            method: 'POST'
        })
        const body = await test
        console.log("BODY OF TEST: " + body)
        const user = await fetch(url + "/users/login", {
            mode: 'no-cors',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        })
        Promise.all([user]).then((userJson) => {
            console.log("USER JSON: ", userJson)
            token = userJson.token
            if ((Object.keys(userJson).length !== 0)) {
                window.location.href = 'html/tracker.html'
            } else {
                window.location.href = 'index.html'
            }
        })
    }
    
//     login_button.onclick = function() {
//         var email = email_field.value;
//         var password = password_field.value;
//         loginUser(email, password).then(async (user) => {
//             //Essentially, when you login, you get a new password to do functions
//             token = user.token
//             console.log("LOGIN USER ONLY: ", token, email, password)
//             if (!(user === {})) {
//                 window.location.href = '/html/tracker.html'
//             }
//         })
//     }

    signup_button.onclick = function() {
        window.location.href = '/html/signup.html'
    }
    }
