
const loginTab = document.getElementById("loginTab");
const signupTab = document.getElementById("signupTab");

const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

const message = document.getElementById("message");

// Switch to Sign Up
signupTab.addEventListener("click", () => {
    loginForm.hidden = true;
    signupForm.hidden = false;

    signupTab.classList.add("active");
    loginTab.classList.remove("active");

    message.textContent = "";
});

// Switch to Sign In
loginTab.addEventListener("click", () => {
    signupForm.hidden = true;
    loginForm.hidden = false;

    loginTab.classList.add("active");
    signupTab.classList.remove("active");

    message.textContent = "";
});

// Sign Up functionality
signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim().toLowerCase();
    const password = document.getElementById("signupPassword").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const existingUser = users.find(user => user.email === email);

    if (existingUser) {
        message.textContent = "Email already registered!";
        return;
    }

    const newUser = {
        name: name,
        email: email,
        password: password
    };

    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));

    message.textContent = "Account created successfully!";

    signupForm.reset();
});

// Sign In functionality
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim().toLowerCase();
    const password = document.getElementById("loginPassword").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const loggedInUser = users.find(user =>
        user.email === email && user.password === password
    );

    if (loggedInUser) {

        localStorage.setItem("currentUser", JSON.stringify({
            name: loggedInUser.name,
            email: loggedInUser.email
        }));

        message.textContent = "Login successful!";

        setTimeout(() => {
            window.location.href = "index.html";
        }, 1000);

    } else {
        message.textContent = "Invalid email or password!";
    }
});
