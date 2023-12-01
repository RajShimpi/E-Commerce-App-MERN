const User =require('../models/userModel');
const jwt = require("jsonwebtoken");
const asyncHandler = require('express-async-handler');

const authMiddleware = asyncHandler(async(req,res,next)=>{
    let token;
    if(req?.headers?.authorization?.startsWith('Bearer')){
        token= req.headers.authorization.split(' ')[1];
        try{
           if(token) {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode)
           }
        } catch(error){
            throw new Error('Not Authorized expires, please login a again')
        }
    } else{
        throw new Error('Ther is no token header attached to header')
    }
})
module.exports = {authMiddleware};