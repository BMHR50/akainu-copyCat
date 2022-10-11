class Chat {
    constructor(chatRepository) {
        this.chatRepository = chatRepository
    }

    async getChats(recipient_id) {
        let chats = []
        let chat_indexes = {}
        let results = await this.chatRepository.getChatByRecipientID(recipient_id)
        for (let i = 0; i < results.length; i++) {
            let chatTemp = {
                ...results[i].get(),
                sender_detail: null, // TODO: get user details
                is_sender: false
            }
            if(chatTemp.sender_id === recipient_id) {
                chatTemp.is_sender = true
            }

            let index = chat_indexes[`${chatTemp.sender_id}_${chatTemp.recipient_id}`]
            if(typeof index !== "number") {
                let temp = {
                    sender_id: chatTemp.sender_id,
                    recipient_id: chatTemp.recipient_id,
                    last_chat: chatTemp.createdAt,
                    chats: [chatTemp]
                }
                chats.push(temp)
                chat_indexes[`${chatTemp.sender_id}_${chatTemp.recipient_id}`] = chats.length - 1
            } else {
                chats[index].last_chat = chatTemp.createdAt
                chats[index].chats.push(chatTemp)
            }
        }
        return chats
    }

    async insertChat(chat_data) {
        let result = await this.chatRepository.insertChat(chat_data)
        if(result === null) {
            return null
        }

        return {
            ...result.get(),
            is_sender: true
        }
    }
}

module.exports = Chat