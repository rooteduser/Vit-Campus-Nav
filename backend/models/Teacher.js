const db = require("../config/db");

const Teacher = {
    getAll: (callback) => {
        db.query("SELECT * FROM teacher_cabins", callback);
    },
    getByName: (name, callback) => {
        db.query("SELECT * FROM teacher_cabins WHERE name LIKE ?", [`%${name}%`], callback);
    },
};

module.exports = Teacher;
