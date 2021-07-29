const { Router } = require("express");
const router = new Router()
const controller = require('../controllers/employee')

router.post('/', controller.create)
router.get('/', controller.getAll)
router.get('/:id', controller.getById)
router.put('/:id', controller.update)
router.delete('/:id', controller.delete)


module.exports = router