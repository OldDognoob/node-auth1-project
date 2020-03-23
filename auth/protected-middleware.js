const bcrypt = require("bcryptjs");

const users =require("../users/user-model");

module.exports=(req,res,next)=>{
    if(req.session.loggedInUser){
        next();
    }else{
        res.status(400).json({message:"no cookie,no session"})
    }
}