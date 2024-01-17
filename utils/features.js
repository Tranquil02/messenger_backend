import Jwt from "jsonwebtoken";

export const setcookie = (res,statusCode, userData, message) => {
    try {
        const token = Jwt.sign({ id: userData._id },process.env.JWT_SECRET);
        // console.log(token);
        res.status(statusCode).cookie("token", token, {
            httpOnly: true
        }).json({
            success: true,
            message: message
        })
    } catch (error) {
        console.log(error)
    }

}