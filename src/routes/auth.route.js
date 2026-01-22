import express from "express";
import { login, logout, signup, upload_profile } from "../controllers/auth.cotroller.js";
import multer from "multer";
const authRouter = express.Router();

authRouter.post("/signup",signup)

authRouter.post("/login",login)

authRouter.post("/logout",logout)

const upload = multer({dest:"uploads/"})
authRouter.post("/upload",upload.single("profilePic"),upload_profile)

export default authRouter