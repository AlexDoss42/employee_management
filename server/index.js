const express = require('express');
const cors = require('cors');
const app = express();
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const { createEmployee, createTeam, createEmployeeAssignment } = require('./create');
const { getAllEmployees, getEmployeeById, getAllTeams, getTeamById } = require('./read');
const { updateEmployee, updateTeam } = require('./update');
const { deleteEmployee, deleteTeam, deleteEmployeeAssignment } = require('./delete');

var corsOptions = {
    origin:'http://example.com',
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
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

app.delete('/employee/:id', deleteEmployee);

app.delete('/team/:id', deleteTeam);

app.delete('/employeeassignment/:employee_id/:team_id', deleteEmployeeAssignment);


app.listen(3000, () => {
    console.log(`ITS WORKING!!!! IIITTTSSS WORKING!!!!!! on port 3000`);
});
