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

app.post("/employeeassignment", async (req, res) => {
    try {
        const { employee_id, team_id } = req.body;
        const employeeAssignmentData = await pool.query("INSERT INTO EMPLOYEE_ASSIGNMENT(employee_id, team_id) VALUES($1, $2) RETURNING *", [employee_id, team_id]);
        res.json(employeeAssignmentData.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).json(error);
    }
});

app.get('/employees', async (req, res) => {
    try {
        const employeeData = await pool.query("SELECT * FROM EMPLOYEE");
        res.json(employeeData.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).json(error);
    }
});

app.get('/teams', async (req, res) => {
    try {
        const teamData = await pool.query("SELECT * FROM TEAM");
        res.json(teamData.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).json(error);
    }
});

app.get('/employee/:id', async (req, res) => {
    try {
        const { id } = req.params;
        let data = {};
        const employeeData = await pool.query("SELECT * FROM EMPLOYEE WHERE id = $1", [id]);
        const teams = await pool.query("SELECT * FROM TEAM WHERE ID IN (SELECT team_id from EMPLOYEE_ASSIGNMENT WHERE EMPLOYEE_ID=$1)", [id])
        data=employeeData.rows[0];
        if(data) {
            data.teams=teams.rows
        } else {
            data={
                info:"No employee data for this id"
            }
        }
        res.json(data);
    } catch (error) {
        console.error(error.message);
        res.status(500).json(error);
    }
});

app.get('/team/:id', async (req, res) => {
    try {
        const { id } = req.params;
        let data = {};
        const teamData = await pool.query("SELECT * FROM TEAM WHERE id = $1", [id]);
        const employees = await pool.query("SELECT * FROM EMPLOYEE WHERE ID IN (SELECT employee_id from EMPLOYEE_ASSIGNMENT WHERE TEAM_ID=$1)", [id])
        data=teamData.rows[0];
        if(data) {
            data.employees=employees.rows
        } else {
            data={
                info:"No team data for this id"
            }
        }
        res.json(data);
    } catch (error) {
        console.error(error.message);
        res.status(500).json(error);
    }
});


app.listen(3000, () => {
    console.log(`ITS WORKING!!!! IIITTTSSS WORKING!!!!!! on port 3000`);
});
