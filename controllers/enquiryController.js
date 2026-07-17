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

export const updateEnquiryStatus = (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!["New", "Contacted"].includes(status)) {
        return res.status(400).json({
            success: false,
            message: "Invalid status"
        });
    }

    db.query(
        "UPDATE service_enquiries SET status=? WHERE id=?",
        [status, id],
        (err, result) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    error: err.message
                });
            }

            res.json({
                success: true,
                message: "Status updated successfully"
            });
        }
    );
};

export const getEnquiryStats = (req, res) => {

    const sql = `
        SELECT
            COUNT(*) AS total,
            SUM(status='New') AS pending,
            SUM(status='Contacted') AS contacted,
            SUM(DATE(created_at)=CURDATE()) AS today
        FROM service_enquiries
    `;

    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({
                success:false,
                error:err.message
            });
        }

        res.json({
            success:true,
            data:result[0]
        });
    });

};

export const deleteEnquiry = (req, res) => {
    const { id } = req.params;

    // Get the enquiry
    db.query(
        "SELECT * FROM service_enquiries WHERE id = ?",
        [id],
        (err, result) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    error: err.message
                });
            }

            if (result.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Enquiry not found"
                });
            }

            const enquiry = result[0];

            // Insert into archive table
            db.query(
                `INSERT INTO archive_enquiry
                (service_name, name, mobile, email, status, created_at)
                VALUES (?, ?, ?, ?, ?, ?)`,
                [
                    enquiry.service_name,
                    enquiry.name,
                    enquiry.mobile,
                    enquiry.email,
                    enquiry.status,
                    enquiry.created_at
                ],
                (err) => {
                    if (err) {
                        return res.status(500).json({
                            success: false,
                            error: err.message
                        });
                    }

                    // Delete from original table
                    db.query(
                        "DELETE FROM service_enquiries WHERE id = ?",
                        [id],
                        (err) => {
                            if (err) {
                                return res.status(500).json({
                                    success: false,
                                    error: err.message
                                });
                            }

                            res.json({
                                success: true,
                                message: "Enquiry archived successfully"
                            });
                        }
                    );
                }
            );
        }
    );
};

export const getArchivedEnquiries = (req, res) => {
    db.query(
        "SELECT * FROM archive_enquiry ORDER BY id DESC",
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