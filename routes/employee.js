const { Router } = require('express')
const router = new Router()
const { create, update, getById, getAll, drop } = require('../controllers/employee')

router.post('/', create)
router.get('/', getAll)
router.get('/:id', getById)
router.put('/:id', update)
router.delete('/:id', drop)

module.exports = router
