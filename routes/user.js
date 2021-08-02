const { Router } = require('express')
const router = new Router()
const { create, update, getById, getAll, drop, getMe } = require('../controllers/user')

router.get('/me', getMe)
router.post('/', create)
router.get('/', getAll)
router.get('/:id', getById)
router.put('/:id', update)
router.delete('/:id', drop)

module.exports = router
