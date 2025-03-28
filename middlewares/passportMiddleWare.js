const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const userModel = require("../models/userModel");

passport.use(new LocalStrategy(
    async(username, password, done)=>{
        try{
            const user = await userModel.findOne({username}); //this will search the username received from the post request in the database inside all objects and will match the username we received with the username key's value one by one

            //now if the match is successful good. else handle what to do
            if(user && user.password === password){
                return done(null, user)
            }
            else{ return done (null,false)}
          

            //here done is a callback function that follows nodejs error first callback pattern. null means no error, false means auth failed, if it returns the user it means auth is successful.
        }catch(err){
            return done(err);
        }
    }
))

passport.serializeUser((user, done)=>{
    done(null, user._id);
})


passport.deserializeUser(async(id, done)=>{
    try{
        const user = await userModel.findById(id)
        done(null, user);
    }catch(err){
        done(err); // here we cant use null because we are actually expecting an error. 
    }
})

passport.userAuth = (req, res, next)=>{
    if(req.isAuthenticated()){
        return next()
    }
    return res.redirect("/login");
}

passport.userData = (req, res, next)=>{
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    return next();
}

passport.flashMiddleware = (req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    return next();
};

module.exports = passport;