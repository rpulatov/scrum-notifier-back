const { User } = require('../models/index')
const bcrypt = require('bcryptjs')
const Result = require('../utils/result')

export async function getById(req, res, next) {
    try {
        const user = await User.findByPk(req.params.id)

        if (!user) {
            const e = new Error('Пользователя с таким ID не существует')
            e.name = 'NotFoundError'
            throw e
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
        res.send(new Result(req.user.data))
    } catch (e) {
        next(e)
    }
}

export async function create(req, res, next) {
    try {
        const { username, password, roleId } = req.body
        console.log(username, password, roleId, req.body)
        const instance = await User.findOne({
            where: { username: username },
        })

        if (instance) {
            const e = new Error('Пользователь с таким логином существует')
            e.name = ''
            throw e
        }

        const user = await User.create({
            username: username,
            hash: bcrypt.hashSync(password, 10),
            roleId: roleId,
        })
        res.send(new Result(user))
    } catch (e) {
        next(e)
    }
}

export async function update(req, res, next) {
    try {
        const { username, password, roleId } = req.body
        const user = await User.findByPk(req.params.id)
        
        if (!user) {
            const e = new Error('Пользователя с таким ID не существует')
            e.name = 'NotFoundError'
            throw e
        }

        await user.update({
            username: username,
            hash: bcrypt.hashSync(password, 10),
            roleId: roleId,
        })
        res.send(new Result(project))
    } catch (e) {
        next(e)
    }
}

export async function drop(req, res, next) {
    try {
        const user = await User.findByPk(req.params.id)

        if (!user) {
            const e = new Error('Пользователя с таким ID не существует')
            e.name = 'NotFoundError'
            throw e
        }

        await user.destroy()
        res.send(new Result())
    } catch (e) {
        next(e)
    }
}
