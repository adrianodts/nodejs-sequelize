const Services = require('./Services')
const database = require('../models')

class MatriculasServices extends Services {
    constructor() {
        super('matriculas')
    }

    async findByConfirmed(matriculaId, estudanteId) {
        return await database[this.modelo].findOne({
            where: {
                id: matriculaId,
                estudante_id: estudanteId
            }
        })
    }

    async update(matriculaId, estudanteId, data) {
        return await database[this.modelo].update(data, {
            where: {
                id: matriculaId,
                estudante_id: estudanteId
            }
        })
    }
}

module.exports = MatriculasServices