const express = require('express')

const itemController = require('../controllers/item')
const router = express.Router()

router.get('/', itemController.list)
router.get('/:id', itemController.getById)
// delete item [unfinished]
router.delete('/:id', itemController.delete)
router.post('', itemController.create)

module.exports = router