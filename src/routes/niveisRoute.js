const { Router } = require('express')
const NiveisController = require('../controller/NiveisController')

const router = Router()

router.get('/api/niveis', NiveisController.all)
router.get('/api/niveis/:id', NiveisController.findById)
router.post('/api/niveis', NiveisController.create)
router.delete('/api/niveis/:id', NiveisController.delete)
router.put('/api/niveis/:id', NiveisController.update)

module.exports = router