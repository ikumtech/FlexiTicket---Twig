// Authentication simulation using localStorage

function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value.trim();
  const error = document.getElementById("login-error");

  error.style.display = "none";

  const user = JSON.parse(localStorage.getItem("flexi_user"));

  if (!email || !password) {
    return showError(error, "Email and password are required.");
  }

  if (!user || user.email !== email || user.password !== password) {
    return showError(error, "Invalid credentials. Try again.");
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

  error.style.display = "none";

  if (!email || !password || !confirm) {
    return showError(error, "All fields are required.");
  }

  if (password !== confirm) {
    return showError(error, "Passwords do not match.");
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


// ==============================
// LOGIN HANDLER
// ==============================
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("loginForm");
  const errorBox = document.getElementById("loginError");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();

      if (!email || !password) {
        errorBox.textContent = "Please enter both email and password.";
        return;
      }

      // Retrieve stored user
      const user = JSON.parse(localStorage.getItem("flexi_user"));

      if (!user || user.email !== email || user.password !== password) {
        errorBox.textContent = "Invalid email or password.";
        return;
      }

      // Successful login — create session
      localStorage.setItem("ticketapp_session", "true");

      // Redirect to dashboard
      window.location.href = "?page=dashboard";
    });
  }
});

// ==============================
// SIGNUP HANDLER
// ==============================
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("signupForm");
  const errorBox = document.getElementById("signupError");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();
      const confirm = document.getElementById("confirm").value.trim();

      if (!email || !password || !confirm) {
        errorBox.textContent = "Please fill in all fields.";
        return;
      }

      if (password !== confirm) {
        errorBox.textContent = "Passwords do not match.";
        return;
      }

      // Store new user
      localStorage.setItem(
        "flexi_user",
        JSON.stringify({ email, password })
      );

      // Create session
      localStorage.setItem("ticketapp_session", "true");

      // Redirect to dashboard
      window.location.href = "?page=dashboard";
    });
  }
});

// Logout user
function handleLogout() {
  localStorage.removeItem("ticketapp_session");
  window.location.href = "?page=login";
}

// Route protection — redirect if not authenticated
document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const page = urlParams.get("page");

  const session = localStorage.getItem("ticketapp_session");

  // Protect dashboard and tickets
  if ((page === "dashboard" || page === "tickets") && !session) {
    alert("Your session has expired. Please log in again.");
    window.location.href = "?page=login";
  }
});


// -------------------- Ticket CRUD Logic --------------------

function getTickets() {
  return JSON.parse(localStorage.getItem("tickets")) || [];
}

function saveTickets(tickets) {
  localStorage.setItem("tickets", JSON.stringify(tickets));
}

// Create Ticket
function handleCreateTicket(event) {
  event.preventDefault();

  const title = document.getElementById("ticket-title").value.trim();
  const status = document.getElementById("ticket-status").value;
  const desc = document.getElementById("ticket-desc").value.trim();
  const error = document.getElementById("ticket-error");

  error.style.display = "none";

  if (!title || !status) {
    return showError(error, "Title and status are required.");
  }

  if (!["open", "in_progress", "closed"].includes(status)) {
    return showError(error, "Invalid status value.");
  }

  const tickets = getTickets();
  const newTicket = {
    id: Date.now(),
    title,
    status,
    desc,
  };
  tickets.push(newTicket);
  saveTickets(tickets);

  renderTickets();
  event.target.reset();
}

// Render Tickets
function renderTickets() {
  const container = document.getElementById("ticket-container");
  if (!container) return;

  const tickets = getTickets();
  container.innerHTML = "";

  if (tickets.length === 0) {
    container.innerHTML = "<p>No tickets available.</p>";
    return;
  }

  tickets.forEach((t) => {
    const card = document.createElement("div");
    card.className = "ticket-card";
    card.innerHTML = `
      <div class="ticket-info">
        <h3>${t.title}</h3>
        <span class="status ${t.status}">${t.status.replace("_", " ")}</span>
        <p>${t.desc || ""}</p>
      </div>
      <div class="ticket-actions">
        <button class="btn ghost" onclick="editTicket(${t.id})">Edit</button>
        <button class="btn danger" onclick="deleteTicket(${t.id})">Delete</button>
      </div>
    `;
    container.appendChild(card);
  });
}

// Edit Ticket
function editTicket(id) {
  const tickets = getTickets();
  const ticket = tickets.find((t) => t.id === id);
  if (!ticket) return;

  const newTitle = prompt("Edit Title:", ticket.title);
  const newStatus = prompt(
    "Edit Status (open, in_progress, closed):",
    ticket.status
  );
  const newDesc = prompt("Edit Description:", ticket.desc || "");

  if (!newTitle || !newStatus) {
    alert("Title and Status are required.");
    return;
  }

  if (!["open", "in_progress", "closed"].includes(newStatus)) {
    alert("Invalid status.");
    return;
  }

  ticket.title = newTitle;
  ticket.status = newStatus;
  ticket.desc = newDesc;
  saveTickets(tickets);
  renderTickets();
}

// Delete Ticket
function deleteTicket(id) {
  if (!confirm("Are you sure you want to delete this ticket?")) return;

  let tickets = getTickets();
  tickets = tickets.filter((t) => t.id !== id);
  saveTickets(tickets);
  renderTickets();
}

// Load tickets when viewing the tickets page
document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get("page") === "tickets") {
    renderTickets();
  }
});

// Simple mobile nav toggle
document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.getElementById("menuToggle");
  const nav = document.querySelector(".nav-links");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("open");
    });
  }
});

// ==============================
// DASHBOARD LOGIC
// ==============================
document.addEventListener("DOMContentLoaded", function () {
  // If not on dashboard, skip
  if (!document.querySelector(".dashboard")) return;

  const nameBox = document.getElementById("welcomeName");
  const logout = document.getElementById("logoutBtn");
  const totalEl = document.getElementById("totalTickets");
  const openEl = document.getElementById("openTickets");
  const progEl = document.getElementById("progressTickets");
  const closedEl = document.getElementById("closedTickets");

  // --- check session ---
  const session = localStorage.getItem("ticketapp_session");
  const user = JSON.parse(localStorage.getItem("flexi_user"));

  if (!session) {
    window.location.href = "?page=login";
    return;
  }

  // welcome name
  if (user?.email && nameBox) {
    const first = user.email.split("@")[0];
    nameBox.textContent = `Welcome, ${first}!`;
  }

  // --- ticket stats ---
  const tickets = JSON.parse(localStorage.getItem("tickets")) || [];
  const total = tickets.length;
  const open = tickets.filter(t => t.status === "open").length;
  const progress = tickets.filter(t => t.status === "in_progress").length;
  const closed = tickets.filter(t => t.status === "closed").length;

  totalEl.textContent = total;
  openEl.textContent = open;
  progEl.textContent = progress;
  closedEl.textContent = closed;

  // --- logout ---
  if (logout) {
    logout.addEventListener("click", () => {
      localStorage.removeItem("ticketapp_session");
      window.location.href = "/";
    });
  }
});


// ==============================
// TICKET MANAGEMENT LOGIC
// ==============================
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("ticketForm");
  const list = document.getElementById("ticketList");
  const errorBox = document.getElementById("formError");

  if (!form || !list) return;

  // --- Load existing tickets ---
  function loadTickets() {
    const tickets = JSON.parse(localStorage.getItem("tickets")) || [];
    renderTickets(tickets);
  }

  function renderTickets(tickets) {
    if (!tickets.length) {
      list.innerHTML = `<p style="text-align:center; color:#777;">No tickets yet. Create one above!</p>`;
      return;
    }

    list.innerHTML = tickets
      .map(
        (t, i) => `
        <div class="ticket-card" data-index="${i}">
          <div class="ticket-info">
            <h3>${t.title}</h3>
            <span class="status-tag status-${t.status}">${t.status.replace("_", " ")}</span>
            ${
              t.description
                ? `<p>${t.description}</p>`
                : `<p style="color:#aaa;">No description</p>`
            }
          </div>
          <div class="ticket-actions">
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
          </div>
        </div>
      `
      )
      .join("");
  }

  // --- Add ticket ---
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    errorBox.textContent = "";

    const title = document.getElementById("title").value.trim();
    const status = document.getElementById("status").value.trim();
    const description = document.getElementById("description").value.trim();

    if (!title || !status) {
      errorBox.textContent = "Title and status are required.";
      return;
    }

    if (!["open", "in_progress", "closed"].includes(status)) {
      errorBox.textContent = "Invalid status value.";
      return;
    }

    const tickets = JSON.parse(localStorage.getItem("tickets")) || [];
    tickets.push({ title, status, description });
    localStorage.setItem("tickets", JSON.stringify(tickets));
    form.reset();
    loadTickets();
  });

  // --- Edit & Delete actions ---
  list.addEventListener("click", (e) => {
    const card = e.target.closest(".ticket-card");
    if (!card) return;

    const index = card.dataset.index;
    const tickets = JSON.parse(localStorage.getItem("tickets")) || [];

    if (e.target.classList.contains("delete-btn")) {
      if (confirm("Are you sure you want to delete this ticket?")) {
        tickets.splice(index, 1);
        localStorage.setItem("tickets", JSON.stringify(tickets));
        loadTickets();
      }
    }

    if (e.target.classList.contains("edit-btn")) {
      const t = tickets[index];
      const newTitle = prompt("Edit title:", t.title);
      const newStatus = prompt("Edit status (open, in_progress, closed):", t.status);
      const newDesc = prompt("Edit description:", t.description || "");

      if (newTitle && newStatus && ["open", "in_progress", "closed"].includes(newStatus)) {
        tickets[index] = { title: newTitle, status: newStatus, description: newDesc };
        localStorage.setItem("tickets", JSON.stringify(tickets));
        loadTickets();
      } else {
        alert("Invalid inputs or cancelled.");
      }
    }
  });

  loadTickets();
});
