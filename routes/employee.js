const { Router } = require('express')
const router = new Router()
const { create, update, getById, getAll, drop } = require('../controllers/employee')
const { emploeeValidator } = require('../utils/validator')

router.post('/', emploeeValidator(false), create)
router.get('/', getAll)
router.get('/:id', getById)
router.put('/:id', emploeeValidator(true), update)
router.delete('/:id', drop)

module.exports = router
