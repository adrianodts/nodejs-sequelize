const database = require('../models')

class TurmasController {

    static async all(req, res) {
        try {
            const turmas = await database.turmas.findAll()
            return res
                .status(200)
                .json(turmas)
        } catch (error) {
            return res
                .status(500)
                .json(error.message)
        }
    }

    static async findById(req, res) {
        try {
            const { id } = req.params
            const turma = await database.turmas.findOne({
                where: {
                    id: Number(id)
                }
            })
            if (turma) {
                return res.status(200).json(turma)
            } else {
                res.status(404).end()
            }
        } catch (error) {
            res.status(500).json(error.message)
        }
    }

    static async create(req, res) {
        try {
            const novaTurma = req.body
            const result = await database.turmas.create(novaTurma)
            return res.status(200).json(result)
        } catch (error) {
            res.status(404).json(error.message)
        }
    }

    static async update(req, res) {
        try {
            const { id } = req.params
            const corpo = req.body
            const updatedAt = { udatedAt: new Date() }
            const novaAtualizacao = Object.assign({}, corpo, updatedAt)
            const result = await database.turmas.update(novaAtualizacao, {
                where: {
                    id: Number(id)
                }
            })
            if (result == 1) {
                const turma = await database.turmas.findOne({
                    where: {
                        id: Number(id)
                    }
                })
                return res.status(200).json(turma) 
            } else {
                return res.status(404).end()
            }
        } catch (error) {
            res.status(500).json(error.message)
        }
    }

    static async delete(req, res) {
        try {
            const { id } = req.params
            await database.turmas.destroy({
                where: {
                    id: Number(id)
                }
            })
            return res.status(204).end()
        } catch (error) {
            res.status(404).json(error.message)
        }
    }

    static async restore(req, res) {
        try {
            const { id } = req.params
            const result = await database.turmas.restore({
                where: {
                    id: Number(id)
                }
            })
            const turma = await database.turmas.findOne({
                where: {
                    id: Number(id)
                }
            })
            return res.status(200).json(turma) 
        } catch (error) {
            res.status(500).json(error.message)
        }
    }
}
module.exports = TurmasController