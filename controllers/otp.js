module.exports = {
    generateOTP: async (req, res) => {
        let otp_type = req.body['otp_type']
        let email = req.body['email']

        // check if there is valid OTP
        let otp = await req.otpUC.getOTPByEmail(email)
        if(otp !== null) {
            return res.status(400).json({
                message: "wait until: " + otp.expired_at
            })
        }

        await req.otpUC.generateOTP(email,otp_type)

        res.json({
            message: "check your email!"
        })
    },
    verifyOTP: async (req, res) => {
        let otp_code = req.query['otp_code']
        let otp_type = req.query['otp_type']
        let email = req.query['email']

        let otp = await req.otpUC.verifyOTP(email,otp_code,otp_type)
        if(otp === null) {
            return res.status(400).json({
                message: "invalid otp"
            })
        }

        res.json({
            message: "otp valid!"
        })
    }
}