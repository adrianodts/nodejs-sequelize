const { Sequelize } = require('../models')
const { MatriculasService } = require('../services')
const service = new MatriculasService()

class MatriculasController {

    static async all(req, res) {
        try {
            const { estudanteId } = req.params
            const matriculas = await service.all(estudanteId)
            return res.status(200).json(matriculas)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async findById(req, res) {
        try {
            const { matriculaId, estudanteId } = req.params
            const matriculas = await service.findByConfirmed(matriculaId, estudanteId)
            if (matriculas) {
                return res.status(200).json(matriculas)
            } else {
                res.status(404).end()
            }
        } catch (error) {
            res.status(500).json(error.message)
        }
    }

    static async create(req, res) {
        try {
            const { estudanteId } = req.params
            const corpo = req.body
            const novaMatricula = { ...corpo, estudante_id: estudanteId }
            const result = await service.create(novaMatricula)
            return res.status(200).json(result)
        } catch (error) {
            res.status(404).json(error.message)
        }
    }
    
    static async update(req, res) {
        try {
            const { matriculaId, estudanteId } = req.params
            const corpo = req.body
            const updatedAt = { udatedAt: new Date() }
            const novaAtualizacao = Object.assign({}, corpo, updatedAt)
            const result = await service.update(matriculaId, estudanteId, novaAtualizacao)
            if (result == 1) {
                const matricula = await service.findOne({ id: matriculaId, estudante_id: estudanteId })
                return res.status(200).json(matricula) 
            } else {
                return res.status(404).end()
            }
        } catch (error) {
            res.status(500).json(error.message)
        }
    }

    static async delete(req, res) {
        try {
            const { matriculaId, estudanteId } = req.params
            await service.destroy({ id: Number(matriculaId), estudante_id: Number(estudanteId) })
            return res.status(204).end()
        } catch (error) {
            res.status(404).json(error.message)
        }
    }

    static async restore(req, res) {
        try {
            const { matriculaId, estudanteId } = req.params
            const result = await service.restore({ id: Number(matriculaId), estudante_id: Number(estudanteId) })

            if (result == 1) {
                const matricula = await service.findOne({ id: matriculaId, estudante_id: estudanteId })
                return res.status(200).json(matricula) 
            } else {
                return res.status(404).end()
            }
        } catch (error) {
            res.status(500).json(error.message)
        }
    }

    static async getAllByConfirmedAndClass(req, res) {
        try {
            const { turmaId } = req.params
            const todasMatriculas = await service.findAndCountAll(
                // where
                { turma_id: Number(turmaId), status: 'confirmado' },
                // aggregators
                { 
                    order: [['estudante_id', 'DESC']],
                    limit: 20, // útil para paginação
                }
            )
            if (todasMatriculas) {
                return res.status(200).json(todasMatriculas)
            } else {
                res.status(404).end()
            }
        } catch (error) {
            res.status(500).json(error.message)
        }
    }

    static async getAllByConfirmedAndClassCrowded(req, res) {
        try {
            const capacidadeMaximaPorTurma = 2
            const turmasLotadas = await service.findAndCountAll({ status: 'confirmado' }, {
                attributes: ['turma_id'],
                group: ['turma_id'],
                having: Sequelize.literal(`count(turma_id') >= ${capacidadeMaximaPorTurma}`)
            })
            if (turmasLotadas) {
                return res.status(200).json(turmasLotadas)
            } else {
                res.status(404).end()
            }
        } catch (error) {
            res.status(500).json(error.message)
        }
    }
}

module.exports = MatriculasController