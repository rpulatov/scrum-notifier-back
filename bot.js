require('dotenv').config()
const { Telegraf, session, SceneContextMessageUpdate, Scenes: {BaseScene, Stage} } = require('telegraf')

let userMsg = "Переменная для хранения кода."       //просить код, возможно, нужно без подобных переменных.
let ChatID

const codeScene = new BaseScene('codeScene')
codeScene.enter(ctx => ctx.reply('Введите код: '))
codeScene.on('text', ctx => {
    userMsg = ctx.message.text
    ChatID = String(ctx.chat.id)

    return ctx.scene.leave(ctx.reply('Код сохранен.'))
})
codeScene.leave(ctx => ctx.reply)

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
bot.command('code', ctx => ctx.scene.enter('codeScene'))
bot.command('lastMsg', ctx => ctx.reply(userMsg + ", " + ChatID))    //команда для проверки работы команды /code

bot.launch()
