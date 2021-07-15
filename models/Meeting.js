const Sequelize = require('sequelize')


module.exports = function (sequelize) {
    class MeetingModel extends Sequelize.Model { }

    MeetingModel.init(
        {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            days: {
                type: Sequelize.STRING(8),
                allowNull: true
            },
            time: {
                type: Sequelize.TIME,
                allowNull: true
            },
            description: {
                type: Sequelize.TEXT,
                allowNull: true
            },
        },
        { sequelize, modelName: 'meeting', tableName: 'Meeting' }
    )
    return MeetingModel
}