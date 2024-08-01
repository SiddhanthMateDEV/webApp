import jwt from "jsonwebtoken";
import crypto from "crypto";

export const generateJWTSecret = () => {
    return crypto.randomBytes(64).toString('hex');
}

export const generateTokenAndSetCookies = (userId, res) => {
    const token = jwt.sign({userId},
        process.env.JWT_SECRET,
        {
            expiresIn: "15d",
        }
    );
    res.cookie("jwt",token,{
        maxAge: 15*24*60*60*1000,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development",
    });
};
