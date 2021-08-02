const {
    Scenes: { BaseScene },
} = require('telegraf')
const db = require('../../models/index')

const notifyScene = new BaseScene('notifyScene')

notifyScene.command('exit', async (ctx) => {
    const chatID = String(ctx.chat.id)

    const instance = await db.Employee.findOne({
        where: { chatId: chatID },
    })
    await instance.update({ chatId: null })

    ctx.reply('Выход из системы.')
    ctx.scene.enter('authScene')
})
module.exports = notifyScene
