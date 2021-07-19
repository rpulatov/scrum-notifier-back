Sequelize = require('sequelize')

const UserModel = require('./User')
const EmployeeModel = require('./Employee')
const MeetingModel = require('./Meeting')
const ProjectModel = require('./Project')
const RoleModel = require('./Role')
const MeetingTypeModel = require('./MeetingType')


var sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        dialect: 'postgres',
    }
)



var User = UserModel(sequelize)
var Employee = EmployeeModel(sequelize)
var Meeting = MeetingModel(sequelize)
var Project = ProjectModel(sequelize)
var Role = RoleModel(sequelize)
var MeetingType = MeetingTypeModel(sequelize)


Role.hasMany(User)

MeetingType.hasMany(Meeting)

Project.belongsToMany(Employee, { through: 'EmployeeProject' })
Employee.belongsToMany(Project, { through: 'EmployeeProject' })


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

    sequelize,
    Sequelize
}

module.exports = db