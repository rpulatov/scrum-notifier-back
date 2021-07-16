const db = require('../models/index')
const bcrypt = require('bcryptjs')

class authController {

    async login(req, res) {
        try {
            /*await db.User.create({
                email: "admin",
                hash: bcrypt.hashSync("1234", 10)
            })*/
            const { email, password } = req.body
            var instance = await db.User.findOne({
                where: { email: email }
            })
            if (instance) {
                const user = instance.get({ plain: true })
                if (bcrypt.compareSync(password, user.hash)) {
                    //Тут создание JWT и отправка его на клиент...


                } else {
                    res.status(400).json({ message: "Не верный пароль" })
                }
            } else {
                res.status(400).json({ message: `Пользователь не найден` })
            }
        } catch (e) {
            console.log(e)
            res.status(400).json({ message: "Login error" })
        }

    }
}

module.exports = new authController()