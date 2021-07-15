const Sequelize = require('sequelize')

module.exports = function (sequelize) {
    class UserModel extends Sequelize.Model { }

    UserModel.init(
        {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            hash: {
                type: Sequelize.STRING(128),
                allowNull: true
            },
            email: {
                type: Sequelize.STRING(128),
                allowNull: false
            },
        },
        { sequelize, modelName: 'user', tableName: 'User' }
    )
    return UserModel
}