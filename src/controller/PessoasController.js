const { PessoasService } = require('../services')
const service = new PessoasService()

class PessoasController {

    static async active(req, res) {
        try { 
            const pessoas = await service.findAllActive()
            return res
                .status(200)
                .json(pessoas)
        } catch (error) {
            return res
                .status(500)
                .json(error.message)
        }
    }

    static async all(req, res) {
        try {
            const pessoas = await service.findAllScope()
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
            const pessoa = await service.findOne({ id: Number(id) })
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
            const result = await service.create(novaPessoa)
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
            const result = await service.update(Number(id), novaAtualizacao)
            if (result == 1) {
                const pessoa = await service.findOne(id)
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
            await service.destroy({ id: Number(id) })
            return res.status(204).end()
        } catch (error) {
            res.status(404).json(error.message)
        }
    }

    static async restore(req, res) {
        try {
            const { id } = req.params
            const result = await service.restore({ id: Number(id) })
            if (result == 1) {
                const pessoa = await service.findOne({ id: Number(id) })
                return res.status(200).json(pessoa) 
            } else {
                return res.status(404).end()
            }
        } catch (error) {
            res.status(500).json(error.message)
        }
    }

    static async getAllByConfirmed(req, res) {
        try {
            const { id } = req.params
            const pessoa = await database.pessoas.findOne({
                where: {
                    id: Number(id)
                }
            })
            const matriculas = await pessoa.getAulasMatriculadas() //mixin
            return res.status(200).json( { ...pessoa, matriculas })
        } catch (error) {
            res.status(500).json(error.message)
        }
    }

    static async cancelPeople(req, res) {
        try {
            const { estudanteId } = req.params
            await service.updatePessoasEMatriculas(estudanteId)
            return res.status(204).end()
        } catch (error) {
            res.status(500).json(error.message)
        }
    }
}

module.exports = PessoasController