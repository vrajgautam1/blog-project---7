const userAuth = (req, res, next)=>{
    if(res.cookies){
        next()
    }

    return res.redirect("/login");
}

module.exports = userAuth