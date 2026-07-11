import db from "../config/db.js";

export const convertToLead = (req, res) => {
    const { id } = req.params;

    // Get enquiry by ID
    db.query(
        "SELECT * FROM service_enquiries WHERE id = ?",
        [id],
        (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            if (results.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Enquiry not found"
                });
            }

            const enquiry = results[0];

            // Insert into leads table
            const insertQuery = `
                INSERT INTO leads
                (service_name, name, mobile, email)
                VALUES (?, ?, ?, ?)
            `;

            db.query(
                insertQuery,
                [
                    enquiry.service_name,
                    enquiry.name,
                    enquiry.mobile,
                    enquiry.email
                ],
                (insertErr) => {

                    if (insertErr) {
                        return res.status(500).json({
                            success: false,
                            message: insertErr.message
                        });
                    }

                    // Delete from enquiry table
                    db.query(
                        "DELETE FROM service_enquiries WHERE id = ?",
                        [id],
                        (deleteErr) => {

                            if (deleteErr) {
                                return res.status(500).json({
                                    success: false,
                                    message: deleteErr.message
                                });
                            }

                            res.status(200).json({
                                success: true,
                                message: "Lead created successfully."
                            });

                        }
                    );

                }
            );
        }
    );
};

export const getAllLeads = (req, res) => {
    const sql = "SELECT * FROM leads ORDER BY id DESC";

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.status(200).json({
            success: true,
            data: results
        });
    });
};