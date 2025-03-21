//modules
const express = require('express');
const app = express();
const db = require('./configs/dbconnection');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const session = require("express-session")
const passport = require("./middlewares/passportMiddleWare");
const flash = require('connect-flash');

//middlewares 
app.use(session({
    secret: "vraj",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 1000*60*30 }
}));


app.use(passport.session()); 
app.use(passport.initialize());
app.use(flash()); // Flash middleware must come after session middleware
app.use(passport.userData);
app.use(passport.flashMiddleware); 

app.set('view engine', 'ejs');
app.set("views", "views");
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use("/uploads", express.static(path.join(__dirname, 'uploads')));
app.use(cookieParser());

//mainrouter
const mainRouter = require('./router/index');
app.use(mainRouter);

//run server
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
