window.onload = async function() {
    const login_button = document.getElementById("login-button");
    const email_field = document.getElementById("login-username");
    const password_field = document.getElementById("login-password");
    const signup_button = document.getElementById("signup-button"); //delete if you don't use this
    const url = "http://1faac51a2a99.ngrok.io"
    
    const loginUser = (email, password) => {
        return new Promise(function (resolve, reject) {
            // what is url??    
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
            if (!(user === {})) {
                window.location.href = '/html/tracker.html'
                
            }
        })
    }

    signup_button.onclick = function() {
        window.location.href = '/html/signup.html'
    }

}
