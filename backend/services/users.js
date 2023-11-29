const db = require('./db')
const helper = require('../helper')
const config = require('../config')


async function insertUser (req, res) {
    const data = req.query
    const result = await db.query(
        `INSERT INTO usuarios (nombre,login,password,rol) values ('${data.nombre}','${data.login}','${data.password}','${data.rol}')`
    )
    return result.affectedRows
}

async function getUsers (req, res) {
     
    const rows = await db.query(
        `SELECT * FROM usuarios`
    )
    const data = helper.emptyOrRows(rows)
    return {
        data
    }
}

module.exports = {
    getUsers,
    insertUser,
}
