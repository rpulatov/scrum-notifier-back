const Sequelize = require('sequelize')

const UserModel = require('./User')
const EmployeeModel = require('./Employee')
const MeetingModel = require('./Meeting')
const ProjectModel = require('./Project')
const RoleModel = require('./Role')
const MeetingTypeModel = require('./MeetingType')
const EmployeeProjectModel = require('./EmployeeProject')
const UserProjectModel = require('./UserProject')

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        dialect: 'postgres',
    },
)

const User = UserModel(sequelize)
const Employee = EmployeeModel(sequelize)
const Meeting = MeetingModel(sequelize)
const Project = ProjectModel(sequelize)
const Role = RoleModel(sequelize)
const MeetingType = MeetingTypeModel(sequelize)
const EmployeeProject = EmployeeProjectModel(sequelize)
const UserProject = UserProjectModel(sequelize)

Role.hasMany(User)

MeetingType.hasMany(Meeting)

Project.hasMany(Meeting)

Project.belongsToMany(Employee, { through: EmployeeProject })
Employee.belongsToMany(Project, { through: EmployeeProject })

Project.belongsToMany(User, { through: UserProject })
Employee.belongsToMany(Project, { through: UserProject })

sequelize
    .authenticate()
    .then(() => console.log('DB Connected.'))
    .catch((err) => console.error('DB Connection error: ', err))

const db = {
    User,
    Employee,
    Meeting,
    Project,
    Role,
    MeetingType,
    EmployeeProject,
    UserProject,

    sequelize,
    Sequelize,
}

module.exports = db
