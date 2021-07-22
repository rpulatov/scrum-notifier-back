const { Router } = require("express");
const router = new Router()
const controller = require('../controllers/project')
const authMiddleware = require('../utils/authMiddleware')

router.post('/', controller.create)
router.get('/', authMiddleware, controller.getAll)
router.get('/:id', authMiddleware, controller.getById)
router.put('/:id', authMiddleware, controller.update)
router.delete('/:id', authMiddleware, controller.delete)


module.exports = router