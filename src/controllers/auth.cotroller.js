import User from "../models/user.model.js"
import bcrypt from "bcryptjs";
import { generate_token } from "../config/token.js";
import multer from "multer"
import uploadImage from "../config/cloudinary.js";
import mongoose from "mongoose";

const jwt_secret_key = process.env.JWT_SECRET

export const signup = async (req,res)=>{
try {
    console.log("got details")
    const {firstname,lastname,username,email,password} = req.body
    
    if(!firstname || !lastname || !username || !email || !password
    )
    {
        return res.status(400).json({message:"missing required fields"})
    }

    const exist = await User.findOne({email});

    if(exist)
    {
        
    return res.status(409).json({message:"user already exist"})

    }

    // else user not exist so do signup
    // first hash the password
    const hashedPass = await bcrypt.hash(password,10);
    let profileImage;
    console.log("got details ")
    if(req.file)
    {   
        
        profileImage = await uploadImage("C:/WEB DEVELOPEMENT/BACKEND/authentication/"+req.file.path);
       
    }
    

    //now store the details of user

    const user = await User.create({
        firstname,
        lastname,
        username,
        email,
        password:hashedPass,
        profileImage
    })

    res.status(201).json({message:"user signup successfully ",userDetails:{
        firstname,lastname,username,email,profileImage
    }})

} catch (error) {
    return res.status(500).json({message:"internal server error"})
}
}

export const login = async(req,res)=>{
    try {
        const {username,password} = req.body 
    
    // first asure that user is signup then only allow the login 
    const user = await User.findOne({username});
    
    if(!user)
    {
        return res.status(401).json({message:"invalid credentials"})
    }

    // now match the stored password with the sent password by user
    const hashed_pass = user.password

    const isMatched = await bcrypt.compare(password,hashed_pass);
    
    if(!isMatched)
    {
        return res.status(401).json({message:"wrong password"})
    }

    // now password matched means user is logged in now we will assign the JWT token to the user so that 
    // next time user dont have to send the username and password ...he can get access using jwt token 

    const token = generate_token(user._id);

    //after creating the token send the token in cookies 

    res.cookie("token",token,{
        httpOnly:true,
        secure:process.env.NODE_ENVIRONMENT=='PRODUCTION',
        sameSite:"strict",
        maxAge:7*24*3600*1000 // millisecond
    })

    res.status(200).json({
        message:"user logged in successfully",
    })

    } catch (error) {
        res.status(500).json(error.message)
    }
    
}

export const logout = async (req,res)=>{
    try {
        res.clearCookie("token");
        res.json("user loggedout successfully ")
    } catch (error) {
        res.status(500).json(error.message)
    }
}

export const getUserdetails = async (req,res)=>{
 try {
    

 const user =await User.findById(req.user_id);
     if(!user)
    {
        return res.json({
            message:"user doesnot exist "

        })
    }

    res.json(user);
 } catch (error) {
    res.json(error.message);
 }
}