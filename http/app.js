const express = require('express')
const app = express()

// import repositories and use cases
const ItemRepository = require('../repository/item')
const ItemUseCase = require('../usecase/item')

// import routers
const itemRouter = require('./routes/item')

// init repositories and use cases
const itemUC = new ItemUseCase(new ItemRepository())

// inject use cases
app.use((req,res,next) => {
    req.itemUC = itemUC
    next()
})

app.get('/', function (req, res) {
    // #swagger.ignore = true
    res.send('Hello World')
})

// init routers
app.use('/item', itemRouter)

// documentation
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../docs/docs.json');

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app

