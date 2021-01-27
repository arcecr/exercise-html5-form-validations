const getInput = (id) => document.getElementById(id);

const regexValidators = {
    name: /[a-zA-Z]/,
    creditCard: /[0-9]{13,16}/,
    cvc: /[0-9]{3}/,
    postalCode: /[0-9]{5}/
}

const testInputRegex = (input, regex, callback) => {
    if (regex.test(input.value)) {
        if (input.classList.contains("is-invalid"))
            input.classList.remove("is-invalid")
        input.classList.add("is-valid");
        callback(true)
    } else {
        input.classList.add("is-invalid");
        callback(false)
    }
}

const myForm = document.getElementById("myForm");

myForm.addEventListener("submit", (e) => {
    e.preventDefault()

    let errors = [];

    const creditCard = getInput("inputCreditCard");
    const cvc = getInput("inputCVC");
    const amount = getInput("inputAmount");
    const firstName = getInput("inputFirstName");
    const lastName = getInput("inputLastName");
    const city = getInput("inputCity");
    const state = getInput("inputState");
    const postalCode = getInput("inputPostalCode");
    const message = getInput("inputMessage");

    testInputRegex(creditCard, regexValidators["creditCard"], result => !result ? errors.push("Please enter a valid credit card number.") : false)
    testInputRegex(cvc, regexValidators["cvc"], result => !result ? errors.push("Please enter a valid CVC.") : false);
    testInputRegex(firstName, regexValidators["name"], result => !result ? errors.push("Please enter a valid first name.") : false)
    testInputRegex(lastName, regexValidators["name"], result => !result ? errors.push("Please enter a valid last name.") : false)
    testInputRegex(postalCode, regexValidators["postalCode"], result => !result ? errors.push("Please enter a valid zip.") : false)
    testInputRegex(city, regexValidators["name"], result => !result ? errors.push("Please enter a valid city.") : false)

    /////////////////////////////////////////////////////////////////////////////////////////////////

    if (typeof(parseInt(amount.value)) == "number") {
        if (amount.classList.contains("is-invalid")) amount.classList.remove("is-invalid");
        amount.classList.add("is-valid");
    } else {
        amount.classList.add("is-invalid");
        errors.push("Please enter a numeric value in amount.")
    }

    if (typeof(message.value) == "string") {
        if (message.classList.contains("is-invalid")) message.classList.remove("is-invalid");
        message.classList.add("is-valid");
    } else {
        message.classList.add("is-invalid");
        errors.push("Please enter a text in message.")
    }

    if (typeof(parseInt(creditCard.value)) == "number") {
        if (creditCard.classList.contains("is-invalid")) creditCard.classList.remove("is-invalid");
        creditCard.classList.add("is-valid");
    } else {
        creditCard.classList.add("is-invalid");
        errors.push("Please enter a numeric value in credit card.")
    }

    if (state.value && typeof(parseInt(state.value)) == "number") {
        state.classList.add("is-valid");
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////

    const errList = document.getElementById("errorsList");
    errList.parentNode.classList.add("d-none");

    if (errors.length) {
        errList.innerHTML = "";
        errors.forEach((err) => {
            const errItem = document.createElement("li");
            errItem.innerHTML = err;

            errList.appendChild(errItem);

            errList.parentNode.classList.remove("d-none");
            errList.parentNode.classList.add("d-block");
        });
    }

});