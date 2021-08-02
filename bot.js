require('dotenv').config()
const {
    Telegraf,
    session,
    Scenes: { BaseScene, Stage },
} = require('telegraf')

const notifyScene = require('./controllers/bot/notifyScen')
const authScene = require('./controllers/bot/authScene')

const stage = new Stage([authScene, notifyScene])

const bot = new Telegraf(process.env.TELEGRAM_TOKEN)
bot.use(Telegraf.log())
bot.use(session())
bot.use(stage.middleware())

bot.start((ctx) => ctx.scene.enter('authScene'))
bot.hears(/(.*?)/, async (ctx) => {
    await ctx.reply('Текст для непонятных ситуаций.')
})

bot.launch()
