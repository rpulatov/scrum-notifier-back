import Result from './result'

function errorHandler(err, req, res, next) {
    const result = new Result()

    if (err.name === 'UnauthorizedError') {
        result.setError('Пользователь не авторизован', 1)
    } else if (err.name === 'NotFoundError') {
        result.setError(err.message, 2)
    } else {
        result.setError(err.message, 6)
    }
    console.log(err)
    res.status(200).send(result)
}

module.exports = errorHandler
