const express = require('express');
const app = express();
const { createEmployee, createTeam, createEmployeeAssignment } = require('./create');
const { getAllEmployees, getEmployeeById, getAllTeams, getTeamById } = require('./read');
const { updateEmployee, updateTeam } = require('./update');


app.use(express.json());

app.post("/employee", createEmployee);

app.post("/team", createTeam);

app.post("/employeeassignment", createEmployeeAssignment);

app.get('/employees', getAllEmployees);

app.get('/teams', getAllTeams);

app.get('/employee/:id', getEmployeeById);

app.get('/team/:id', getTeamById);

app.put('/employee/:id', updateEmployee);

app.put('/team/:id', updateTeam);

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
