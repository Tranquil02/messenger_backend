import jwt from "jsonwebtoken";

import dotenv from "dotenv";
import { User } from "../models/user.js";

// Load environment variables from .env file
dotenv.config();

export const isAuthorised = async (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            return res.status(401).json({ // Use 401 Unauthorized status code
                success: false,
                message: "Unauthorized. Please log in."
            });
        }

        const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decodeToken.id).select("-password"); // Exclude password field

        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};