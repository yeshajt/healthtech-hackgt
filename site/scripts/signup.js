window.onload = async function() {
    const email_div = document.getElementById("login-username");
    const password_div = document.getElementById("login-password");
    const age_div = document.getElementById("user-age");

    const sex_male_div = document.getElementById("sex-male");
    const sex_female_div = document.getElementById("sex-female");

    const peanut_div = document.getElementById("allergy-peanut");
    const dairy_div = document.getElementById("allergy-diary");
    const gluten_allergy_div = document.getElementById("allergy-gluten");
    const shellfish_div = document.getElementById("allergy-shellfish");
    const allergy_other_div = document.getElementById("allergy-other");

    const gluten_dietary_div = document.getElementById("dietary-gluten");
    const pescatarian_div = document.getElementById("dietary-pescatarian");
    const vegetarian_div = document.getElementById("dietary-vegetarian");
    const vegan_div = document.getElementById("dietary-vegan");
    const dietary_other_div = document.getElementById("dietary-other-label");

    const starting_default_div = document.getElementById("starting-default");
    const starting_custom_div = document.getElementById("starting-custom");
    const starting_custom_fields = document.getElementById("starting-custom-fields");

    const ending_default_div = document.getElementById("ending-default");
    const ending_custom_div = document.getElementById("ending-custom");
    const ending_custom_fields = document.getElementById("ending-custom-fields");

    const daily_budget_div = document.getElementById("daily-budget");
    
    const submit_button_div = document.getElementById("signup-submit");


    starting_custom_div.onclick = function() {
        if (starting_custom_div.checked == true) {
            starting_custom_fields.classList.remove("not-visible");
            starting_default_div.checked = false;
        } else {
            starting_custom_fields.classList.add("not-visible");
            starting_default_div.checked = true;
        }
    }

    starting_default_div.onclick = function() {
        if (starting_default_div.checked == true) {
            starting_custom_div.checked = false;
            starting_custom_fields.classList.add("not-visible");
        } else {
            starting_custom_fields.classList.remove("not-visible");
            starting_custom_div.checked = true;
        }
    }

    ending_custom_div.onclick = function() {
        if (ending_custom_div.checked == true) {
            ending_custom_fields.classList.remove("not-visible");
            ending_default_div.checked = false;
        } else {
            ending_custom_fields.classList.add("not-visible");
            ending_default_div.checked = true;
        }
    }

    ending_default_div.onclick = function() {
        if (ending_default_div.checked == true) {
            ending_custom_div.checked = false;
            ending_custom_fields.classList.add("not-visible");
        } else {
            ending_custom_fields.classList.remove("not-visible");
            ending_custom_div.checked = true;
        }
    }

    submit_button_div.onclick = function() {


        window.location.href = 'html/tracker.html'
    }

}