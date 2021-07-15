const Sequelize = require('sequelize')

module.exports = function (sequelize) {
    class ProjectModel extends Sequelize.Model { }

    ProjectModel.init(
        {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: Sequelize.STRING(128),
                allowNull: true
            },
            description: {
                type: Sequelize.TEXT,
                allowNull: true
            },
        },
        { sequelize, modelName: 'project', tableName: 'Project' }
    )
    return ProjectModel
}