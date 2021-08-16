const { User, Project, sequelize } = require('../models/index')
const bcrypt = require('bcryptjs')
const Result = require('../utils/result')
const { Op } = require('sequelize')

export async function getById(req, res, next) {
    try {
        const user = await User.findByPk(req.params.id, { include: Project })

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
        const queries = []
        if (req.query.username) {
            queries.push({
                username: { [Op.iLike]: `%${req.query.username}%` },
            })
        }
        const users = await User.findAll({
            where: { [Op.and]: queries },
        })
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
    let transaction
    try {
        transaction = await sequelize.transaction()
        const { username, password, roleId, projectIds } = req.body
        const instance = await User.findOne({
            where: { username: username },
        })

        if (instance) {
            const e = new Error('Пользователь с таким логином существует')
            e.name = ''
            throw e
        }

        const user = await User.create(
            {
                username: username,
                hash: bcrypt.hashSync(password, 10),
                roleId: roleId,
            },
            { transaction: transaction },
        )

        if (projectIds) {
            projectIds.forEach((id) => {
                user.addProject(id, { transaction: transaction })
            })
        }

        await transaction.commit()

        res.send(new Result(user))
    } catch (e) {
        if (transaction) {
            await transaction.rollback()
        }
        next(e)
    }
}

export async function update(req, res, next) {
    let transaction
    try {
        transaction = await sequelize.transaction()
        const { username, password, roleId, projectIds } = req.body
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

        if (projectIds) {
            const projects = await user.getProjects()

            projects.forEach((project) => {
                if (!projectIds.includes(project.get().id)) {
                    project.userProject.destroy({ transaction: transaction })
                } else {
                    projectIds.splice(projectIds.indexOf(project.get().id), 1)
                }
            })

            projectIds.forEach((id) => {
                employee.addProject(id, { transaction: transaction })
            })
        }

        await transaction.commit()

        res.send(new Result(project))
    } catch (e) {
        if (transaction) {
            await transaction.rollback()
        }
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
