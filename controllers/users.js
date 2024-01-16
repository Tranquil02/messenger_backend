import { user } from "../models/user.js";
import { setcookie } from "../utils/features.js";
import bcrypt from "bcryptjs";

export const registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const isUser = await user.findOne({ email });
        if (isUser) return res.status(404).json({
            success: true,
            message: "user already exist"
        });
        const hashed = bcrypt.hashSync(password, 10);
        const userData = await user.create({
            name, email, password: hashed
        })
        // console.log(userData._id);
        setcookie(res, 201, userData, "Register Successfull")
    } catch (error) {
        console.log(error);
    }
}

export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const isUser = await user.findOne({ email });
        if (!isUser) return res.status(404).json({
            success: false,
            message: "Invalid user or Password"
        })
        // console.log(isUser.name)
        const isMatched = await bcrypt.compare(password, isUser.password);

        if (!isMatched) return res.status(404).json({
            success: false,
            message: "Wrong Password"
        })
        setcookie(res, 200, isUser, "Login Successfull")
    } catch (error) {
        console.log(error);
    }
}

export const logout=(req,res,next)=>{
    res.status(200).cookie("token","", {
        httpOnly: true,
        expires:new Date(Date.now())
    }).json({
        success: true,
        message: "logout Successfull"
    })
}

export const myDetails=async(req,res,next)=>{
    res.json({
        success:true,
        users:req.User
    })
}
