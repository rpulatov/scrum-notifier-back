const Sequelize = require('sequelize')


module.exports = function (sequelize) {
    class MeetingTypeModel extends Sequelize.Model { }

    MeetingTypeModel.init(
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
        { sequelize, modelName: 'meetingType', tableName: 'MeetingType' }
    )
    return MeetingTypeModel
}