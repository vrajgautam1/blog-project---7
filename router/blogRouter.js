const express = require('express');
const router = express.Router();
const blogController = require('../controller/blogController');
const redirectTohomePage = require('../middlewares/redirectTohomePage');
const upload = require('../middlewares/imageUpload');
const userAuth = require('../middlewares/userAuth');

router.get('/signup', blogController.openSignupPage);
router.post('/signup', blogController.submitSignup);

router.get('/login', blogController.openLoginPage);
router.post('/login', blogController.submitLogin);

router.use(userAuth)

router.get('/', redirectTohomePage);
router.get('/home', blogController.openHomePage);

router.get('/createBlog', blogController.openCreateBlogPage);
router.post('/createBlog',upload, blogController.submitBlog);

router.get('/deleteBlog/:id', blogController.deleteBlog);

router.get('/editBlog/:id', blogController.openEditPage);
router.post('/editBlog/:id', upload, blogController.submitEdit);

router.get('/singleBlogPage/:id', blogController.singleBlogPage);

module.exports = router;