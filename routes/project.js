const { Router } = require('express')
const router = new Router()
const { create, update, getById, getAll, drop } = require('../controllers/project')
const { projectValidator } = require('../utils/validator')

router.post('/', projectValidator(false), create)
router.get('/', getAll)
router.get('/:id', getById)
router.put('/:id', projectValidator(true), update)
router.delete('/:id', drop)

module.exports = router
