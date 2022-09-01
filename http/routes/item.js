const express = require('express')

function init(itemUC) {
    const router = express.Router()
    router.get('/', async (req, res) =>{
        let items = await itemUC.getProducts(null)
        if (items == null) {
            items = []
        }
        res.json(items)
    })

    router.get('/:id', async (req, res) =>{
        let id = req.params.id
        let item = await itemUC.getProductByID(id)
        if (item == null) {
            return res.status(400).json(null)
        }
        res.json(item)
    })

    return router
}
module.exports = init