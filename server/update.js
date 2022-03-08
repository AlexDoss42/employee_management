const pool = require('./db');

exports.updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, date_of_joining, designation, gender, email, bio } = req.body;
        const employeeData = await pool.query("UPDATE EMPLOYEE SET name=$1, date_of_joining=$2, designation=$3, gender=$4, email=$5, bio=$6 WHERE id=$7 RETURNING *", [name, date_of_joining, designation, gender, email, bio, id]);
        res.json(employeeData.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).json(error);
    }
};

exports.updateTeam = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, description } = req.body;
        const teamData = await pool.query("UPDATE TEAM SET name=$1, email=$2, description=$3 WHERE id=$4 RETURNING *", [name, email, description, id]);
        res.json(teamData.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).json(error);
    }
};