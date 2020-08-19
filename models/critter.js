'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class critter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.critter.belongsToMany(models.user, { through: 'belongTos', onDelete: 'CASCADE'});
    }
  };
  critter.init({
    type: DataTypes.STRING,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'critter',
  });
  return critter;
};