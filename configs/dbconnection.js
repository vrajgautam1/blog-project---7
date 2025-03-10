const mongoose = require('mongoose');

require('dotenv').config();
const url = process.env.DB_URL;

const db = async()=>{
    try{
        await mongoose.connect("mongodb+srv://gautamvraj1999:12345@cluster0.e56wc.mongodb.net/blogProject");
        console.log("Database connected");
    }catch(err){
        console.log(err);
        console.log("Database connection failed");
    }
}

module.exports = db;