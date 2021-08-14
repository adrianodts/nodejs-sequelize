const { NiveisService } = require('../services')
const service = new NiveisService()

class NiveisController {

    static async all(req, res) {
        try {
            const niveis = await service.all()
            return res
                .status(200)
                .json(niveis)
        } catch (error) {
            return res
                .status(500)
                .json(error.message)
        }
    }

    static async findById(req, res) {
        try {
            const { id } = req.params
            const nivel = await service.findOne(id)
            if (nivel) {
                return res.status(200).json(nivel)
            } else {
                res.status(404).end()
            }
        } catch (error) {
            res.status(500).json(error.message)
        }
    }

    static async create(req, res) {
        try {
            const novoNivel = req.body
            const result = await service.create(novoNivel)
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
            const result = await service.update(id, novaAtualizacao)
            if (result == 1) {
                const nivel = await service.findOne(id)
                return res.status(200).json(nivel) 
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
            await service.destroy(id)
            return res.status(204).end()
        } catch (error) {
            res.status(404).json(error.message)
        }
    }

    static async restore(req, res) {
        try {
            const { id } = req.params
            await service.restore(id)
            const nivel = await service.findOne(id)
            return res.status(200).json(nivel) 
        } catch (error) {
            res.status(500).json(error.message)
        }
    }
}
module.exports = NiveisController