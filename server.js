const express = require('express')
const bodyParser = require('body-parser')
const db = require('./models/index')
const routes = require('./routes/index')
const router = require('./routes/auth')

const app = express()

app.set('port', process.env.PORT)
app.set('host', process.env.HOST)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

routes(app)


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