'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class belongTos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  belongTos.init({
    userId: DataTypes.INTEGER,
    critterId: DataTypes.INTEGER,
    nickname: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'belongTos',
  });
  return belongTos;
};