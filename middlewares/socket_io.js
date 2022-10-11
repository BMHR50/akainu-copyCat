const jwt = require('jsonwebtoken')

const FAILED_MSG = 'socket authorization failed!'

function get_token(auth_header) {
    let header_split = auth_header.split(' ')
    if(header_split.length > 1) {
        return header_split[1]
    }
    return header_split[0]
}


function authorize(socket, next) {
    let auth_header = socket.handshake.headers['authorization']
    if(typeof auth_header !== "string") {
        return next(new Error(FAILED_MSG))
    }
    let token = get_token(auth_header)
    let payload = null
    try{
        payload = jwt.verify(token, process.env.JWT_SECRET)
    } catch (e) {
       return next(new Error(FAILED_MSG))
    }
    let auth = {
        user: payload.user,
        is_admin: payload.is_admin
    }
    socket.handshake.auth = auth
    next()
}

module.exports = authorize