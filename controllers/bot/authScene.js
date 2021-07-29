const { Scenes: {BaseScene} } = require('telegraf')
    const db = require('../../models/index')

const startText = 'Добро пожаловать! Чат-бот SFMeetingReminder предназначен для того, чтобы напоминать ' +
    'Вам о Ваших встречах в рамках проектов компании SolutionFactory. Чат-бот отправляет перед встречей два уведомления. ' +
    'Первое уведомление отправляется за 30 минут до начала встречи, второе — за 15 минут до начала встречи. \n' +
    '\nЧтобы Вы могли начать получать уведомления, бот должен убедиться, что Вы действительно работаете в компании и зарегистрированы в сиcтеме встреч. ' +
    'Для этого введите код, отправленный Вам на почту. \n\nВведите код для авторизации: ' //данный текст, возможно, должен быть в отдельном файле.

const authScene = new BaseScene('authScene')
authScene.enter(async ctx => {
    const chatID = String(ctx.chat.id)

    const instance = await db.Employee.findOne({
        where: { chatId: chatID }
    })
    if(instance){
        const employee = instance.get({plain: true})

        await ctx.reply(`Добро пожаловать, ${employee.name}. Вы уже авторизованы как: ${employee.email}`)
        ctx.scene.enter('notifyScene')
    }
    else{
        await ctx.reply(startText)
    }
})

authScene.on('text', async ctx => {
    const code = String(ctx.message.text)
    const chatID = String(ctx.chat.id)

    if (code?.length !== 4) {
        await ctx.reply('Код введен некорректно, повторите попытку.')
    }
    else {
        const instance = await db.Employee.findOne({
            where: { code: code }
        })
        if(instance){
            const employee = instance.get({plain: true})
            if(!employee.chatId){
                await instance.update({chatId: chatID})
                await ctx.reply(`Добро пожаловать, ${employee.name}. Вы авторизованы как: ${employee.email}\n\nТеперь Вы можете получать уведомления. Совсем скоро вы получите свое первое уведомление =).\n\nЧтобы выйти из системы уведомлений вызовите команду /exit.`)
                   await ctx.scene.enter('notifyScene')
            }else{ctx.reply('Пользователь с данным кодом уже зарегистрирован в системе.')}

        } else {ctx.reply('Неверный код.')}
    }
})

module.exports = authScene
