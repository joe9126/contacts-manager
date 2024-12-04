const asyncHandler = require('express-async-handler');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

/**
 * @desc register user
 * @route POST /api/user/register
 * @access public
 */
const registerUser = asyncHandler(async (req,res)=>{
     
      const {username, email, password} = req.body;
      if(!username||!email||!password){
          res.status(400);
          throw new Error("All fields are required");
      }
    const userAvailable =  await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("User email already registered");
    }
   //Hash password
   const hashedPassword = await bcrypt.hash(password,10);
   console.log("Hashed password: ",hashedPassword);
   const user = User.create({
        username,email,password:hashedPassword
    });
    console.log(`User registered ${user}`);
    if(user){
        res.status(201).json({_id: user.id, email: user.email});
    }else{
        res.status(400);
        throw new Error("User data is not valid");
    }
  //res.json({message:"Regster user"});
  });
  
/**
 * @desc User login
 * @Route /api/user/login
 * @access public
 */
const loginUser = asyncHandler(async (req,res)=>{
    const {email,password} = req.body;
    if(!email||!password){
        res.status(400);
        throw new Error("All fields are required");
    }
    const user = await User.findOne({email});
    
    if(user &&  (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign({
            user:{
                username:user.username,
                email:user.email,
                id: user.id
            },
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:"1m"}
    );
        res.status(200).json({accessToken});
    }else{
        res.status(401);
        throw new Error("Email or password is invalid");
    }
   
});

/**
 * @desc get all users
 */
const getUsers = asyncHandler(async (req,res)=>{
    const users = await User.find();
    res.status(200).json(users);
});

/**
 * @desc get user by Id
 */
const getUser = asyncHandler(async (req,res)=>{
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
});

/**
 * @desc Current user info
 * @Route /api/user/current
 * @access private
 */
const currentUser = asyncHandler(async (req,res)=>{
    res.json({message:"Current user"});
});

module.exports = {registerUser,loginUser,currentUser};