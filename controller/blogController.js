const blog = require("../models/blogModel");
const User = require("../models/userModel");
const passport = require("../middlewares/passportMiddleWare");
const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");
const { error } = require("console");
require("dotenv").config();

module.exports.loginSuccess = (req, res) => {
  req.flash("success", "login Successful");
  return res.redirect("/home");
};

module.exports.openHomePage = async (req, res) => {
  try {
    const blogs = await blog.find();
    return res.render("./client/home.ejs", { blogs });
  } catch (err) {
    console.log(err);
    res.send("Error in opening home page");
  }
};

module.exports.openCreateBlogPage = (req, res) => {
  res.render("./client/createBlog.ejs");
};

//post method for form on the openCreateBlogPage
module.exports.submitBlog = async (req, res) => {
  try {
    await blog.create({ ...req.body, coverImage: req.file.filename });

    console.log("Blog submitted in the database successfully");

    return res.redirect("/home");
  } catch (err) {
    console.log(err);
    res.send("Error in submitting blog");
  }
};

module.exports.deleteBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const BlogToDelete = await blog.findById(id);
    if (!BlogToDelete) {
      return res.send("Blog not found");
    }
    await blog.findByIdAndDelete(req.params.id);
    console.log("Blog deleted successfully");
    return res.redirect("/home");
  } catch (err) {
    console.log(err);
    res.send("Error in deleting blog");
  }
};

module.exports.openEditPage = async (req, res) => {
  const { id } = req.params;
  try {
    const blogToEdit = await blog.findById(id);
    if (!blogToEdit) {
      return res.send("Blog not found");
    }
    return res.render("./client/edit.ejs", { blogToEdit });
  } catch (err) {
    console.log(err);
    res.send("Error in opening edit page");
  }
};

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
      const oldImagePath = path.join(
        __dirname,
        "../uploads",
        blogToEdit.coverImage
      );
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
  res.render("./client/signup.ejs");
};

//signup page post method
module.exports.submitSignup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const userinDatabase = await User.findOne({ email: email });
    if (userinDatabase) {
      return res.redirect("/signup");
    }
    await User.create({ username, email, password });
    console.log("User signed up successfully");

    return res.redirect("/login");
  } catch (err) {
    console.log(err);
    res.send("Error in submitting signup");
  }
};

//open login page
module.exports.openLoginPage = (req, res) => {
  res.render("./client/login.ejs");
};

//open single blog
module.exports.singleBlogPage = async (req, res) => {
  const { id } = req.params;
  try {
    const blogtodisplay = await blog.findById(id);
    res.render("./client/singleBlogPage.ejs", { blogtodisplay });
  } catch (err) {
    console.log(err);
  }
};

//logout
// first we used to destroy sessions now we are using inbuilt method in passport js using a method named logOut
module.exports.logout = (req, res) => {
  req.logOut(() => {
    req.flash("success", "logged out");
    return res.redirect("/login");
  });
};

module.exports.myProfile = (req, res) => {
  return res.render("./client/myProfile.ejs");
};

module.exports.resetPassword = (req, res) => {
  return res.render("./client/reset.ejs");
};

module.exports.resetPasswordSubmit = async (req, res) => {
  const { password, newPassword, confirmPassword } = req.body;
  const { id } = req.user;
  try {
    const user = await User.findById(id);

    if (user.password !== password || newPassword !== confirmPassword) {
      req.flash("error", "Password change failed, Please try again");
      return res.redirect("/resetPassword");
    }

    user.password = newPassword;
    await user.save();

    console.log("this is working");
    req.flash("success", "Password changed successfully");
    return res.redirect("/login");
  } catch (err) {
    console.log(err.message);
  }
};

module.exports.openForgotPasswordPage = (req, res) => {
  return res.render("./client/forgotPassword.ejs");
};

let otp; //make sure we are verifying otp after it is being made that means it will come after forgot password controller.

module.exports.submitForgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const userExists = await User.findOne({ email: email });

    if (!userExists) {
      req.flash("error", "Email Does not exist");
      return res.redirect("/forgotPassword");
    } else {
      otp = Math.floor(100000 + Math.random() * 900000);
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for port 465, false for other ports
        auth: {
          user: "gautamvraj1999@gmail.com",
          pass: "bepc zexb wvol lypw",
        },
      });

      const info = await transporter.sendMail({
        from: '"Vraj Gautam" <gautamvraj1999@gmail.com>', // sender address
        to: req.body.email, // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: `your otp is ${otp}`, // html body
      });

      console.log("Message sent: %s", info.messageId);
      res.cookie("email", JSON.stringify(req.body.email));

      req.flash(
        "success",
        "otp sent successfully, Now check mail, find otp and enter it here"
      );
      res.redirect("/verifyOtp");
    }
  } catch (err) {
    req.flash("error", "Something Went wrong");
    return res.redirect("/forgotPassword");
  }
};

//so basically i was dependent on watching a ui particularly a form that contains action and method
//without that i cant expect a req.body
//but here we are redirecting the user to another verify otp page after the otp is being sent to his email.
//now the thing to note is that we do need the otp which was sent to the email when the user is redirect to a new opt verify page.

//10.40 this.otp works when there is a method inside the object and that method contains something like otp. then and only then this.otp will work

module.exports.openVerifyOtpPage = (req, res) => {
  return res.render("./client/verifyotp.ejs");
};

module.exports.verifyOtp = (req, res) => {
  console.log(typeof req.body.otp, req.body.otp, typeof otp, otp);
  try {
    if (req.body.otp == otp) {
      // res.json({message: "otp verified successfully"})
      req.flash("success", "otp verified successfully");
      return res.redirect("/changePassword");
    } else {
      // res.json({message: "invalid otp"})
      req.flash("error", "incorrect otp entered");
      return res.redirect("/verifyOtp");
    }
  } catch (error) {
    req.flash("error", "Something Went wrong");
    return res.redirect("/verifyOtp");
  }
};

module.exports.openChangePasswordPage = (req, res) => {
  return res.render("./client/changePassword.ejs");
};

module.exports.changePassword = async (req, res) => {
  try {
    let email = JSON.parse(req.cookies.email);
    let user = await User.findOne({ email: email });

    let { new_password, confirm_password } = req.body;

    if (new_password === confirm_password) {
      user.password = new_password;
      await user.save();
    //   return res.json({ message: "Password changed successfully" });
    req.flash("success", "Password Changed Successfully");
    return res.redirect("/login")
    } else {
    //   return res.json({ message: "Passwords dont match" });
    req.flash("error", "Passwords do not match!")
    return res.redirect("/changePassword")
    }

    // return res.json(email);
  } catch (err) {
    return res.json({ message: error.message });
  }
};
