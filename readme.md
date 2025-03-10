# Blog Website using Express.js

A multi-user blog website built using **Express.js**, allowing users to **view, create, edit, and delete blogs**. Users can only perform CRUD operations on their own blogs.

## 🚀 Features
- **Authentication:** Uses `cookie-parser` for session management.
- **Image Uploads:** Uses `multer` to handle blog cover images.
- **Template Engine:** Uses `EJS` for rendering dynamic pages.
- **Multi-User Architecture:** Each user can manage their own blogs.
- **Secure Blog Management:** Users can only modify or delete their own blogs.

## 🛠️ Technologies Used
- **Node.js** & **Express.js** – Backend framework
- **MongoDB** & **Mongoose** – Database & ORM
- **EJS** – Template engine for frontend
- **Multer** – File upload handling
- **Cookie-Parser** – Authentication via cookies

## 📸 Screenshots
(Add your screenshots here)

## 🌍 Live Demo
[Live Link]() *(Replace with actual live URL)*

## 📦 Installation
1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/blog-website.git
   cd blog-website
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Set up environment variables:**
   - Create a `.env` file in the root directory and configure it with your database connection and other required variables.

4. **Start the server:**
   ```sh
   npm start
   ```
5. **Visit in browser:**
   - Open `http://localhost:3000`

## 🏗️ Folder Structure
```
/blog-website
│── models/        # Mongoose models (User, Blog)
│── views/         # EJS templates
│── public/        # Static files (CSS, images)
│── uploads/       # Uploaded blog images
│── router/        # Express routes
│── controllers/   # Business logic (authentication, blogs)
│── configs/       # Database connection
│── index.js       # Main entry point
```

## ✨ Future Enhancements
- Add **password hashing** for better security.
- Implement **JWT authentication** instead of cookies.
- Improve UI with a **better frontend framework (React/Vue)**.

## 📜 License
This project is open-source and available under the **MIT License**.

