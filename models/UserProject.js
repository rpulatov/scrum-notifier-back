const Sequelize = require('sequelize')

module.exports = function (sequelize) {
    class UserProjectModel extends Sequelize.Model {}

    UserProjectModel.init(
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
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
        },
        { sequelize, modelName: 'userProject', tableName: 'UserProject' },
    )
    return UserProjectModel
}
