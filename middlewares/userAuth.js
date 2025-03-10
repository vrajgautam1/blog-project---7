const userAuth = (req, res, next) => {
    if (req.cookies.userId) {
        return next(); 
    }

    return res.redirect("/login"); 
};

module.exports = userAuth;