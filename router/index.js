const express = require('express');
const router = express.Router();


//-2 client routes
const blogRoutes = require('./blogRouter');
router.use(blogRoutes);


module.exports = router;