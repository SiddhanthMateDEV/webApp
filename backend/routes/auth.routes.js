import express from "express";
import { signup, logout, login , getMe} from "../controllers/auth.controller.js";

import { protectRoute } from "../middleWare/protectRoute.js";

const router = express.Router();

router.get("/me",protectRoute,getMe);
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);



export default router;