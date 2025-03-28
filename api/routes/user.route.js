import express from "express";
import { deleteUser, getUserListings, updateUser, user } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router()

router.get("/test", user)
router.post("/update/:id", verifyToken, updateUser)
router.delete("/delete/:id", verifyToken, deleteUser)
router.get("/listings/:id", verifyToken, getUserListings)

export default router