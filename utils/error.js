import Result from './result'

function errorHandler(err, req, res, next) {
    const result = new Result()

    if (err.message === 'UnauthorizedError') {
        result.setError('Пользователь не авторизован', 1)
    } else {
        result.setError(err.message, 6)
    }
    console.log(err.name)
    res.status(200).send(result)
}

module.exports = errorHandler
