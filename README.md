## Project Overview

Employee Management is a full-stack web application designed to help organizations track employee workflows, manage payroll, and oversee HR processes. It features role-based dashboards for Employees, HR executives, and Admins, secure authentication (email/password + Google), dynamic charts, and responsive UI built with React, Tailwind CSS, and DaisyUI.

---

## Features

* **Authentication & Authorization**

  * Email/password sign-up & login with client-side validation
  * Google social login for quick access
  * Role assignment (Employee, HR; Admin seeded on backend)
  * “Remember me” via cookies, protected private routes

* **Employee Dashboard**

  * **Work Sheet**: Add tasks (Sales, Support, Content, Paper-work) with hours and date
  * **Edit/Delete** entries via modal dialogs—instant UI updates
  * **Payment History**: View sorted, paginated salary history

* **HR Dashboard**

  * **Employee List**: View all employees, verify status (toggle ❌/✅)
  * **Payroll Requests**: Pop-up modal to request payments for verified staff
  * **Progress**: Filter all employees’ task records by name & month

* **Admin Dashboard**

  * **All Employees**: Table/card toggle view of all verified users
  * **Fire / Promote**: Fire employees (blocks login) or make them HR
  * **Salary Adjustment**: Enforce salary increases only
  * **Payroll Approvals**: Approve HR payment requests; mark paid with timestamp

* **Global Functionality**

  * Dark/light theme toggle with localStorage persistence
  * Responsive design for mobile, tablet, and desktop
  * Toast notifications (React-Toastify) for all CRUD, auth, and payment operations
  * 404 and error fallback pages

---

## Tech Stack

* **Frontend**: React.js, React Router, Tailwind CSS, DaisyUI, Flowbite (carousel)
* **State & Data Fetching**: React Context, custom hooks (`useAxiosPublic`, `useAxiosSecure`), React-Toastify
<!-- * **Charts**: Recharts for Salary vs. Month bar chart -->
* **Backend**: Node.js, Express.js, MongoDB (native driver), JWT (for future role middleware)
* **Authentication**: Firebase Auth (email/password, Google)
* **Deployment**: Vercel (frontend), Heroku / Render (backend)

---

## Setup & Installation

1. **Clone Repositories**

   ```bash
   git clone https://github.com/yourusername/employee-management-client.git
   git clone https://github.com/yourusername/employee-management-server.git
   ```
2. **Backend**

   ```bash
   cd employee-management-server
   npm install
   cp .env.example .env
   # Set DB_USER, DB_PASS, ACCESS_TOKEN_SECRET, VITE_IMGBB_API_KEY
   npm start
   ```
3. **Frontend**

   ```bash
   cd employee-management-client
   npm install
   cp .env.example .env
   # Set VITE_API_URL, VITE_FIREBASE_API_KEY etc.
   npm run dev
   ```
4. **Access**

   * Frontend: [http://localhost:5173](http://localhost:5173)
   * Backend API: [http://localhost:5000](http://localhost:5000)

---

## Live Demo

🌐 [https://employee-management-4bde3.web.app](https://employee-management-4bde3.web.app)

---

## Default Credentials

* **Admin**

  * **Email:** [d10@gmail.com](mailto:d10@gmail.com)
  * **Password:** Fagon999&
* **HR (example)**

  * **Email:** [d5@gmail.com](mailto:d5@gmail.com)
  * **Password:** Fagon999&
* **Employee (example)**

  * **Email:** [d2@gmail.com](mailto:d2@gmail.com)
  * **Password:** Fagon999&

---

<!-- ## Screenshots & GIFs

### Hero Carousel & Landing

![Landing Page Hero](./screenshots/hero.png)

### Employee Work Sheet

![Work Sheet Modal](./screenshots/worksheet.gif)

### HR Employee List

![HR Dashboard Table](./screenshots/hr-employee-list.png)

### Admin Approval & Salary Chart

![Admin Payroll Approval](./screenshots/admin-payroll.png) -->

---

> **Tip:** Include these image files in a `/screenshots` folder at the repo root so they render correctly in GitHub.
