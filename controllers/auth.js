const { User } = require('../models/index')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Result = require('../utils/result')

export async function signin(req, res, next) {
    try {
        const result = new Result()
        const { username, password } = req.body
        const instance = await User.findOne({
            where: { username: username },
        })
        if (instance) {
            const user = instance.get({ plain: true })
            if (bcrypt.compareSync(password, user.hash)) {
                const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                    expiresIn: '30h',
                })
                result.setData({ user: user, token: token })
            } else {
                throw new Error('Не верный логин или пароль')
            }
        } else {
            throw new Error('Не верный логин или пароль')
        }
        res.send(result)
    } catch (e) {
        next(e)
    }
}
