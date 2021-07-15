const Sequelize = require('sequelize')

module.exports = function (sequelize) {
    class RoleModel extends Sequelize.Model { }

    RoleModel.init(
        {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: Sequelize.STRING(128),
                allowNull: false
            },
        },
        { sequelize, modelName: 'role', tableName: 'Role' }
    )
    return RoleModel
}
