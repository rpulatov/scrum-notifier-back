const AuthRouter = require('./auth')
const UserRouter = require('./user')
const EmployeeRouter = require('./employee')
const MeetingRouter = require('./meeting')
const ProjectRouter = require('./project')
const authMiddleware = require('../utils/authMiddleware')

module.exports = (app) => {
    app.use('/api/auth', AuthRouter)
    app.use('/api/user', UserRouter)
    app.use('/api/employee', authMiddleware, EmployeeRouter)
    app.use('/api/meeting', authMiddleware, MeetingRouter)
    app.use('/api/project', authMiddleware, ProjectRouter)
}