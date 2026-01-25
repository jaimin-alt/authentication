import express from "express";
import { getUserdetails, login, logout, signup } from "../controllers/auth.cotroller.js";
import multer from "multer";
import { Storage , fileFilter } from "../middlewares/multer.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
const authRouter = express.Router();
const upload = multer({
  storage:Storage,
  fileFilter
})
authRouter.post("/signup",upload.single("profilePic"),signup)

authRouter.post("/login",login)

authRouter.post("/logout",authMiddleware,logout)

authRouter.get("/getuser",authMiddleware,getUserdetails)


export default authRouter