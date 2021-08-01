const db = require('../models/index')

class meetingController {


    async getById(req, res) {
        try {
            const meeting = await db.Meeting.findByPk(req.params.id)
            if (!meeting) {
                throw new Error('Встречи с таким ID не существует')
            }
            res.status(200).json(meeting)
        } catch (e) {
            console.log(e)
            res.status(400).json({ message: `Error: ${e.message}` })
        }
    }


    async getAll(req, res) {
        try {
            const meetings = await db.Meeting.findAll()
            res.status(200).json(meetings)
        } catch (e) {
            console.log(e)
            res.status(400).json({ message: `Error: ${e.message}` })
        }
    }


    async create(req, res) {
        try {
            const { meetingTypeId, projectId, description, days, time } = req.body
            if (!projectId) {
                throw new Error('Не указан projectId, для встречи')
            }
            const meeting = await db.Meeting.create({
                meetingTypeId: meetingTypeId,
                projectId: projectId,
                description: description,
                days: days,
                time: time
            })
            res.status(200).json(meeting)
        } catch (e) {
            console.log(e)
            res.status(400).json({ message: `Error: ${e.message}` })
        }

    }


    async update(req, res) {
        try {
            const meeting = await db.Meeting.findByPk(req.params.id)
            if (meeting) {
                await meeting.update(req.body)
                res.status(200).json(meeting)
            } else {
                throw new Error('Встречи с таким ID не существует')
            }
        } catch (e) {
            console.log(e)
            res.status(400).json({ message: `Error: ${e.message}` })
        }
    }


    async delete(req, res) {
        try {
            const meeting = await db.Meeting.findByPk(req.params.id)

            if (!meeting) {
                throw new Error('Встречи с таким ID не существует')
            }

            await meeting.destroy()
            res.status(200).json({ message: "Deleted" })
        } catch (e) {
            console.log(e)
            res.status(400).json({ message: `Error: ${e.message}` })
        }
    }

}

module.exports = new meetingController()