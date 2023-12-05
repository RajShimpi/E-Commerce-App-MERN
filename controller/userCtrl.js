const { generateToken } = require("../config/jwtToken");
const User = require("../models/userModel");
const asyncHandler = require('express-async-handler');
const validateMongodbId = require("../utils/validateMongodbid");

const createUser = asyncHandler(async (req, res) => {
    const email = req.body.email;
    const findUser = await User.findOne({ email: email });
    if (!findUser) {
        //Create the new user
        const newUser = await User.create(req.body);
        res.json(newUser);
    } else {
        throw new Error("User Already Exitsts");
    };
});

const loginUserCtrl = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    // console.log(email,password);
    // Check if the user exists or not
    const findUser = await User.findOne({ email });
    if (findUser && await findUser.isPasswordMatched(password)) {
        res.json({
            _id: findUser,
            firstname: findUser?.firstname,
            lastname: findUser?.lastname,
            email: findUser?.email,
            mobile: findUser?.mobile,
            token: generateToken(findUser?._id)
        });
    } else {
        throw new Error("Invalide Credentials")
    }
})

// Update a User

const updateaUser = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongodbId(_id)
    try {
        const updateUser = await User.findByIdAndUpdate(
            _id, {
            firstname: req?.body?.firstname,
            lastname: req?.body?.lastname,
            email: req?.body?.email,
            mobile: req?.body?.mobile
        }, {

            new: true,
        }
        );
        res.json(updateUser)
    } catch (error) {
        throw new Error(error)
    }
})
// Get all User

const getAllUsers = asyncHandler(async (req, res) => {
    try {
        const users = await User.find();

        // Send a successful response with the retrieved users
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        // Log the error for debugging purposes
        console.error(error);

        // Send an error response to the client
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

//Get a single user 
const getaUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id)
    try {
        const getaUser = await User.findById(id);
        res.json({
            getaUser,
        })
    } catch (error) {
        throw new Error(error)
    }
})

//Delete a user 
const deleteaUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id)
    try {
        const deleteaUser = await User.findByIdAndDelete(id);
        res.json({
            deleteaUser,
        })
    } catch (error) {
        throw new Error(error)
    }
})

const blockUser =asyncHandler(async(req,res)=>{
 const {id}=req.params;
 validateMongodbId(id)
 try{
    const blockuser= await User.findByIdAndUpdate(
        id,{
            isBlocked:true,
    },{
        new:true,
    }
    );
    res.json({
        massage:"User Blocked"
    })
 } catch(error){
    throw new Error(error);
 }
});
const unblockUser =asyncHandler(async(req,res)=>{
    const {id}=req.params;
    validateMongodbId(id)
    try{
       const unblockUser= await User.findByIdAndUpdate(
           id,{
               isBlocked:false,
       },{
           new:true,
       }
       );
       res.json({
        massage:"User UnBlocked"
    })
    } catch(error){
       throw new Error(error);
    }
})



module.exports = { createUser, loginUserCtrl, getAllUsers, getaUser, deleteaUser, updateaUser,blockUser,unblockUser };