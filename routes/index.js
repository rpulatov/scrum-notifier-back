const AuthRouter = require('./auth')
const UserRouter = require('./user')
const EmployeeRouter = require('./employee')
const ProjectRouter = require('./project')


module.exports = (app) => {
    app.use('/api/auth', AuthRouter)
    app.use('/api/user', UserRouter)
    app.use('/api/employee', EmployeeRouter)
    app.use('/api/project', ProjectRouter)
}