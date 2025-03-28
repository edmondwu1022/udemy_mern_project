import express from 'express';
import { createListing, deleteListing, getListing, updateListing } from '../controllers/listing.controller.js';
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router();

router.post("/create", createListing)
router.delete("/delete/:id", verifyToken, deleteListing)
router.post("/update/:id", verifyToken, updateListing)
// maybe remove verifyToken
router.get("/getListing/:id", verifyToken, getListing)

export default router;