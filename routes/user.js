const { Router } = require('express')
const router = new Router()
const { create, update, getById, getAll, drop, getMe } = require('../controllers/user')
const { userValidator } = require('../utils/validator')

router.get('/me', getMe)
router.post('/', userValidator(false), create)
router.get('/', getAll)
router.get('/:id', getById)
router.put('/:id', userValidator(true), update)
router.delete('/:id', drop)

module.exports = router
