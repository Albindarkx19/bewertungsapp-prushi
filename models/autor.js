'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Autor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Autor.hasMany(models.Buch, { foreignKey: 'autorId' });
    }
  }
  Autor.init({
    name: DataTypes.STRING,
    geburtsjahr: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Autor',
  });
  return Autor;
};