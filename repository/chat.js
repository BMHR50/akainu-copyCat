const {Chat} = require("../models")
const Op = require('sequelize').Op

class ChatRepository {
    constructor() {
        this.Model = Chat
    }

    async getChatByRecipientID(recipient_id) {
        let results = []
        try {
            results = await this.Model.findAll({
                where: {
                    [Op.or]: [{recipient_id: recipient_id}, {sender_id: recipient_id}]
                },
                order: [
                    ["createdAt", "ASC"]
                ]
            })
        } catch (e) {
            console.error(e)
            return []
        }
        if(results === null) {
            return []
        }
        return results
    }

    async insertChat(chat_data) {
        let result = null

        try {
            result = await this.Model.create(chat_data)
        } catch (e) {
            console.error(e)
            return null
        }

        return result
    }
}

module.exports = ChatRepository