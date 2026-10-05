'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Criterion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Criterion.hasMany(models.Evaluation, { foreignKey: 'criterionId' });
    }
  }
  Criterion.init({
    name: { type: DataTypes.STRING(100), allowNull: false },
    maxScore: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1 } },
    weight: {
      type: DataTypes.DECIMAL(4, 2),
      allowNull: false,
      defaultValue: 1.00,
      validate: { min: 0.01 }
    }
  }, {
    sequelize,
    modelName: 'Criterion',
  });
  return Criterion;
};