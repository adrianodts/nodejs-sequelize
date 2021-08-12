const { Router } = require('express')
const PessoasController = require('../controller/PessoasController')
const MatriculasController = require('../controller/MatriculasController')

const router = Router()

router.get('/api/pessoas', PessoasController.all)
router.get('/api/pessoas/:id', PessoasController.findById)
router.post('/api/pessoas', PessoasController.create)
router.delete('/api/pessoas/:id', PessoasController.delete)
router.put('/api/pessoas/:id', PessoasController.update)

router.get('/api/pessoas/:estudanteId/matricula/', MatriculasController.all)
router.get('/api/pessoas/:estudanteId/matricula/:matriculaId', MatriculasController.findById)
router.post('/api/pessoas/:estudanteId/matricula/', MatriculasController.create)
router.put('/api/pessoas/:estudanteId/matricula/:matriculaId', MatriculasController.update)
router.delete('/api/pessoas/:estudanteId/matricula/:matriculaId', MatriculasController.delete)

module.exports = router