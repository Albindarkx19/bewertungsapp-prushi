'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Juror extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Juror.hasMany(models.Evaluation, { foreignKey: 'jurorId' });
    }
  }
  Juror.init({
    name: { type: DataTypes.STRING(100), allowNull: false },
    email: { type: DataTypes.STRING(255), allowNull: false, unique: true }
  }, {
    sequelize,
    modelName: 'Juror',
  });
  return Juror;
};