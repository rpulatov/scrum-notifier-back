const db = require('../models/index')
const bcrypt = require('bcryptjs')

class userController {

    async getById(req, res) {
        try {
            const user = await db.User.findByPk(req.params.id)
            if (!user) {
                res.status(400).json({ message: "Пользователя с таким ID не существует" })
            }
            res.status(200).json(user)
        } catch (e) {
            console.log(e)
            res.status(400).json({ message: `Error: ${e.message}` })
        }
    }


    async getAll(req, res) {
        try {
            const users = await db.User.findAll()
            res.status(200).json(users)
        } catch (e) {
            console.log(e)
            res.status(400).json({ message: `Error: ${e.message}` })
        }
    }


    async create(req, res) {
        try {
            const { username, password } = req.body
            const instance = await db.User.findOne({
                where: { username: username }
            })
            if (instance) {
                res.status(400).json({ message: "Пользователь с таким логином уже существует" })
            } else {
                const user = await db.User.create({
                    username: username,
                    hash: bcrypt.hashSync(password, 10)
                })
                res.status(200).json(user)
            }
        } catch (e) {
            console.log(e)
            res.status(400).json({ message: `Error: ${e.message}` })
        }

    }


    async update(req, res) {
        try {
            const user = await db.User.findByPk(req.params.id)
            if (user) {
                await user.update(req.body)
                res.status(200).json(user)
            } else {
                res.status(400).json({ message: "Пользователя с таким ID не существует" })
            }
        } catch (e) {
            console.log(e)
            res.status(400).json({ message: `Error: ${e.message}` })
        }
    }


    async delete(req, res) {
        try {
            const user = await db.User.findByPk(req.params.id)

            if (!user) {
                res.status(400).json({ message: "Пользователя с таким ID не существует" })
            }

            await user.destroy()
            res.status(200).json({ message: "Deleted" })
        } catch (e) {
            console.log(e)
            res.status(400).json({ message: `Error: ${e.message}` })
        }
    }

}

module.exports = new userController()