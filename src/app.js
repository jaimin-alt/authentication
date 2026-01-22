import express from "express";
import authRouter from "./routes/auth.route.js";

const app = express()

app.use(express.json())

app.use("/api",authRouter)
export default app