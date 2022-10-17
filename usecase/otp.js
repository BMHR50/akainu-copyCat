const email_message = {
    REGISTRATION: {
        text_value: "your otp code: {otp}",
        html_value: "<b>your otp code: {otp} </b>"
    },
}

class Otp {
    constructor(otpRepo, emailRepo) {
        this.otpRepo = otpRepo
        this.emailRepo = emailRepo
    }

    async generateOTP(email, otp_type) {
        let content = email_message[otp_type.toUpperCase()]
        if (typeof content === "undefined") {
            return null
        }
        let otp = await this.otpRepo.generateOTP(email, otp_type)
        let txt = content.text_value.replace('{otp}', otp.otp_code)
        let html = content.html_value.replace('{otp}', otp.otp_code)
        await this.emailRepo.SendEmail('OTP Code', email, txt, html)

        return null
    }

    async verifyOTP(email, otp_code, otp_type) {
        return await this.otpRepo.getOTP(email, otp_code, otp_type)
    }

    async getOTPByEmail(email) {
        return await this.otpRepo.getOTPByEmail(email)
    }

    async deleteAllOTP(email) {
        await this.otpRepo.deleteAllOtp(email)
    }

}

module.exports = Otp