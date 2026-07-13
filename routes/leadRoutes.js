import express from "express";
import { convertToLead, getAllLeads, updateLeadStatus, updateLeadAmount } from "../controllers/leadController.js";

const router = express.Router();

router.post("/convert/:id", convertToLead);
router.get("/all", getAllLeads);
router.put("/status/:id", updateLeadStatus);
router.put("/amount/:id", updateLeadAmount);

export default router;