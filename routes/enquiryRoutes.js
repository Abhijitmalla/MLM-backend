import express from "express";
import {
    createEnquiry,
    getAllEnquiries
} from "../controllers/enquiryController.js";

const router = express.Router();

router.post("/create", createEnquiry);
router.get("/all", getAllEnquiries);

export default router;