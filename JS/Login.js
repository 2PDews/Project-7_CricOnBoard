document.addEventListener("DOMContentLoaded", () => {
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const signInButton = document.querySelector(".btn");
    const forgotPassword = document.querySelector(".forgot-password");
    const backButton = document.querySelector(".back");
    const passwordToggle = document.querySelector(".fa-eye");

    // Password visibility toggle
    passwordToggle.addEventListener("click", () => {
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            passwordToggle.classList.add("fa-eye-slash");
        } else {
            passwordInput.type = "password";
            passwordToggle.classList.remove("fa-eye-slash");
        }
    });

    // Sign In validation
    signInButton.addEventListener("click", () => {
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if (!email || !password) {
            alert("Please enter both Email and Password!");
            return;
        }

        // Simple email validation
        if (!/\S+@\S+\.\S+/.test(email)) {
            alert("Please enter a valid email address!");
            return;
        }

        // Example authentication logic (replace with real backend logic)
        if (email === "admin@example.com" && password === "admin123") {
            alert("Login successful!");
            window.location.href = "../Dashboard.html"; // Redirect to dashboard
        } else {
            alert("Invalid email or password. Try again!");
        }
    });

    // Forgot Password Click
    forgotPassword.addEventListener("click", () => {
        alert("Redirecting to password reset page...");
        window.location.href = "../ForgotPassword.html"; // Redirect to forgot password page
    });

    // Back Button Click
    backButton.addEventListener("click", () => {
        window.history.back();
    });
});
