// console.log(Math.floor(100000 + Math.random() * 900000));

//login page post method
// module.exports.submitLogin = async(req, res) => {
//     const {email, password, username} = req.body;
//     try{
//         const user = await User.findOne({username: username});
//         if(!user){
//             return res.redirect("/login");
//         }

//         if(user.password !== password){
//             return res.redirect('/login');
//         }
//         // res.cookie("userId", user._id);
//         req.session.userId = user._id;
//         return res.redirect('/home');
//     }catch(err){
//         console.log(err);
//         res.send("Error in submitting login");
//     }
// }

var mergeAlternately = function(word1, word2) {
    //first determine how many times should the loop run. 
    let length
    if(word1.length<word2.length){
        length = word1.length
    }else{length = word2.length}

    let merged = ""
    for(i = 0; i<length; i++){
        merged += word1[i] + word2[i];
    }

    merged += word1.slice(length) + word2.slice(length)
    return merged
};