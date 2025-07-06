const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {
  db.query("SELECT * FROM Patients", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

router.post("/", (req, res) => {
  const { name, age, gender, bloodGroup, history, phone, date, doctor } = req.body;
  const sql = "INSERT INTO Patients (name, age, gender, blood_group, history, phone, visit_date, doctor) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  db.query(sql, [name, age, gender, bloodGroup, history, phone, date, doctor], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Patient added", id: result.insertId });
  });
});

router.delete("/:id", (req, res) => {
  db.query("DELETE FROM Patients WHERE patient_id = ?", [req.params.id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Patient deleted" });
  });
});

module.exports = router;
