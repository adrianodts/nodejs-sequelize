const database = require('../models')

class PessoasController {

    static async all(req, res) {
        try {
            const pessoas = await database.pessoas.findAll()
            return res
                .status(200)
                .json(pessoas)
        } catch (error) {
            return res
                .status(500)
                .json(error.message)
        }
    }

    static async findById(req, res) {
        try {
            const { id } = req.params
            const pessoa = await database.pessoas.findOne({
                where: {
                    id: Number(id)
                }
            })
            if (pessoa) {
                return res.status(200).json(pessoa)
            } else {
                res.status(404).end()
            }
        } catch (error) {
            res.status(500).json(error.message)
        }
    }

    static async create(req, res) {
        try {
            const novaPessoa = req.body
            const result = await database.pessoas.create(novaPessoa)
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
            const result = await database.pessoas.update(novaAtualizacao, {
                where: {
                    id: Number(id)
                }
            })
            if (result == 1) {
                const pessoa = await database.pessoas.findOne({
                    where: {
                        id: Number(id)
                    }
                })
                return res.status(200).json(pessoa) 
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
            const pessoa = await database.pessoas.destroy({
                where: {
                    id: Number(id)
                }
            })
            return res.status(204).end()
        } catch (error) {
            res.status(404).json(error.message)
        }
    }
}

module.exports = PessoasController