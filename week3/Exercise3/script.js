const form = document.getElementById("myForm");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();

    let nameError = document.getElementById("nameError");
    let emailError = document.getElementById("emailError");
    let passwordError = document.getElementById("passwordError");

    // Clear errors
    nameError.textContent = "";
    emailError.textContent = "";
    passwordError.textContent = "";

    let isValid = true;

    // Name validation
    if (name === "") {
        nameError.textContent = "Name is required";
        isValid = false;
    }

    // Email validation
    if (email === "") {
        emailError.textContent = "Email is required";
        isValid = false;
    } else if (!email.includes("@")) {
        emailError.textContent = "Invalid email format";
        isValid = false;
    }

    // Password validation
    if (password === "") {
        passwordError.textContent = "Password is required";
        isValid = false;
    }

    // Success
    if (isValid) {
        alert("Form submitted successfully!");
        form.reset();
    }
});