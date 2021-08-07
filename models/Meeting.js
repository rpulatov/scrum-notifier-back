const Sequelize = require('sequelize')

module.exports = function (sequelize) {
    class MeetingModel extends Sequelize.Model {}

    MeetingModel.init(
        {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            days: {
                type: Sequelize.STRING(7),
                allowNull: false,
            },
            time: {
                type: Sequelize.TIME,
                allowNull: false,
            },
            description: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            meetingTypeId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            projectId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
        },
        { sequelize, modelName: 'meeting', tableName: 'Meeting' },
    )
    return MeetingModel
}
