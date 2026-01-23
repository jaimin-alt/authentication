import express from "express";
import { login, logout, signup, upload_profile } from "../controllers/auth.cotroller.js";
import multer from "multer";
const authRouter = express.Router();

authRouter.post("/signup",signup)

authRouter.post("/login",login)

authRouter.post("/logout",logout)

const upload = multer({dest:"upload/"})

authRouter.post("/upload",upload.single("profilePic"),(req,res,next)=>{
      console.log(req.body)
      console.log(req.file)
    if (!req.file) {

      return res.status(400).json({
        message: "No file uploaded"
      });
    }

  if(req.file.mimetype!="image/jpeg")
  {
    return res.json({
    message:"plz send png or jpeg or jpg image"
  })
    
  }
  next()
},upload_profile)

export default authRouter