const { Employee, sequelize } = require('../models/index')
const crypto = require('crypto')
const mailer = require('../utils/mailer')
const Result = require('../utils/result')

export async function getById(req, res, next) {
    try {
        const employee = await Employee.findByPk(req.params.id)
        if (!employee) {
            throw new Error('Сотрудника с таким ID не существует')
        }
        res.send(new Result(employee))
    } catch (e) {
        next(e)
    }
}

export async function getAll(req, res, next) {
    try {
        const employees = await Employee.findAll()
        res.send(new Result(employees))
    } catch (e) {
        next(e)
    }
}

export async function create(req, res, next) {
    try {
        let transaction = await sequelize.transaction()
        const result = new Result()
        const { name, email, projectIds } = req.body

        const instance = await Employee.findOne({
            where: { email: email },
        })

        if (instance) {
            throw new Error('Сотрудник с таким email уже существует')
        } else {
            const employees = await Employee.findAll({ attributes: ['code'] })
            const codes = employees.map((employee) => employee.get({ plain: true }).code)

            var code = String(parseInt(crypto.randomBytes(8).toString('hex'), 16)).slice(0, 4)
            while (codes.includes(code)) {
                code = String(parseInt(crypto.randomBytes(8).toString('hex'), 16)).slice(0, 4)
            }

            const employee = await Employee.create(
                {
                    name: name,
                    email: email,
                    code: code,
                },
                { transaction: transaction },
            )

            for (let id of projectIds) {
                await employee.addProject(id, { transaction: transaction })
            }

            await transaction.commit()

            mailer(email, {
                html: `
                        <div>
                            Здравствуйте, ${name}. Ваш код для доступа к корпоративному чат-боту Telegram: <b>${code}</b>.
                        </div>
                    `,
                subject: 'Код для бота | SolutionsFactory',
            })

            result.setData(employee)
        }
        res.send(result)
    } catch (e) {
        if (transaction) {
            await transaction.rollback()
        }
        next(e)
    }
}

export async function update(req, res, next) {
    try {
        const employee = await Employee.findByPk(req.params.id)
        const result = new Result()
        if (employee) {
            await employee.update(req.body)
            result.setData(employee)
        } else {
            throw new Error('Сотрудника с таким ID не существует')
        }
        res.send(result)
    } catch (e) {
        next(e)
    }
}

export async function drop(req, res, next) {
    try {
        const employee = await Employee.findByPk(req.params.id)

        if (!employee) {
            throw new Error('Сотрудника с таким ID не существует')
        }

        await employee.destroy()
        res.send(new Result())
    } catch (e) {
        next(e)
    }
}
