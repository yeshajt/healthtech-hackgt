window.onload = async function() {
    const login_button = document.getElementById("login-button");
    const email_field = document.getElementById("login-username");
    const password_field = document.getElementById("login-password");
    const signup_button = document.getElementById("signup-button"); //delete if you don't use this
    
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
    
    login_button.onclick = function() {
        var email = email_field.value;
        var password = password_field.value;
        loginUser(email, password).then(async (user) => {
            //Essentially, when you login, you get a new password to do functions
            token = user.token
            console.log("LOGIN USER ONLY: ", token, email, password)
            //Make sure to add the next window location
        })
    }

    signup_button.onclick = function() {
        window.location.href = '/html/signup.html'
    }

}
