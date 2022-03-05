const express = require('express');
const app = express();
const pool = require('./db');

app.use(express.json());

app.post("/employee", async (req, res) => {
    try {
        const { name, date_of_joining, designation, gender, email, bio } = req.body;
        const employeeData = await pool.query("INSERT INTO EMPLOYEE(name, date_of_joining, designation, gender, email, bio) VALUES($1, $2, $3, $4, $5, $6) RETURNING *", [name, date_of_joining, designation, gender, email, bio]);
        res.json(employeeData.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).json(error);
    }
});

app.post("/team", async (req, res) => {
    try {
        const { name, email, description } = req.body;
        const teamData = await pool.query("INSERT INTO TEAM(name, email, description) VALUES($1, $2, $3) RETURNING *", [name, email, description]);
        res.json(teamData.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).json(error);
    }
});


app.listen(3000, () => {
    console.log(`ITS WORKING!!!! IIITTTSSS WORKING!!!!!! on port 3000`);
});
