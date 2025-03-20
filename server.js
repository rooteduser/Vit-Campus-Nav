require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public")); // Serve static files (HTML, CSS, JS)

// Database connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
        process.exit(1); // Stop server if DB connection fails
    }
    console.log("Connected to MySQL");
});


app.use(express.static(path.join(__dirname, 'public')));

// Request for respective parts.
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/map/index.html'));
});

app.get('/faculty', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/faculty/faculty.html'));
});

app.get('/campus-tour', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/campus-tour/tour.html'));
});


// Search for teacher names (for search suggestions)
app.get("/api/teacher/suggestions", (req, res) => {
    const name = req.query.name;
    if (!name) return res.json([]); // Return empty array if no input

    const sql = "SELECT name FROM teachers WHERE name LIKE ? LIMIT 5";
    db.query(sql, [`%${name}%`], (err, result) => {
        if (err) {
            console.error("Error fetching suggestions:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        res.json(result.map(row => row.name)); // Return only names
    });
});

// Get full teacher details (excluding NULL room_and_wing)
app.get("/api/teacher", (req, res) => {
    const name = req.query.name;
    if (!name) return res.status(400).json({ error: "Name parameter is required" });

    const sql = `
        SELECT name, room_and_wing, cabin_no, floor 
        FROM teachers 
        WHERE name LIKE ? 
        AND room_and_wing IS NOT NULL
    `;
    
    db.query(sql, [`%${name}%`], (err, result) => {
        if (err) {
            console.error("Error fetching teacher details:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        res.json(result);
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
