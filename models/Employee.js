const Sequelize = require('sequelize')

module.exports = function (sequelize) {
    class EmployeeModel extends Sequelize.Model {}

    EmployeeModel.init(
        {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            code: {
                type: Sequelize.STRING(4),
                allowNull: false,
                unique: true,
            },
            email: {
                type: Sequelize.STRING(128),
                allowNull: false,
                unique: true,
            },
            name: {
                type: Sequelize.STRING(128),
                allowNull: false,
            },
            chatId: {
                type: Sequelize.STRING(128),
                allowNull: true,
                unique: true,
            },
        },
        { sequelize, modelName: 'employee', tableName: 'Employee' },
    )
    return EmployeeModel
}
