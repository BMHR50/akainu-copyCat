const express = require('express')
const chatController = require('../controllers/chat')
const authorize = require('../middlewares/jwt')

const router = express.Router()

router.get('/', authorize, chatController.get_chats)


module.exports = router