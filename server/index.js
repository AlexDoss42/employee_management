const express = require('express');
const app = express();
const { createEmployee, createTeam, createEmployeeAssignment } = require('./create');


app.use(express.json());

app.post("/employee", createEmployee);

app.post("/team", createTeam);

app.post("/employeeassignment", createEmployeeAssignment);

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

app.put('/employee/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, date_of_joining, designation, gender, email, bio } = req.body;
        const employeeData = await pool.query("UPDATE EMPLOYEE SET name=$1, date_of_joining=$2, designation=$3, gender=$4, email=$5, bio=$6 WHERE id=$7 RETURNING *", [name, date_of_joining, designation, gender, email, bio, id]);
        res.json(employeeData.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).json(error);
    }
});

app.put('/team/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, description } = req.body;
        const teamData = await pool.query("UPDATE TEAM SET name=$1, email=$2, description=$3 WHERE id=$4 RETURNING *", [name, email, description, id]);
        res.json(teamData.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).json(error);
    }
});

app.delete('/employee/:id', async (req, res) => {
    try {
        const { id } = req.params;
        let data={};
        const employeeAssignmentData = await pool.query("DELETE from EMPLOYEE_ASSIGNMENT where employee_id=$1 returning *", [id]);
        const employeeData = await pool.query("DELETE from EMPLOYEE where id = $1 returning *", [id]);
        data=employeeData.rows[0];
        if(data){
            data.teams=employeeAssignmentData.rows
        } else {
            data={
                info: "no employee to delete."
            }
        }
        res.json(data);
    } catch (error) {
        console.error(error.message);
        res.status(500).json(error);
    }
});

app.delete('/team/:id', async (req, res) => {
    try {
        const { id } = req.params;
        let data={};
        const employeeAssignmentData = await pool.query("DELETE from EMPLOYEE_ASSIGNMENT where team_id=$1 returning *", [id]);
        const teamData = await pool.query("DELETE from TEAM where id = $1 returning *", [id]);
        data=teamData.rows[0];
        if(data){
            data.employees=employeeAssignmentData.rows
        } else {
            data={
                info: "no team to delete."
            }
        }
        res.json(data);
    } catch (error) {
        console.error(error.message);
        res.status(500).json(error);
    }
});

app.delete('/employeeassignment/:employee_id/:team_id', async (req, res) => {
    try {
        const { employee_id, team_id } = req.params;
        const employeeAssignmentData = await pool.query("DELETE from EMPLOYEE_ASSIGNMENT where employee_id=$1 and team_id=$2 returning *", [employee_id, team_id]);
        res.json(employeeAssignmentData.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).json(error);
    }
});


app.listen(3000, () => {
    console.log(`ITS WORKING!!!! IIITTTSSS WORKING!!!!!! on port 3000`);
});
