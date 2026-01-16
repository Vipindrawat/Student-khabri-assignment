# Student Khabri - Leads Management App

## Live Demo
### Frontend: https://leads-frontend-39le.onrender.com
### Backend: https://leads-backend-wy3w.onrender.com

## Note: This app currently allows login with only one test user.
### Test Credentials:
#### Email: admin@gmail.com
#### Password: admin

## Overview:
Student Khabri is a full-stack CRM-style application built with React (Vite) for frontend and Node.js + Express + MongoDB for backend.
It allows users to manage leads, filter and sort them, and see analytics of leads by status.

## Features:
1) User authentication with JWT
2) Filter, search, and sort leads
3) Analytics dashboard with total leads, converted leads, and leads by stage
4) Responsive design using Tailwind CSS

## Tech Stack
### Frontend:
React (Vite), Tailwind CSS, Axios, React Router

### Backend:
Node.js, Express, Mongoose (MongoDB)

### Authentication:
JWT

## Getting Started (Local Development):

### Backend
#### 1) Clone the repo:
git clone https://github.com/Vipindrawat/Student-khabri-assignment.git
cd Student-khabri-assignment/Backend
#### 2) Install dependencies:
                             npm install
b) Create a .env file with:
    PORT=3000
    URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
#### 3) Start the backend server:
                                 npm start

### Frontend
#### 1) Navigate to the frontend folder:
cd ../Frontend
#### 2) Install dependencies:
                           npm install
#### 3) Create a .env file with:
VITE_API_URL=http://localhost:3000
#### 4)Start the development server:
                                  npm run dev

## Folder Structure
Backend/
  ├─ Models/
  ├─ routes/
  ├─ Middleware/
  ├─ index.js
Frontend/
  ├─ src/
      ├─ components/
      ├─ index.css
      ├─ App.jsx
      ├─ main.jsx
  ├─ vite.config.js

