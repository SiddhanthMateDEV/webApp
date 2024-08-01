import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if(!token){
            return res.status(401).json({error: "No token provided"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({error: "invalid token"});
        }

        const user = await User.findById(decoded.userId).select("-password");
        if(!user){
            return res.status(401).json({error: "User not found"});
        }

        req.user = user;
        next();
    } catch (error) {
        console.log(`Error occured in protected route function: ${error.message}`);
        return res.status(500).json({error: `Internal server error: ${error.message} in protected route function`});
    }
}