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
      models.user.belongsToMany(models.critter, { through: 'belongTos', onDelete: 'CASCADE'});
    }
  };
  critter.init({
    name: DataTypes.STRING,
    apiId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'critter',
  });
  return critter;
};