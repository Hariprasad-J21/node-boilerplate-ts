import { Model } from "sequelize";

class UserProductMapping extends Model {
  public id!: number;
  public userId!: number;
  public productId!: number;
}

export default UserProductMapping;
