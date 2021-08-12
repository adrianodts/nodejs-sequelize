'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class niveis extends Model {
    static associate(models) {
      niveis.hasMany(models.turmas, {
        foreignKey: 'nivel_id'
      })
    }
  };
  niveis.init({
    descr_nivel: DataTypes.STRING
  }, {
    sequelize,
    paranoid: true,
    timestamps: true,
    modelName: 'niveis'
  });
  return niveis;
};