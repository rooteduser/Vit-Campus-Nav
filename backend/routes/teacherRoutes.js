const express = require("express");
const router = express.Router();
const Teacher = require("../models/Teacher");

// Get all teachers
router.get("/", (req, res) => {
    Teacher.getAll((err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Search for a teacher by name
router.get("/search", (req, res) => {
    const { name } = req.query;
    Teacher.getByName(name, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

module.exports = router;
