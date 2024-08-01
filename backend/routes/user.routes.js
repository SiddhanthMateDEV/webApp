import express from "express";
import { protectRoute } from "../middleWare/protectRoute.js";
import { followUnfollow, getUserProfile } from "../controllers/user.controller.js";


const router = express.Router();

router.get("/profile/:username", protectRoute, getUserProfile);
// router.get("/suggested",protectRoute ,getUserProfile);
router.get("/follow/:id", protectRoute,followUnfollow);
// router.get("/update", protectRoute, updateUserProfile);


export default router;