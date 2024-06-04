import Product from "../models/product";
import logger from "../config/logger";
import UserProductMapping from "../models/userProductMapping";

const createProduct = async (
  productName: string,
  price: number
): Promise<Product> => {
  try {
    const product = await Product.create({ productName, price });
    return product;
  } catch (error) {
    logger.log("error", error);
    throw new Error("Error creating product");
  }
};

const getProduct = async (productId: number): Promise<Product> => {
  try {
    console.log("product id is", productId);
    const productById = await Product.findOne({ where: { id: productId } });
    return productById;
  } catch (error) {
    logger.log("error", error);
    throw new Error("Error finding the product");
  }
};

const mapping = async (productId, userId): Promise<UserProductMapping> => {
  try {
    const result = await UserProductMapping.create({ productId, userId });
    return result;
  } catch (error) {
    logger.log("error", error);
    throw new Error("Error finding the product");
  }
};

export default { createProduct, getProduct, mapping };
