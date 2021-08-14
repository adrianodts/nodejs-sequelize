const database = require('../models')

class Services {
    constructor(modelo) {
        this.modelo = modelo
    }

    async all() {
        return await database[this.modelo].findAll()
    }

    async findOne(id) {
        return await database[this.modelo].findOne({ where: { id: id } })
    }

    async findOne(where = {}) {
        return await database[this.modelo].findOne({ where: { ...where } })
    }

    async findAndCountAll(where = {}, ...aggregator) {
        return await database[this.modelo].findAndCountAll({ where: { ...where }, ...aggregator })
    }

    async create(data) {
        return await database[this.modelo].create(data)
    }

    async update(id, data, transaction = {}) {
        return await database[this.modelo].update(data, { where: { id: id }, transaction })
    }

    async updateWhere(data, where = {}, transaction = {}) {
        console.log(`where ${where} | data ${data} | transaction ${transaction}`)
        return await database[this.modelo].update(data, { where: { ...where } }, transaction )
    }

    async destroy(id) {
        return await database[this.modelo].destroy({ where: { id: id } })
    }

    async destroy(where = {}) {
        return await database[this.modelo].destroy({ where: { ...where } })
    }

    async update(id, data) {
        return await database[this.modelo].update(data, { where: { id: id } })
    }

    async restore(id) {
        return await database[this.modelo].restore({ where: { id: id } })
    }

    async restore(where = {}) {
        return await database[this.modelo].restore({ where: { ...where } })
    }
}

module.exports = Services