const express = require('express')
const app = express()

// import repositories and use cases
const ItemRepository = require('../repository/item')
const ItemUseCase = require('../usecase/item')

// import routers
const itemRouter = require('./routes/item')

// init repositories and use cases
const itemUC = new ItemUseCase(new ItemRepository())

app.get('/', function (req, res) {
    res.send('Hello World')
})

// init routers
app.use('/item', itemRouter(itemUC))

module.exports = app

