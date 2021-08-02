const jwt = require('jsonwebtoken')
const { User } = require('../models/index')

module.exports = async function (req, res, next) {
    if (req.method === 'OPTIONS') {
        next()
    }

    try {
        if (!req.headers.authorization) {
            throw new Error('UnauthorizedError')
        }
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            throw new Error('UnauthorizedError')
        }
        const decodedData = jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                throw new Error('UnauthorizedError')
            }
            return decoded
        })
        const user = await User.findByPk(decodedData.id)
        if (!user) {
            throw new Error('UnauthorizedError')
        }
        req.user = user
        next()
    } catch (e) {
        console.log(e)
        next(e)
    }
}
