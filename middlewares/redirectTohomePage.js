const redirectTohomePage = (req, res, next) => {
    if(req.url === '/'){
        res.redirect('/home');
    }

    return next();
}

module.exports = redirectTohomePage;