const express = require('express')
const otpCtrl = require('../controllers/otp')

const router = express.Router()

router.get('/verify', otpCtrl.verifyOTP)
router.post('/request', otpCtrl.generateOTP)


module.exports = router