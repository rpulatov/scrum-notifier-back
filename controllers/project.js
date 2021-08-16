const { Project } = require('../models/index')
const Result = require('../utils/result')
const { Op } = require('sequelize')

export async function getById(req, res, next) {
    try {
        const project = await Project.findByPk(req.params.id)

        if (!project) {
            const e = new Error('Проекта с таким ID не существует')
            e.name = 'NotFoundError'
            throw e
        }

        res.send(new Result(project))
    } catch (e) {
        next(e)
    }
}

export async function getAll(req, res, next) {
    try {
        const queries = []
        if (req.query.name) {
            queries.push({
                name: { [Op.iLike]: `%${req.query.name}%` },
            })
        }
        const projects = await Project.findAll({
            where: { [Op.and]: queries },
        })
        res.send(new Result(projects))
    } catch (e) {
        next(e)
    }
}

export async function create(req, res, next) {
    try {
        const { name, description } = req.body
        const project = await Project.create({
            name: name,
            description: description,
        })
        res.send(new Result(project))
    } catch (e) {
        next(e)
    }
}

export async function update(req, res, next) {
    try {
        const { name, description } = req.body
        const project = await Project.findByPk(req.params.id)

        if (!project) {
            const e = new Error('Проекта с таким ID не существует')
            e.name = 'NotFoundError'
            throw e
        }

        await project.update({
            name: name,
            description: description,
        })
        res.send(new Result(project))
    } catch (e) {
        next(e)
    }
}

export async function drop(req, res, next) {
    try {
        const project = await Project.findByPk(req.params.id)

        if (!project) {
            const e = new Error('Проекта с таким ID не существует')
            e.name = 'NotFoundError'
            throw e
        }

        await project.destroy()
        res.send(new Result())
    } catch (e) {
        next(e)
    }
}
