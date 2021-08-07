const Sequelize = require('sequelize')

module.exports = function (sequelize) {
    class EmployeeProjectModel extends Sequelize.Model {}

    EmployeeProjectModel.init(
        {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            projectId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            employeeId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
        },
        { sequelize, modelName: 'employeeProject', tableName: 'EmployeeProject' },
    )
    return EmployeeProjectModel
}
