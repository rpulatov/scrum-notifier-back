const { Router } = require("express");
const router = new Router()
const controller = require('../controllers/auth')

router.post('/login', controller.login)


module.exports = router