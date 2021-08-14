const Services = require('./Services')
const database = require('../models')

class PessoasServices extends Services {
    constructor() {
        super('pessoas')
        this.matriculas = new Services('matriculas')
    }

    async findAllScope(where = {}) {
        return await database[this.modelo]
            .scope('todos')
            .findAll({
                where: {
                    ... where
                }    
            })
    }

    async findAllActive(where = {}) {
        return await database[this.modelo].findAll({
            where: {
                ... where
            }
        })
    }

    async updatePessoasEMatriculas(estudanteId) {
        return database.sequelize.transaction(async tx => {
            await super.update(estudanteId, { ativo: false }, { transaction : tx })

            await this.matriculas.updateWhere({ status: 'cancelado' }, { estudante_id: Number(estudanteId) }, 
                { transaction : tx }
            )
        })
    }
}

module.exports = PessoasServices