'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pessoas extends Model {
    static associate(models) {
      pessoas.hasMany(models.turmas, {
        foreignKey: 'docente_id'
      })
      pessoas.hasMany(models.matriculas, {
        foreignKey: 'estudante_id',
        scope: { status: 'confirmado'}, as: 'aulasMatriculadas'
      })
    }
  };
  pessoas.init({
    nome: {
      type: DataTypes.STRING,
      validate: {
        validarNome: function(dado) {
          if (dado.length <=3) {
            throw new Error('O nome deve ter mais de três caracteres.')
          }
        }
      }
    },
    ativo: DataTypes.BOOLEAN,
    email: { 
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'dado do tipo email está inválido.'
        }
      }
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    paranoid: true,
    timestamps: true,
    modelName: 'pessoas',
    defaultScope: {
      where: {
        ativo: true
      }
    },
    scopes : {
      todos: {}
    }
  });
  return pessoas;
};