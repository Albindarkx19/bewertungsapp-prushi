'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ausleihe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Ausleihe.belongsTo(models.Buch, { foreignKey: 'buchId' });
      Ausleihe.belongsTo(models.Leser, { foreignKey: 'leserId' });
    }
  }
  Ausleihe.init({
    buchId: { type: DataTypes.INTEGER, allowNull: false },
    leserId: { type: DataTypes.INTEGER, allowNull: false },
    ausgeliehenAm: { type: DataTypes.DATE, allowNull: false },
    zurueckAm: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Ausleihe',
  });
  return Ausleihe;
};