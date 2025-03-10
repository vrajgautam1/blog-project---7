const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    coverImage:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    }
},{
    timestamps: true
})

const blog = mongoose.model('blogTbl', blogSchema);
module.exports = blog;