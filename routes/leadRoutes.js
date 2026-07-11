import express from "express";
import { convertToLead, getAllLeads } from "../controllers/leadController.js";

const router = express.Router();

router.post("/convert/:id", convertToLead);
router.get("/all", getAllLeads);


export default router;