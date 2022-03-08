const express = require('express');
const cors = require('cors');
const app = express();
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const { createEmployee, createTeam, createEmployeeAssignment } = require('./create');
const { getAllEmployees, getEmployeeById, getAllTeams, getTeamById } = require('./read');
const { updateEmployee, updateTeam } = require('./update');
const { deleteEmployee, deleteTeam, deleteEmployeeAssignment } = require('./delete');

const swaggerOptions={
    definition: {
        openapi:'3.0.0',
        info:{
            title:'Employee Management API',
            version: '1.0.0',
            description: 'Employe API for employee management',
            contact: {
                name: 'Alex Doss',
                email: 'example@doss.com'
            },
            servers:["http://localhost:3000"]
        }
    },
    apis:["index.js"]
};
const swaggerDocs=swaggerJSDoc(swaggerOptions);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

var corsOptions = {
    origin:'http://example.com',
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.use(express.json());

/**
 * @swagger
 * definitions:
 *  Employee:
 *      type:object
 *      properties:
 *          name: 
 *              type:string
 *              description: name of the employee
 *              example: 'Alex Doss'
 *          date_of_joining: 
 *              type:string
 *              description: date of joining the company
 *              example: '2022-02-22'
 *          date_of_joining: 
 *              type:string
 *              description: date of joining the company
 *              example: '2022-02-22'
 */

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
