import  Jwt from "jsonwebtoken";
import { user } from "../models/user.js";

export const isAuthorised = async (req, res, next) => {
    try {
        const secretkey = "hsuhifjksoldk";
        const { token } = req.cookies;
        if (!token) return res.status(404).json({
            success: false,
            message: "Login False"
        });
        // req.Token=token;
        // console.log(req.Token)
        const decodeToken = Jwt.verify(token, secretkey);
        req.User = await user.findById(decodeToken.id);
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Authorization Error"
        });
    }
};
