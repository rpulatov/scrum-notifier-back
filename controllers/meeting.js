const { Meeting } = require('../models/index')
const Result = require('../utils/result')

export async function getById(req, res, next) {
    try {
        const meeting = await Meeting.findByPk(req.params.id)
        
        if (!meeting) {
            const e =  new Error('Встречи с таким ID не существует')
            e.name = 'NotFoundError'
            throw e
        }

        res.send(new Result(meeting))
    } catch (e) {
        next(e)
    }
}

export async function getAll(req, res, next) {
    try {
        const meetings = await Meeting.findAll()
        res.send(new Result(meetings))
    } catch (e) {
        next(e)
    }
}

export async function create(req, res, next) {
    try {
        const { meetingTypeId, projectId, description, days, time } = req.body
        
        if (!projectId) {
            throw new Error('Не указан projectId, для встречи')
        }

        const meeting = await Meeting.create({
            meetingTypeId: meetingTypeId,
            projectId: projectId,
            description: description,
            days: days,
            time: time,
        })
        res.send(new Result(meeting))
    } catch (e) {
        next(e)
    }
}

export async function update(req, res, next) {
    try {
        const { meetingTypeId, projectId, description, days, time } = req.body
        const meeting = await Meeting.findByPk(req.params.id)

        if (!meeting) {
            const e =  new Error('Встречи с таким ID не существует')
            e.name = 'NotFoundError'
            throw e
        }

        await meeting.update({
            meetingTypeId: meetingTypeId,
            projectId: projectId,
            description: description,
            days: days,
            time: time,
        })
        res.send(new Result(meeting))
    } catch (e) {
        next(e)
    }
}

export async function drop(req, res, next) {
    try {
        const meeting = await Meeting.findByPk(req.params.id)

        if (!meeting) {
            const e =  new Error('Встречи с таким ID не существует')
            e.name = 'NotFoundError'
            throw e
        }

        await meeting.destroy()
        res.send(new Result())
    } catch (e) {
        next(e)
    }
}
