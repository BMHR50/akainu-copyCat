module.exports = {
    list: async (req, res) => {
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
    },
    getById: async (req, res) => {
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
    },
    delete: async (req, res) => {
        let res_data = {
            status: 'ok',
            message: "",
            data: null
        }

        let id = req.params.id
        await req.itemUC.deleteItem(id)
        res.json(res_data)
    },
    create: async (req, res) => {
        let res_data = {
            status: 'failed',
            message: "",
            data: null
        }

        let item = {
            name: req.body.name,
            price: req.body.price,
            category: req.body.category
        }

        item = await req.itemUC.createItem(item)
        if (item == null) {
            return res.status(400).json(res_data)
        }

        res_data.status = 'success'
        res_data.data = item
        res.json(res_data)
    }
}