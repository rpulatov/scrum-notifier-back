const { Employee, Project, sequelize } = require('../models/index')
const { Op } = require('sequelize')
const crypto = require('crypto')
const mailer = require('../utils/mailer')
const Result = require('../utils/result')

export async function getById(req, res, next) {
    try {
        const employee = await Employee.findByPk(req.params.id)
        
        if (!employee) {
            const e = new Error('Сотрудника с таким ID не существует')
            e.name = 'NotFoundError'
            throw e
        }

        res.send(new Result(employee))
    } catch (e) {
        next(e)
    }
}

export async function getAll(req, res, next) {
    try {
        const queries = []
        
        if (req.query.name) {
            queries.push({
              name: { [Op.iLike]: `%${req.query.name}%` }
            })
        }
        if (req.query.email) {
            queries.push({
              email: { [Op.iLike]: `%${req.query.email}%` }
            })
        }
        if(!Array.isArray(req.query.projectId)){
            req.query.projectId = [req.query.projectId]
        }
        const employees = await Employee.findAll({
            where: { [Op.and]: queries},
            include: { 
                attributes: [],
                model: Project,
                where: { 
                    id: {[Op.or]: req.query.projectId } 
                }
            }
        })
        
        res.send(new Result(employees))
    } catch (e) {
        next(e)
    }
}

export async function create(req, res, next) {
    let transaction
    try {
        transaction = await sequelize.transaction()
        const { name, email, projectIds } = req.body

        const instance = await Employee.findOne({
            where: { email: email },
        })

        if (instance) {
            throw new Error('Сотрудник с таким email уже существует')
        }

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
        if(projectIds){
            for (let id of projectIds) {
                await employee.addProject(id, { transaction: transaction })
            }
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
        res.send(new Result(employee))
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
        const { name, email, projectIds } = req.body
        const employee = await Employee.findByPk(req.params.id)

        if (!employee) {
            const e = new Error('Сотрудника с таким ID не существует')
            e.name = 'NotFoundError'
            throw e
        }

        await employee.update({
            name: name,
            email: email
        },
        { transaction: transaction },
        )

        if(projectIds){
            const projects = await employee.getProjects()

            for (let project of projects) {
                if(!projectIds.includes(project.get().id)) {
                    await project.employeeProject.destroy({transaction: transaction})
                }else{
                    projectIds.splice(projectIds.indexOf(project.get().id), 1)
                }
            }

            for (let id of projectIds) {
                await employee.addProject(id, { transaction: transaction })
            }
        }

        await transaction.commit()
        res.send(new Result(employee))
    } catch (e) {
        if (transaction) {
            await transaction.rollback()
        }
        next(e)
    }
}

export async function drop(req, res, next) {
    try {
        const employee = await Employee.findByPk(req.params.id)

        if (!employee) {
            const e = new Error('Сотрудника с таким ID не существует')
            e.name = 'NotFoundError'
            throw e
        }

        await employee.destroy()
        res.send(new Result())
    } catch (e) {
        next(e)
    }
}
