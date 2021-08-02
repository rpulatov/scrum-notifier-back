const express = require('express')
const routes = require('./routes/index')
const app = express()
const errorHandler = require('./utils/error')
const bodyParser = require('body-parser')

app.set('port', process.env.PORT)
app.set('host', process.env.HOST)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

routes(app)
app.use(errorHandler)

const start = () => {
    try {
        app.listen(app.get('port'), app.get('host'), () => {
            console.log(`Server started on http://${app.get('host')}:${app.get('port')}`)
        })
    } catch (e) {
        console.log(e)
    }
}

start()
