const express = require('express')
const mongoose = require('mongoose')
const app = express()

const createRouter = require('./routes/create')
const readRouter = require('./routes/read')
const updateRouter = require('./routes/update')
const deleteRouter = require('./routes/delete')


const port = process.env.PORT || 8080

app.use(express.json())
app.use('/', createRouter)
app.use('/', readRouter)
app.use('/', updateRouter)
app.use('/', deleteRouter)

//Empty for git

app.listen(port, () =>
{
    console.log("Listening on port ", port)
})

