const AuthRouter = require('./auth')
const UserRouter = require('./user')

module.exports = (app) => {
    app.use('/api/auth', AuthRouter)
    app.use('/api/user', UserRouter)
}