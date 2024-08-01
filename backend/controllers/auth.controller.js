import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookies } from "../lib/utils/generateToken.js";

const SendErrorMessage = (res, statusCode, message) => {
    return res.status(statusCode).json({
        error: message
    });
};

export const signup = async (req, res) => {
    try{
        const { fullName, username, email, password} = req.body;
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

        if (!emailRegex.test(email)){
            return res.status(400).json({
                error: "Invalid email format"
            });
        }
        //Check the functionality of Promise.all
        const [existingeEmail, existingUsername] = await Promise.all([
            User.findOne({ username }),
            User.findOne({ email })
        ]);

        if(existingUsername){
            return SendErrorMessage(res,400, "Username already exists");
        }
        
        if(existingeEmail){
            return SendErrorMessage(res,400, "Email already exists");
        }

        if(password.length < 8){
            return SendErrorMessage(res,400, "Password should be at least 8 characters long");
        }
        //hash passwords
        const salt = await bcrypt.genSalt(20);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new User({
            fullName,
            username,
            email,
            password: hashedPassword,
        });

        if(newUser){
            generateTokenAndSetCookies(newUser._id,res);
            await newUser.save();
            
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                email: newUser.email,
                followers: newUser.followers,
                following: newUser.following,
                profileImg: newUser.profileImg,
                coverImg: newUser.coverImg,
            });
        } else {
            SendErrorMessage(res, 400, "Invalid User Data");
        }
    } catch (error) {
        console.log(`Error occured while signing up: ${error}`);
        return SendErrorMessage(res,500,"Internal server error");
    }
};

export const login = async (req,res) => {    
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        const passwordConfirmation = await bcrypt.compare(password, user?.password || "");

        if (!user ||!passwordConfirmation) {
            return SendErrorMessage(res, 401, "Invalid credentials");
        }

        generateTokenAndSetCookies(user._id, res);
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            email: user.email,
            followers: user.followers,
            following: user.following,
            profileImg: user.profileImg,
            coverImg: user.coverImg,
        })

    } catch (error) {
        console.log(`Error occured while logging in: ${error}`);
        return SendErrorMessage(res,500,"Internal server error");
    }
};

export const logout = async (req,res) => {
    try {
        res.cookie("jwt","",{
            maxAge: 0
        });
        res.status(200).json({
            message: "Logged out successfully"
        });
    } catch (error) {
        console.log(`Error occured while logging out: ${error}`);
        return SendErrorMessage(res,500,"Internal server error");
    }
};

export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        res.status(200).json(user);
    } catch (error) {
        console.log(`Error occured while gete: ${error}`);
        return SendErrorMessage(res,500,"Internal server error");
    }
}