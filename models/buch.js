'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Buch extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Buch.belongsTo(models.Autor, { foreignKey: 'autorId' });
      Buch.hasMany(models.Ausleihe, { foreignKey: 'buchId' });
    }
  }
  Buch.init({
    titel: DataTypes.STRING,
    isbn: DataTypes.STRING,
    erscheinungsjahr: DataTypes.INTEGER,
    autorId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Buch',
    tableName: 'Buches',
  });
  return Buch;
};