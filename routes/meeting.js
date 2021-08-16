const { Router } = require('express')
const router = new Router()
const { create, update, getById, getAll, drop } = require('../controllers/meeting')
const { meetingValidator } = require('../utils/validator')

router.post('/', meetingValidator(false), create)
router.get('/', getAll)
router.get('/:id', getById)
router.put('/:id', meetingValidator(true), update)
router.delete('/:id', drop)

module.exports = router
