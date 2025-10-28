Flexi Ticketing — Twig Version

A fully functional ticket-management web app built with **Twig 3 + PHP 8 + localStorage**.  
This implementation mirrors the React and Vue versions to ensure consistent UI and UX across frameworks.

---

## ✨ Core Features

- **Landing Page**
  - Wavy hero background, decorative circles, centered layout (max width 1440 px)
  - Responsive design for mobile / tablet / desktop  
- **Authentication (Login / Signup)**
  - Form validation + inline error messages
  - Toast / alert feedback for invalid credentials
  - LocalStorage simulation using `ticketapp_session`
- **Dashboard**
  - Displays ticket stats (Total, Open, Resolved)
  - Logout button clears session
  - Navigation to Ticket Management
- **Ticket Management (CRUD)**
  - Create / Read / Update / Delete tickets
  - Inline validation + real-time feedback
  - Status colors (open → green, in progress → amber, closed → gray)
  - LocalStorage persistence
- **Security & Access Control**
  - Protects Dashboard and Tickets pages using localStorage session check
  - Unauthorized users redirected to Login

---

## 🧰 Framework & Libraries

| Technology | Purpose |
|-------------|----------|
| PHP 8.4 | Server runtime |
| Twig 3.10 | Templating engine |
| HTML / CSS / JS | Front-end UI |
| localStorage | Mock database + session handling |

---

## ⚙️ Setup & Run Instructions

### 1️⃣ Install Dependencies
```bash
cd twig
composer install
2️⃣ Run Local Server
bash
Copy code
php -S localhost:8000
3️⃣ Open in Browser
http://localhost:8000 → Landing page

http://localhost:8000/?page=login → Login

http://localhost:8000/?page=signup → Signup

http://localhost:8000/?page=dashboard → Dashboard

http://localhost:8000/?page=tickets → Ticket Management

🔐 Test User Credentials
You can sign up directly inside the app, or use:

Note down your Signup and that is what you will be able to use for your login




 Switch Between Implementations
Framework	Folder	GitHub Repo (example)
React	/react	flexi-ticketing-react
Vue.js	/vue	flexi-ticketing-vue
Twig (PHP)	/twig	flexi-ticketing-twig

Each version can be cloned and run separately.

♿ Accessibility Notes
Semantic HTML structure (header, main, footer)

Visible focus states

Sufficient color contrast

Form labels linked with inputs

Keyboard navigation friendly

Known Issues
Mock authentication is localStorage-only (no backend API yet)

Twig 3.5 may show deprecation warnings on PHP 8.4 — use Twig 3.10 to fix

Data clears when localStorage is manually reset

Author

Abideen Ikumogunniyi