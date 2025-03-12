const express = require('express');
const router = express.Router();
const blogController = require('../controller/blogController');
const redirectTohomePage = require('../middlewares/redirectTohomePage');
const upload = require('../middlewares/imageUpload');
const userAuth = require('../middlewares/userAuth');
const passport = require("../middlewares/passportMiddleWare");

router.get('/signup', blogController.openSignupPage);
router.post('/signup', blogController.submitSignup);

router.get('/login', blogController.openLoginPage);
router.post('/login', passport.authenticate("local", {
    successRedirect:"/",
    failureRedirect:"/login"
})); // the passport.authenticate is only for the login route. 

router.use(userAuth) // this is for protecting all the routes. 

// if userAuth is not there then anyone can type /home and access it without login

//both these lines serve different purposes and are not redundant

//the login page authenticates the user. and the auth page protects the pages. 

router.get('/', redirectTohomePage);
router.get('/home', blogController.openHomePage);

router.get('/createBlog', blogController.openCreateBlogPage);
router.post('/createBlog',upload, blogController.submitBlog);

router.get('/deleteBlog/:id', blogController.deleteBlog);

router.get('/editBlog/:id', blogController.openEditPage);
router.post('/editBlog/:id', upload, blogController.submitEdit);

router.get('/singleBlogPage/:id', blogController.singleBlogPage);

router.get("/logout", blogController.logout);

module.exports = router;