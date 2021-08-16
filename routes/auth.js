const { Router } = require('express')
const router = new Router()
const { signin } = require('../controllers/auth')
const { authValidator } = require('../utils/validator')

router.post('/', authValidator, signin)

module.exports = router
