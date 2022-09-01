const {Item} = require("../models")

class ItemRepository {
    constructor() {
        this.ItemModel = Item
    }

    async getProductByID(id) {
        let data = null
        try {
            data = await this.ItemModel.findOne({
                where: {
                    id: id
                }
            })
        } catch (err) {
            console.log(err)
            return null
        }
        return data
    }

    async getProducts(filters) {
        if (filters != null) {
            return await this.ItemModel.findAll({
                where: filters
            })
        }

        return await this.ItemModel.findAll()
    }
}

module.exports = ItemRepository