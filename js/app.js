// --- REGISTER NEW USER ---
function registerUser(event) {
  event.preventDefault();

  const name = document.getElementById("fullname").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const role = document.getElementById("role").value;

  if (!name || !email || !password || !role) {
    alert("Please fill in all required fields.");
    return;
  }

  // Get existing users or create a new list
  let users = JSON.parse(localStorage.getItem("users")) || [];

  // Check if user already exists
  if (users.find(user => user.email === email)) {
    alert("This email is already registered!");
    return;
  }

  // Add new user
  users.push({ name, email, password, role });
  localStorage.setItem("users", JSON.stringify(users));

  alert("Registration successful! You can now log in.");
  window.location.href = "login.html";
}

// --- LOGIN USER ---
function loginUser(event) {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const role = document.getElementById("role").value;

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(u => u.email === email && u.password === password && u.role === role);

  if (!user) {
    alert("Invalid email, password, or role.");
    return;
  }

  // Save logged-in user
  localStorage.setItem("loggedInUser", JSON.stringify(user));

  // Redirect based on role
  if (role === "student") {
    window.location.href = "student-dashboard.html";
  } else if (role === "supervisor") {
    window.location.href = "supervisor-dashboard.html";
  } else {
    window.location.href = "admin-dashboard.html";
  }
}

// --- CHECK LOGIN STATUS ---
function checkLogin() {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!user) {
    alert("You must log in first!");
    window.location.href = "login.html";
  } else {
    // Display user info
    const info = document.getElementById("user-info");
    if (info) {
      info.innerHTML = `Welcome, <strong>${user.name}</strong> (${user.role.toUpperCase()})`;
    }
  }
}

// --- LOGOUT ---
function logoutUser() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
}
