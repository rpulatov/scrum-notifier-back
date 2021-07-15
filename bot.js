// Начальная версия бота (требуются правки)

require('dotenv').config()

const { Telegraf } = require('telegraf')
const bot = new Telegraf(process.env.TELEGRAM_TOKEN)

bot.use(Telegraf.log())
const startText = 'Добро пожаловать! Чат-бот SFMeetingReminder предназначен для того, чтобы напоминать ' +
    'Вам о Ваших встречах в рамках проектов компании SolutionFactory. Чат-бот отправляет перед встречей два уведомления. ' +
    'Первое уведомление отправляется за 30 минут до начала встречи, второе — за 15 минут до начала встречи. \n' +
    '\nЧтобы Вы могли начать получать уведомления, бот должен убедиться, что Вы действительно работаете в компании и зарегистрированы в ситеме встреч. ' +
    'Для этого вызовите команду /code и введите код, отправленный Вам на почту. ' //данный текст, возможно, должен быть в отдельном файле.

let userMsg = "Переменная для хранения кода."
let userChatID

bot.start((ctx) => ctx.reply(startText))

bot.command('code', (ctx) => {      //возможно, данный кусок должен быть реализован через сцены
    ctx.reply("Введите код: ")

    bot.on('text', (ctx) => {
        userMsg = ctx.message.text
        userChatID = String(ctx.chat.id)
        ctx.reply('Код сохранен.')
    })
})
bot.command('lastMsg', (ctx) => ctx.reply(userMsg + ", " + userChatID))    //команда для проверки работы команды /code

bot.launch()

