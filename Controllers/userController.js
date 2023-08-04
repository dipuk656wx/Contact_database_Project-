const express = require('express')
const app = express()
const User = require('../models/userModel')
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { use } = require('bcrypt/promises');
const register = asyncHandler(async(req, res) => {
    const {username, email, password} = req.body;
    if (!email || !username || !password){
        res.status(400);
        throw new Error("Some fields are missing")
    }
    const userAvailable = await User.findOne({email});
    if (userAvailable){
        res.status(400);
        throw new Error("User already registered")
    }
    //Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
    })
    console.log("Created user: ", newUser)
    if(newUser){
        res.status(201).json({
            _id: newUser.id, email: newUser.email
        })
    }else{
        res.status(400);
        throw new Error("Not created")
    }
    res.status(200).json()
})
const loginUser = asyncHandler(async(req, res) => {
    const {email, password} = req.body
    if(!email || !password){
        res.status(400)
        throw new Error("All fields are mandatory")
    } 
    const user = await User.findOne({email})
    const accessToken = null;
    //compare password with hashed password
    if (user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id,
            },
            
        }, process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "1m"});
        res.status(200).json({"accessToken": accessToken})
    }else{
        res.status(401);
        throw new Error('Bad Credential')
    }
    
    
})
const currentUser = asyncHandler(async(req, res) => {
    res.status(200).json({message: "register"})
})

module.exports = {register, loginUser, currentUser}