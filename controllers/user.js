const { User } = require('../models/index')
const bcrypt = require('bcryptjs')
const Result = require('../utils/result')

export async function getById(req, res, next) {
    try {
        const user = await User.findByPk(req.params.id)
        if (!user) {
            throw new Error('Пользователя с таким ID не существует')
        }
        res.send(new Result(user))
    } catch (e) {
        next(e)
    }
}

export async function getAll(req, res, next) {
    try {
        const users = await User.findAll()
        res.send(new Result(users))
    } catch (e) {
        next(e)
    }
}

export async function getMe(req, res, next) {
    try {
        res.send(new Result(req.user))
    } catch (e) {
        next(e)
    }
}

export async function create(req, res, next) {
    try {
        const result = new Result()
        const { username, password, roleId } = req.body
        console.log(username, password, roleId, req.body)
        const instance = await User.findOne({
            where: { username: username },
        })
        if (instance) {
            throw new Error('Пользователь с таким логином уже существует')
        } else {
            const user = await User.create({
                username: username,
                hash: bcrypt.hashSync(password, 10),
                roleId: roleId,
            })
            result.setData(user)
        }
        res.send(result)
    } catch (e) {
        next(e)
    }
}

export async function update(req, res, next) {
    try {
        const result = new Result()
        const user = await User.findByPk(req.params.id)
        if (user) {
            await user.update(req.body)
            result.setData(user)
        } else {
            throw new Error('Пользователя с таким ID не существует')
        }
        res.send(result)
    } catch (e) {
        next(e)
    }
}

export async function drop(req, res, next) {
    try {
        const user = await User.findByPk(req.params.id)

        if (!user) {
            throw new Error('Пользователя с таким ID не существует')
        }

        await user.destroy()
        res.send(new Result())
    } catch (e) {
        next(e)
    }
}
