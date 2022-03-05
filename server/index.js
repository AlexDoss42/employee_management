const express = require('express');
const app = express();
const pool = require('./db');

app.use(express.json());

app.post("/employee", async (req, res) => {
    try {
        const { name, date_of_joining, designation, gender, email, bio } = req.body;
        const employeeData = await pool.query("INSERT INTO EMPLOYEE(name, date_of_joining, designation, gender, email, bio) VALUE($1, $2, $3, $4, $5, $6)", [name, date_of_joining, designation, gender, email, bio]);
        res.json(req.body);
    } catch (error) {
        res.status(500).json(error);
    }
});


app.listen(3000, () => {
    console.log(`ITS WORKING!!!! IIITTTSSS WORKING!!!!!! on port 3000`);
});
