import express from "express";
import cors from "cors";
import db from "./config/db.js";

 import enquiryRoutes from "./routes/enquiryRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/enquiry", enquiryRoutes);

app.get("/", (req, res) => {
    res.send("API is running...");
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});