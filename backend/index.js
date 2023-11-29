//importo el express y el cors
const express = require('express')
const cors = require('cors')
//importo el fichero login.js que está en la carpeta services
const login = require('./services/login')
const items = require('./services/items')
const users = require('./services/users')

//Definimos el puerto por que va a escuchar nuestra API las peticiones
const port  = 3030

const app = express()
app.use(express.json())
app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(cors())



//Ejemplo para ver cómo funciona un endpoint:
//este endpoint es / y devuelve un mensaje
app.get('/', function (req, res) {
    res.json({message: 'Hola Mundo!'})
})

//Creación del endpoint /login
//llama al fichero login.js usando el método getUserData pasándole
//el login (user) y la contraseña (password)
app.get('/login', async function(req, res, next) {
    console.log(req.query)
    try {
        res.json(await login.getUserData(req.query.user, req.query.password))
    } catch (err) {
        console.error(`Error while getting data `, err.message);
        next(err);
    }
})

app.get('/insert', async function(req,res,next) {
    try {
        res.json(await items.insertData(req))
    } catch (err) {
        console.error(`Error while inserting data`, err.message)
        next(err)
    }
})

app.get('/delete', async function(req,res,next) {
    try {
        res.json(await items.deleteData(req))
    }catch (err) {
        console.error(`Error while deleting data`, err.message)
        next(err)
    }
})

app.get('/select', async function(req,res,next) {
    try {
        res.json(await items.getData())
    } catch (err) {
        console.error(`Error while getting data`, err.message)
        next(err)
    }
})

app.get('/usuarios/select', async function(req,res,next) {
    try {
        res.json(await users.getUsers())
    } catch (err) {
        console.log('Error while getting data', err.message)
        next(err)
    }
})

app.get('/usuarios/insert', async function(req,res,next) {
    try {
        res.json(await users.insertUser(req))
    } catch (err) {
        console.error(`Error while inserting data`, err.message)
        next(err)
    }
})

//Iniciamos la API
app.listen(port)
console.log('API escuchando en el puerto ' + port)