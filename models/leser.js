'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Leser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Leser.hasMany(models.Ausleihe, { foreignKey: 'leserId' });
    }
  }
  Leser.init({
    vorname: { type: DataTypes.STRING, allowNull: false },
    nachname: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false }
  }, {
    sequelize,
    modelName: 'Leser',
  });
  return Leser;
};