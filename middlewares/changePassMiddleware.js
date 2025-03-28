const change_pass = (req, res, next)=>{
    if(req.cookies.email){
        return next();
    }

    req.flash("error", "enter your email first");
    return res.redirect("/forgotPassword");
}

module.exports = change_pass