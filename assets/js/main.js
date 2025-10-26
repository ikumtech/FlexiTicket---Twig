// Simple authentication simulation using localStorage

function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value.trim();
  const error = document.getElementById("login-error");

  if (!email || !password) {
    showError(error, "Email and password are required.");
    return false;
  }

  const user = JSON.parse(localStorage.getItem("flexi_user"));
  if (!user || user.email !== email || user.password !== password) {
    showError(error, "Invalid credentials. Please try again.");
    return false;
  }

  localStorage.setItem("ticketapp_session", "valid");
  window.location.href = "?page=dashboard";
}

function handleSignup(event) {
  event.preventDefault();
  const email = document.getElementById("signup-email").value.trim();
  const password = document.getElementById("signup-password").value.trim();
  const confirm = document.getElementById("signup-confirm").value.trim();
  const error = document.getElementById("signup-error");

  if (!email || !password || !confirm) {
    showError(error, "All fields are required.");
    return false;
  }

  if (password !== confirm) {
    showError(error, "Passwords do not match.");
    return false;
  }

  const user = { email, password };
  localStorage.setItem("flexi_user", JSON.stringify(user));
  localStorage.setItem("ticketapp_session", "valid");
  window.location.href = "?page=dashboard";
}

function showError(el, message) {
  el.textContent = message;
  el.style.display = "block";
}
