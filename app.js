import express from "express";
import UserRouter from "./Routes/user.js"
import cookieParser from "cookie-parser";
import messageRouter from "./Routes/message.js";
import { config } from "dotenv";
import cors from "cors";
import friendRouter from "./Routes/friend.js";

export const app = express();

config({
    path:"./database/config.env"
})

// middlewares
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin',process.env.FRONTEND_URL );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true'); // Allow credentials
    next();
  });
  
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/user",UserRouter);
app.use("/api/v1/messages",messageRouter);
app.use("/api/v1/friend",friendRouter);


app.get("/",(req,res)=>{
    res.send("Home Working")
})