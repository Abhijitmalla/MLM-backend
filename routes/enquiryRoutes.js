import express from "express";
import {
    createEnquiry,
    getAllEnquiries
} from "../controllers/enquiryController.js";
import { authenticateAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", createEnquiry);
router.get("/all", authenticateAdmin, getAllEnquiries);

export default router;