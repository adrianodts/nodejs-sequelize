const { Router } = require('express')
const TurmasController = require('../controller/TurmasController')

const router = Router()

router.get('/api/turmas', TurmasController.all)
router.get('/api/turmas/:id', TurmasController.findById)
router.post('/api/turmas', TurmasController.create)
router.post('/api/turmas/:id/restaura', TurmasController.restore)
router.delete('/api/turmas/:id', TurmasController.delete)
router.put('/api/turmas/:id', TurmasController.update)


module.exports = router