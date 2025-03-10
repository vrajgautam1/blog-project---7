const blog = require('../models/blogModel');
const User = require('../models/userModel');
const fs = require('fs');
const path = require('path');

module.exports.openHomePage = async(req, res) => {
    try{
        const blogs = await blog.find();
        return res.render('./client/home.ejs', {blogs});
    }catch(err){
        console.log(err);
        res.send("Error in opening home page");
    }
}

module.exports.openCreateBlogPage = (req, res) => {
    res.render('./client/createBlog.ejs');
}

//post method for form on the openCreateBlogPage
module.exports.submitBlog = async(req, res) => { 
    try{
        await blog.create({...req.body, coverImage: req.file.filename}); 

        console.log("Blog submitted in the database successfully");

        return res.redirect('/home');
    }catch(err){
        console.log(err);
        res.send("Error in submitting blog");
    }
}

module.exports.deleteBlog = async(req, res) => {
    const{id} = req.params;
    try{
        const BlogToDelete = await blog.findById(id);
        if(!BlogToDelete){
            return res.send("Blog not found");
        }
        await blog.findByIdAndDelete(req.params.id);
        console.log("Blog deleted successfully");
        return res.redirect('/home');
    }catch(err){
        console.log(err);
        res.send("Error in deleting blog");
    }
}

module.exports.openEditPage = async(req, res) => {
    const {id} = req.params;
    try{
        const blogToEdit = await blog.findById(id);
        if(!blogToEdit){
            return res.send("Blog not found");
        }
        return res.render('./client/edit.ejs', {blogToEdit});
    }catch(err){
        console.log(err);
        res.send("Error in opening edit page");
    }
}

module.exports.submitEdit = async (req, res) => {
    const { id } = req.params;
    try {
        const blogToEdit = await blog.findById(id);
        if (!blogToEdit) {
            console.log("Blog not found");
            return res.send("Blog not found");
        }

        let updatedData = { ...req.body };

        if (req.file) {
            const oldImagePath = path.join(__dirname, "../uploads", blogToEdit.coverImage);
            console.log("Trying to delete:", oldImagePath);

            fs.unlink(oldImagePath, (err) => {
                if (err) {
                    console.error("Error deleting old image:", err.message);
                } else {
                    console.log("Old image deleted successfully");
                }
            });

            updatedData.coverImage = req.file.filename;
        }

        await blog.findByIdAndUpdate(id, updatedData);
        console.log("Blog submitted successfully");

        return res.redirect("/home");

    } catch (err) {
        console.log(err);
        res.send("Error in submitting edit");
    }
};




//signup and login controller

//open signup page
module.exports.openSignupPage = (req, res) => {
    res.render('./client/signup.ejs');
}

//signup page post method
module.exports.submitSignup = async(req, res) => {
    const {username, email, password} = req.body;
    try{
        const userinDatabase = await User.findOne({email: email});
        if(userinDatabase){
            return res.redirect("/signup");
        }
        await User.create({username, email, password});
        console.log("User signed up successfully");
        
        return res.redirect('/login');
    }catch(err){
        console.log(err);
        res.send("Error in submitting signup");
    }
}

//open login page
module.exports.openLoginPage = (req, res) => {
    res.render('./client/login.ejs', {errorMessage: null});
}


//login page post method
module.exports.submitLogin = async(req, res) => {
    const {email, password} = req.body;
    try{
        const user = await User.findOne({email: email});
        if(!user){
            return res.redirect("/login");
        }

        if(user.password !== password){
            return res.redirect('/login');
        }
        res.cookie("userId", user._id);
        return res.redirect('/home');
    }catch(err){
        console.log(err);
        res.send("Error in submitting login");
    }
}

//open single blog 
module.exports.singleBlogPage = async(req, res)=>{
    const{id} = req.params
    try{
        const blogtodisplay = await blog.findById(id);
        res.render('./client/singleBlogPage.ejs', {blogtodisplay});
    }catch(err){
        console.log(err);
    }
}