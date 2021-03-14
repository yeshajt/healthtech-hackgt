window.onload = async function() {
    const login_button = document.getElementById("login-button");
    const username_field = document.getElementById("login-username");
    const password_field = document.getElementById("login-password");
    const signup_button = document.getElementById("signup-button"); //delete if you don't use this

    login_button.onclick = function() {
        var username = username_field.value;
        var password = password_field.value;
    }

    signup_button.onclick = function() {
        window.location.href = '/html/signup.html'
    }

}