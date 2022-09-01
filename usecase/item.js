class Item {
    constructor(itemRepository) {
        this.itemRepository = itemRepository
    }

    async getProductByID(id) {
        return await this.itemRepository.getProductByID(id)
    }

    async getProducts(filters) {
        return await this.itemRepository.getProducts(filters)
    }
}

module.exports = Item;