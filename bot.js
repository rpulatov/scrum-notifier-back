require('dotenv').config()
const { Telegraf, session, Scenes: {BaseScene, Stage} } = require('telegraf')

// Сцена /code.
const codeScene = new BaseScene('codeScene')
codeScene.enter(async ctx => await ctx.reply('Введите код: '))
codeScene.on('text', async ctx => {
    const code = ctx.message.text
    const chatID = String(ctx.chat.id)

    if (code?.length !== 4) {
        await ctx.reply('Код введен некорректно, повторите попытку.')
    }
    // в данном else code должен сверятся с данным из DB.
    else {
        await ctx.reply(`Ваш код: ${code}. Код уже проверяется.`)
        return ctx.scene.leave()
    }
    codeScene.leave(ctx => ctx.reply('Выход из сцены.'))
})

const stage = new Stage([codeScene])

const startText = 'Добро пожаловать! Чат-бот SFMeetingReminder предназначен для того, чтобы напоминать ' +
    'Вам о Ваших встречах в рамках проектов компании SolutionFactory. Чат-бот отправляет перед встречей два уведомления. ' +
    'Первое уведомление отправляется за 30 минут до начала встречи, второе — за 15 минут до начала встречи. \n' +
    '\nЧтобы Вы могли начать получать уведомления, бот должен убедиться, что Вы действительно работаете в компании и зарегистрированы в ситеме встреч. ' +
    'Для этого вызовите команду /code и введите код, отправленный Вам на почту. ' //данный текст, возможно, должен быть в отдельном файле.

const bot = new Telegraf(process.env.TELEGRAM_TOKEN)
bot.use(Telegraf.log())
bot.use(session())
bot.use(stage.middleware())

bot.start(ctx => ctx.reply(startText))
bot.command('code', async ctx => await ctx.scene.enter('codeScene'))

bot.launch()
