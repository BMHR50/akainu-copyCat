const express = require('express')

function init(itemUC) {
    const router = express.Router()
    router.get('/', async (req, res) =>{
        /*
            #swagger.tags = ['Item', 'Public']
            #swagger.responses[200] = {
                description: 'User successfully obtained.',
                schema: [{$ref: '#/definitions/Item'}]
            }
            #swagger.security = [{
               "bearerAuth": []
            }]
         */
        let items = await itemUC.getProducts(null)
        if (items == null) {
            items = []
        }
        res.json(items)
    })

    router.get('/:id', async (req, res) =>{
        /*
            #swagger.tags = ['Item', 'Public']
            #swagger.responses[200] = {
                description: 'Item found.',
                schema: { $ref: '#/definitions/Item'}
            }

            #swagger.responses[400] = {
               description: 'Item not found.',
               schema: null
           }
        */
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