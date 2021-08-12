const database = require('../models')

class MatriculasController {

    static async all(req, res) {
        try {
            const { estudanteId } = req.params
            const matriculas = await database.matriculas.findAll({
                where: {
                    estudante_id: estudanteId
                }
            })
            return res
                .status(200)
                .json(matriculas)
        } catch (error) {
            return res
                .status(500)
                .json(error.message)
        }
    }
    
    static async findById(req, res) {
        try {
            const { matriculaId, estudanteId } = req.params
            const matriculas = await database.matriculas.findOne({
                where: {
                    id: matriculaId,
                    estudante_id: estudanteId
                }
            })
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
            const result = await database.matriculas.create(novaMatricula)
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
            const result = await database.matriculas.update(novaAtualizacao, {
                where: {
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                }
            })
            if (result == 1) {
                const matricula = await database.matriculas.findOne({
                    where: {
                        id: matriculaId,
                        estudante_id: estudanteId
                    }
                })
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
            const pessoa = await database.matriculas.destroy({
                where: {
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                }
            })
            return res.status(204).end()
        } catch (error) {
            res.status(404).json(error.message)
        }
    }
}

module.exports = MatriculasController