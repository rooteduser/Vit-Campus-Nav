require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./config/db");
const teacherRoutes = require("./routes/teacherRoutes");


const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/teachers", teacherRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
