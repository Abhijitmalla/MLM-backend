import db from "../config/db.js";

export const createEnquiry = (req, res) => {
    const { service_name, name, mobile, email } = req.body;

    if (!service_name || !name || !mobile || !email) {
        return res.status(400).json({
            success: false,
            message: "All fields are required."
        });
    }

    const sql = `
        INSERT INTO service_enquiries
        (service_name, name, mobile, email)
        VALUES (?, ?, ?, ?)
    `;

    db.query(sql, [service_name, name, mobile, email], (err, result) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Database Error",
                error: err.message
            });
        }

        res.status(201).json({
            success: true,
            message: "Enquiry submitted successfully."
        });
    });
};

export const getAllEnquiries = (req, res) => {
    db.query(
        "SELECT * FROM service_enquiries ORDER BY id DESC",
        (err, result) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    error: err.message
                });
            }

            res.json({
                success: true,
                data: result
            });
        }
    );
};