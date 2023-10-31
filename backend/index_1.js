const express = require('express')
const cors = require('cors')

const app = express()

const port = 3030

app.get('/', function (req, res) {
    res.json({message: 'Hola Mundo!'})
})

app.listen(port);

console.log('API escuchando desde el puerto ' + port)