const { Scenes: {BaseScene} } = require('telegraf')

const notifyScene = new BaseScene('notifyScene')
notifyScene.enter()

module.exports = notifyScene