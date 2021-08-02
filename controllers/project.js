const { Project } = require('../models/index')
const Result = require('../utils/result')

export async function getById(req, res, next) {
    try {
        const project = await Project.findByPk(req.params.id)
        if (!project) {
            throw new Error('Проекта с таким ID не существует')
        }
        res.send(new Result(project))
    } catch (e) {
        next(e)
    }
}

export async function getAll(req, res, next) {
    try {
        const projects = await Project.findAll()
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
        result = new Result()
        const project = await Project.findByPk(req.params.id)
        if (project) {
            await project.update(req.body)
            result.setData(project)
        } else {
            throw new Error('Проекта с таким ID не существует')
        }
        res.send(result)
    } catch (e) {
        next(e)
    }
}

export async function drop(req, res, next) {
    try {
        const project = await Project.findByPk(req.params.id)

        if (!project) {
            throw new Error('Проекта с таким ID не существует')
        }

        await project.destroy()
        res.send(new Result())
    } catch (e) {
        next(e)
    }
}
