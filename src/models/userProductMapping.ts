import sequelize from "../config/sequelize";
import { DataTypes } from "sequelize";
import UserProductMapping from "../types/modelTypes/userProductMapping";

UserProductMapping.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "UserProductMapping",
    tableName: "UserProductMapping",
  }
);

export default UserProductMapping;
