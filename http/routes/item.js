const express = require('express')

const router = express.Router()
router.get('/', async (req, res) =>{
    /*
        #swagger.summary = "Get List Product"
        #swagger.description = 'Get list product'
        #swagger.tags = ['Item']
        #swagger.responses[200] = {
            description: "Item found.",
            schema: [{$ref: '#definitions/Item'}]
        }
        #swagger.responses[400] = {
            description: "Item not found.",
            schema: null
        }
     */
    let items = await req.itemUC.getProducts(null)
    if (items == null) {
        items = []
    }
    res.json(items)
})

router.get('/:id', async (req, res) =>{
    /*
        #swagger.summary = "Get Product"
        #swagger.description = 'Get Product By ID'
        #swagger.tags = ['Item']
        #swagger.responses[200] = {
            description: "Item found.",
            schema: {$ref: '#definitions/Item'}
        }
        #swagger.responses[400] = {
            description: "Item not found.",
            schema: null
        }
     */
    let id = req.params.id
    let item = await req.itemUC.getProductByID(id)
    if (item == null) {
        return res.status(400).json(null)
    }
    res.json(item)
})


module.exports = router