import express from "express";
import cors from "cors";
import db from "./config/db.js";
import dotenv from "dotenv";
dotenv.config();

 import enquiryRoutes from "./routes/enquiryRoutes.js";
import leadRoutes from "./routes/leadRoutes.js";
import adminRoutes from "./routes/adminRoutes.js"
const app = express();

app.use(
  cors({
    origin: [
      "http://127.0.0.1:5501",
      "http://localhost:5501",
      "http://localhost:5000",
      "http://127.0.0.1:5000",
      "https://vkservicesenterprise.in",
      "https://www.vkservicesenterprise.in",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/enquiry", enquiryRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/admin", adminRoutes);


app.get("/", (req, res) => {
    res.send("API is running...");
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});