import { Model } from "sequelize";

class Product extends Model {
  public id!: number;
  public productName!: string;
  public price!: number;
}

export default Product;
