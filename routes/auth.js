const { Router } = require('express')
const router = new Router()
const { signin } = require('../controllers/auth')

router.post('/', signin)

module.exports = router
