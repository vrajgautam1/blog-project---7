const express = require('express');
const app = express();
const db = require('./configs/dbconnection');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cookieParser = require('cookie-parser');

app.set('view engine', 'ejs');
app.set("views", "views");
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use("/uploads", express.static(path.join(__dirname, 'uploads')));
app.use(cookieParser());

const mainRouter = require('./router/index');
app.use(mainRouter);

// Check if running locally
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        db();
        console.log(`Server is running on port ${PORT}`);
        console.log("http://localhost:" + PORT);
    });
}

// Export app for Vercel
module.exports = app;
