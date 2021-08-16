const validator = require('validator')

function isString(value) {
    if (typeof value === 'string' || value instanceof String) {
        return true
    } else {
        return false
    }
}

function isArrayOfIds(value) {
    if (!Array.isArray(value)) {
        const e = new Error('ID проектов должны передаваться в массиве')
        e.name = 'BadRequestError'
        throw e
    }

    value.forEach((Id) => {
        if (!Number.isInteger(Id) && !validator.isNumeric(Id, { no_symbols: false })) {
            const e = new Error('ID проектов должны быть целыми числами')
            e.name = 'BadRequestError'
            throw e
        }
    })
}

export function authValidator(req, res, next) {
    try {
        const { username, password } = req.body

        if (!username) {
            const e = new Error('Не указано имя пользователя')
            e.name = 'BadRequestError'
            throw e
        }

        if (!isString(username)) {
            const e = new Error('Имя пользователя должно быть строкой')
            e.name = 'BadRequestError'
            throw e
        }

        if (!password) {
            const e = new Error('Не указан пароль')
            e.name = 'BadRequestError'
            throw e
        }

        if (!isString(password)) {
            const e = new Error('Пароль должен быть строкой')
            e.name = 'BadRequestError'
            throw e
        }

        next()
    } catch (e) {
        next(e)
    }
}

export function emploeeValidator(allowNull) {
    return function (req, res, next) {
        try {
            const { name, email, projectIds } = req.body
            if (!allowNull) {
                if (!name) {
                    const e = new Error('Не указано имя')
                    e.name = 'BadRequestError'
                    throw e
                }

                if (!email) {
                    const e = new Error('Не указана почта')
                    e.name = 'BadRequestError'
                    throw e
                }
            }

            if (name) {
                if (!isString(name)) {
                    const e = new Error('Имя должно быть строкой')
                    e.name = 'BadRequestError'
                    throw e
                }
            }

            if (email) {
                if (!isString(email)) {
                    const e = new Error('Почта должна быть строкой')
                    e.name = 'BadRequestError'
                    throw e
                }

                if (!validator.isEmail(email)) {
                    const e = new Error('Неверный формат почты')
                    e.name = 'BadRequestError'
                    throw e
                }
            }

            if (projectIds) {
                isArrayOfIds(projectIds)
            }

            next()
        } catch (e) {
            next(e)
        }
    }
}

export function userValidator(allowNull) {
    return function (req, res, next) {
        try {
            const { username, password, roleId, projectIds } = req.body
            if (!allowNull) {
                if (!username) {
                    const e = new Error('Не указано имя пользователя')
                    e.name = 'BadRequestError'
                    throw e
                }

                if (!password) {
                    const e = new Error('Не указан пароль')
                    e.name = 'BadRequestError'
                    throw e
                }

                if (!roleId) {
                    const e = new Error('Не указан ID роли')
                    e.name = 'BadRequestError'
                    throw e
                }
            }

            if (username) {
                if (!isString(username)) {
                    const e = new Error('Имя пользователя должно быть строкой')
                    e.name = 'BadRequestError'
                    throw e
                }
            }

            if (password) {
                if (!isString(password)) {
                    const e = new Error('Пароль должен  быть строкой')
                    e.name = 'BadRequestError'
                    throw e
                }
            }

            if (roleId) {
                if (
                    !Number.isInteger(roleId) &&
                    !validator.isNumeric(roleId, { no_symbols: false })
                ) {
                    const e = new Error('ID роли должен быть целым числом')
                    e.name = 'BadRequestError'
                    throw e
                }
            }

            if (projectIds) {
                isArrayOfIds(projectIds)
            }

            next()
        } catch (e) {
            next(e)
        }
    }
}

export function projectValidator(allowNull) {
    return function (req, res, next) {
        try {
            const { name, description } = req.body
            if (!allowNull) {
                if (!name) {
                    const e = new Error('Не указано имя')
                    e.name = 'BadRequestError'
                    throw e
                }

                if (!description) {
                    const e = new Error('Не указано описание')
                    e.name = 'BadRequestError'
                    throw e
                }
            }
            if (name) {
                if (!isString(name)) {
                    const e = new Error('Имя должно быть строкой')
                    e.name = 'BadRequestError'
                    throw e
                }
            }

            if (description) {
                if (!isString(description)) {
                    const e = new Error('Описание должно быть строкой')
                    e.name = 'BadRequestError'
                    throw e
                }
            }
            next()
        } catch (e) {
            next(e)
        }
    }
}

export function meetingValidator(allowNull) {
    return function (req, res, next) {
        try {
            const { meetingTypeId, projectId, description, days, time } = req.body
            if (!allowNull) {
                if (!meetingTypeId) {
                    const e = new Error('Не указан ID типа')
                    e.name = 'BadRequestError'
                    throw e
                }

                if (!days) {
                    const e = new Error('Не указаны дни')
                    e.name = 'BadRequestError'
                    throw e
                }

                if (!projectId) {
                    const e = new Error('Не указан ID проекта')
                    e.name = 'BadRequestError'
                    throw e
                }

                if (!time) {
                    const e = new Error('Не указано время')
                    e.name = 'BadRequestError'
                    throw e
                }

                if (!description) {
                    const e = new Error('Не указано описание')
                    e.name = 'BadRequestError'
                    throw e
                }
            }
            if (description) {
                if (!isString(description)) {
                    const e = new Error('Описание должно быть строкой')
                    e.name = 'BadRequestError'
                    throw e
                }
            }

            if (meetingTypeId) {
                if (
                    !Number.isInteger(meetingTypeId) &&
                    !validator.isNumeric(meetingTypeId, { no_symbols: false })
                ) {
                    const e = new Error('ID типа должен быть целым числом')
                    e.name = 'BadRequestError'
                    throw e
                }
            }

            if (projectId) {
                if (
                    !Number.isInteger(projectId) &&
                    !validator.isNumeric(projectId, { no_symbols: false })
                ) {
                    const e = new Error('ID типа должен быть целым числом')
                    e.name = 'BadRequestError'
                    throw e
                }
            }

            if (days) {
                if (!isString(days)) {
                    const e = new Error(
                        'Дни должны быть указаны в формате строки, содержащий только символы "1" и "0" и состоящей из семи символов',
                    )
                    e.name = 'BadRequestError'
                    throw e
                }

                const seven =
                    days.split('').filter((x) => x == 1).length +
                    days.split('').filter((x) => x == 0).length

                if (!(days.length === 7) || !(seven === 7)) {
                    const e = new Error(
                        'Дни должны быть указаны в формате строки, содержащий только символы "1" и "0" и состоящей из семи символов',
                    )
                    e.name = 'BadRequestError'
                    throw e
                }
            }

            next()
        } catch (e) {
            next(e)
        }
    }
}
