const { Router } = require('express')
const PessoasController = require('../controller/PessoasController')
const MatriculasController = require('../controller/MatriculasController')

const router = Router()

router.get('/api/pessoas', PessoasController.all)
router.get('/api/pessoas/active', PessoasController.active)
router.get('/api/pessoas/:id', PessoasController.findById)
router.get('/api/pessoas/:id/matriculas', PessoasController.getAllByConfirmed)
router.post('/api/pessoas', PessoasController.create)
router.post('/api/pessoas/:id/restaura', PessoasController.restore)
router.post('/api/pessoas/:estudanteId/cancel', PessoasController.cancelPeople)
router.delete('/api/pessoas/:id', PessoasController.delete)
router.put('/api/pessoas/:id', PessoasController.update)

router.get('/api/pessoas/:estudanteId/matricula/', MatriculasController.all)
router.get('/api/pessoas/:estudanteId/matricula/:matriculaId', MatriculasController.findById)
router.get('/api/pessoas/matriculas/:turmaId/confirmadas', MatriculasController.getAllByConfirmedAndClass)
router.get('/api/pessoas/matriculas/lotada', MatriculasController.getAllByConfirmedAndClassCrowded)
router.post('/api/pessoas/:estudanteId/matricula/', MatriculasController.create)
router.post('/api/pessoas/:estudanteId/matricula/:matriculaId/restaura', MatriculasController.update)
router.put('/api/pessoas/:estudanteId/matricula/:matriculaId', MatriculasController.update)
router.delete('/api/pessoas/:estudanteId/matricula/:matriculaId', MatriculasController.delete)

module.exports = router