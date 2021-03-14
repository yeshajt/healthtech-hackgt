window.onload = async function() {
    const back_button = document.getElementById("goToRecipes");

    back_button.onclick = function() {
        window.location.href = "/html/recipie.html"
    }
}