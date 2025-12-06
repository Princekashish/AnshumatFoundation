# HR Dashboard — Full-Stack Application

A secure user authentication and dashboard management system built using **Next.js**, **Node.js**, **Express**, **MongoDB**, and **JWT Authentication with Cookies**.

## 🚀 Live Demo

| Service               | URL                                          |
| --------------------- | -------------------------------------------- |
| **Frontend (Vercel)** | https://anshumat-foundation-kappa.vercel.app |
| **Backend (Render)**  | https://hrdashboard-r3uf.onrender.com        |

## 📦 Features

✔ Secure Login using **HTTP-only cookies**  
✔ JWT-based authentication  
✔ Protected Dashboard & Admin routes  
✔ CORS support for production  
✔ Role-based access (optional)  
✔ Deployed on Vercel + Render

# 🛠 Tech Stack

### **Frontend**

- Next.js (App Router)
- TypeScript
- Axios
- TailwindCSS

### **Backend**

- Node.js
- Express.js
- MongoDB (Mongoose)
- JSON Web Tokens (JWT)
- Cookie Parser
- CORS

```bash
git clone https://github.com/princekashish/hr-dashboard.git
cd hr-dashboard
```

## Backend Setup

### Install dependencies

```bash
cd backend
npm install
```

### Add environment variables (.env)

```bash
PORT=8000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key
FRONTEND_URL=https://anshumat-foundation-kappa.vercel.app
```

## Start backend

```sh
npm run dev
```

## Frontend Setup

### Install dependencies

```sh
cd frontend
npm install
```

## Start frontend

```sh
npm run dev
```

## 📘 API Documentation

### 🔐 Auth Routes

#### POST /auth/v1/login

```sh
{
  "email": "test@example.com",
  "password": "example"
}

Response

{
  "token": "jwt_token",
  "user": {
    "_id": "...",
    "email": "...",
    "name": "..."
  }
}

```
#### POST /auth/v1/register

Creates a new user.

#### POST /auth/v1/logout

Clears the authentication cookie.

#### 🔒 GET /dashboard

Requires:

Valid HTTP-only cookie (token)

Authorization middleware

<div align="center">
  <sub>Built with ❤️ by <a href="https://www.princekashish.tech">Prince kashish</a></sub>
</div>