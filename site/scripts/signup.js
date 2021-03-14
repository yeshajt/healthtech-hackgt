window.onload = async function() {
    const email_div = Document.getElementById("login-username");
    const password_div = Document.getElementById("login-password");
    const age_div = Document.getElementById("user-age");

    const sex_male_div = Document.getElementById("sex-male");
    const sex_female_div = Document.getElementById("sex-female");

    const peanut_div = Document.getElementById("allergy-peanut");
    const dairy_div = Document.getElementById("allergy-diary");
    const gluten_allergy_div = Document.getElementById("allergy-gluten");
    const shellfish_div = Document.getElementById("allergy-shellfish");
    const allergy_other_div = Document.getElementById("allergy-other");

    const gluten_dietary_div = Document.getElementById("dietary-gluten");
    const pescatarian_div = Document.getElementById("dietary-pescatarian");
    const vegetarian_div = Document.getElementById("dietary-vegetarian");
    const vegan_div = Document.getElementById("dietary-vegan");
    const dietary_other_div = Document.getElementById("dietary-other-label");

    const starting_default_div = Document.getElementById("starting-default");
    const starting_custom_div = Document.getElementById("starting-custom");
    const starting_custom_fields = Document.getElementById("starting-custom-fields");

    const ending_default_div = Document.getElementById("ending-default");
    const ending_custom_div = Document.getElementById("ending-custom");
    const ending_custom_fields = Document.getElementById("ending-custom-fields");

    const daily_budget_div = Document.getElementById("daily-budget");
    
    const submit_button_div = Document.getElementById("signup-submit");


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
            starting_custom_fields.checked = false;
            starting_custom_fields.classList.add("not-visible");
        } else {
            starting_custom_fields.classList.remove("not-visible");
            starting_custom_fields.checked = true;
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
            ending_custom_fields.checked = false;
            ending_custom_fields.classList.add("not-visible");
        } else {
            ending_custom_fields.classList.remove("not-visible");
            ending_custom_fields.checked = true;
        }
    }

    submit_button_div.onclick = function() {


        window.location.href = '/html/home.html'
    }

}