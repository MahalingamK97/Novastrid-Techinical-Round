'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Chat.init({
    from: DataTypes.INTEGER,
    fromText: DataTypes.STRING,
    to: DataTypes.INTEGER,
    toText: DataTypes.STRING,
    textDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Chat',
  });
  return Chat;
};