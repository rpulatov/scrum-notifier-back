const jwt = require('jsonwebtoken')
const { User } = require('../models/index')

module.exports = async function (req, res, next) {
    if (req.method === 'OPTIONS') {
        next()
    }

    try {
        if (!req.headers.authorization) {
            const e = new Error()
            e.name = 'UnauthorizedError'
            throw e
        }

        const token = req.headers.authorization.split(' ')[1]
        
        if (!token) {
            const e = new Error()
            e.name = 'UnauthorizedError'
            throw e
        }

        const decodedData = jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                const e = new Error()
                e.name = 'UnauthorizedError'
                throw e
            }
            return decoded
        })
        const user = await User.findByPk(decodedData.id)
        
        if (!user) {
            const e = new Error()
            e.name = 'UnauthorizedError'
            throw e
        }
        req.user = decodedData
        req.user.data = user
        next()
    } catch (e) {
        console.log(e)
        next(e)
    }
}
