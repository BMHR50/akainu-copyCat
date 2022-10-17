module.exports = {
    login: async (req, res) => {
        let res_data = {
            status: 'failed',
            message: "",
            data: null
        }
        let email = req.body.email
        let password = req.body.password

        let login_data = await req.authUC.login(email, password)
        if(!login_data.is_success) {
            res_data.message = login_data.reason
            return res.status(400).json(res_data)
        }
        res_data.status = 'success'
        res_data.data = login_data.data
        res_data.message = 'ok'

        res.json(res_data)
    },
    register: async (req,res) => {
        let res_data = {
            status: 'failed',
            message: "",
            data: null
        }
        let user_data = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            address: req.body.address
        }

        let otp = await req.otpUC.verifyOTP(user_data.email,req.body.otp_code,"REGISTRATION")
        if(otp === null) {
            return res.status(400).json({
                message: "invalid otp!"
            })
        }

        let register_data = await req.authUC.register(user_data)
        if(!register_data.is_success) {
            res_data.message = register_data.reason
            return res.status(400).json(res_data)
        }

        res_data.status = 'success'
        res_data.message = 'ok'
        res_data.data = register_data.data

        await req.otpUC.deleteAllOTP(user_data.email)

        res.json(res_data)
    }
}