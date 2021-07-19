const db = require('../models/index')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class authController {

    async signin(req, res) {
        try {
            /*await db.User.create({
                username: "admin",
                hash: bcrypt.hashSync("1234", 10)
            })*/
            const { username, password } = req.body
            const instance = await db.User.findOne({
                where: { username: username }
            })
            if (instance) {

                const user = instance.get({ plain: true })
                if (bcrypt.compareSync(password, user.hash)) {
                    const token = jwt.sign({ id: user.id, role: user.roleId }, process.env.JWT_SECRET, { expiresIn: '30h' })
                    res.status(200).json({ user: user, token: token })
                } else {
                    res.status(400).json({ message: "Не верный логин или пароль" })
                }
            } else {
                res.status(400).json({ message: `Не верный логин или пароль` })
            }
        } catch (e) {
            console.log(e)
            res.status(400).json({ message: `username error: ${e.message}` })
        }

    }
}

module.exports = new authController()