'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order_detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.order_list,{
        foreignKey:"id", as:"listDetail"
      });
      this.belongsTo(models.food,{
        foreignKey:"id", as:"foodDetail"
      });
    }
  }
  order_detail.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    order_id: DataTypes.INTEGER,
    food_id: DataTypes.INTEGER,
    quantity: DataTypes.BIGINT,
    price: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'order_detail',
  });
  return order_detail;
};