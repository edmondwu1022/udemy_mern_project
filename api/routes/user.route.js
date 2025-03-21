import express from "express";
import { updateUser, user } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router()

router.get("/test", user)
router.post("/update/:id", verifyToken, updateUser)

export default router