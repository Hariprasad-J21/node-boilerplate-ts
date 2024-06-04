import sequelize from "../config/sequelize";
import { DataTypes } from "sequelize";
import Product from "../types/modelTypes/product";

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { sequelize, modelName: "Product", tableName: "Product" }
);
export default Product;
