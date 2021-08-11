const { Router } = require('express')
const PessoasController = require('../controller/PessoasController')

const router = Router()

router.get('/api/pessoas', PessoasController.all)
router.get('/api/pessoas/:id', PessoasController.findById)
router.post('/api/pessoas', PessoasController.create)
router.delete('/api/pessoas/:id', PessoasController.delete)
router.put('/api/pessoas/:id', PessoasController.update)


module.exports = router