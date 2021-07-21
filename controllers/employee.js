const db = require('../models/index')
const crypto = require('crypto')
const mailer = require('../utils/mailer')

class employeeController {

    async getById(req, res) {
        try {
            const employee = await db.Employee.findByPk(req.params.id)
            if (!employee) {
                res.status(400).json({ message: "Пользователя с таким ID не существует" })
            }
            res.status(200).json(employee)
        } catch (e) {
            console.log(e)
            res.status(400).json({ message: `Error: ${e.message}` })
        }
    }


    async getAll(req, res) {
        try {
            const employees = await db.Employee.findAll()
            res.status(200).json(employees)
        } catch (e) {
            console.log(e)
            res.status(400).json({ message: `Error: ${e.message}` })
        }
    }


    async create(req, res) {
        try {
            const { name, email } = req.body
            const instance = await db.Employee.findOne({
                where: { email: email }
            })
            if (instance) {
                res.status(400).json({ message: "Сотрудник с таким email уже существует" })
            } else {
                const employees = await db.Employee.findAll({ attributes: ['code'] })
                const codes = employees.map(employee => employee.get({ plain: true }).code)

                var code = String(parseInt(crypto.randomBytes(8).toString('hex'), 16)).slice(0, 4)
                while (codes.includes(code)) {
                    code = String(parseInt(crypto.randomBytes(8).toString('hex'), 16)).slice(0, 4)
                }
                mailer(email, {
                    html: `
                        <div>
                            Здравствуйте, ${name}. Ваш код для доступа к корпоративному чат-боту Telegram: <b>${code}</b>.
                        </div>
                    `,
                    subject: 'Код для бота | SolutionsFactory'
                })
                const employee = await db.Employee.create({
                    name: name,
                    email: email,
                    code: code
                })
                res.status(200).json(employee)
            }
        } catch (e) {
            console.log(e)
            res.status(400).json({ message: `Error: ${e.message}` })
        }

    }


    async update(req, res) {
        try {
            const employee = await db.Employee.findByPk(req.params.id)
            if (employee) {
                await employee.update(req.body)
                res.status(200).json(employee)
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
            const employee = await db.Employee.findByPk(req.params.id)

            if (!employee) {
                res.status(400).json({ message: "Пользователя с таким ID не существует" })
            }

            await employee.destroy()
            res.status(200).json({ message: "Deleted" })
        } catch (e) {
            console.log(e)
            res.status(400).json({ message: `Error: ${e.message}` })
        }
    }

}

module.exports = new employeeController()