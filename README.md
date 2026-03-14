# 📈 Stock Trading Platform (Zerodha Clone)

A full-stack financial trading application built with the MERN stack. This project features a multi-service architecture with a dedicated landing page and a high-performance trading dashboard.

## 🚀 Live Demo
* **Main Website (Landing Page):** [https://stock-trading-platform-49y0.onrender.com/](https://stock-trading-platform-49y0.onrender.com/)
* **Trading Dashboard:** [https://stock-trading-platform2.onrender.com/](https://stock-trading-platform2.onrender.com/)

---

## ✨ Features
- **Multi-Service Architecture:** Separated landing page and dashboard services for better scalability.
- **Cross-Domain Authentication:** Custom-built authentication flow using Session Storage and URL parameters to maintain user state across different sub-domains.
- **Secure Authentication:** Integrated JWT-based login and signup with `bcrypt` for password hashing.
- **Portfolio Management:** Interactive dashboard to monitor holdings, positions, and orders.
- **Modern UI/UX:** Built with React.js and Bootstrap for a clean, responsive, and Zerodha-like experience.

---

## 🛠️ Tech Stack
- **Frontend:** React.js, React Router, Bootstrap
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Tools:** Axios, SweetAlert2, Git, Render (Deployment)

---

## 🏗️ Project Structure
This repository contains three main modules:
1. `frontend`: The landing page and public-facing marketing site.
2. `dashboard`: The core trading interface for logged-in users.
3. `backend`: The API service handling authentication and data management.

---

## ⚙️ How it works (Architecture)
1. **Signup/Login:** User authenticates via the `frontend` app.
2. **Session Persistence:** After success, the username is stored in `sessionStorage` and the user is redirected to the Home Page.
3. **Seamless Handover:** Clicking "Go to Dashboard" securely passes the session data to the `dashboard` service via encrypted URL parameters.
4. **Dashboard Access:** The `dashboard` app captures the parameters to authorize and personalize the user experience.

---

## 🔧 Installation & Setup
1. Clone the repository:
   ```bash
   git clone [https://github.com/CodewithAyu01/STOCK-TRADING-PLATFORM.git](https://github.com/CodewithAyu01/STOCK-TRADING-PLATFORM.git)
   
cd frontend && npm install
cd ../dashboard && npm install
cd ../backend && npm install
