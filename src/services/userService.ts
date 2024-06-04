import User from "../models/user";
import logger from "../config/logger";

const getElementById = async (userId: number): Promise<User> => {
  try {
    const user = await User.findOne({
      where: { id: userId },
      attributes: { exclude: ["password"] },
    });
    return user;
  } catch {
    throw new Error("Internal server error");
  }
};

const updateUserById = async (
  userId: number,
  userName: string
): Promise<User> => {
  try {
    const [updateRowsCount] = await User.update(
      { userName: userName },
      { where: { id: userId }, returning: true }
    );

    if (updateRowsCount === 0) {
      throw new Error("Error updating the field");
    }
    const updatedUser = await getElementById(userId);
    return updatedUser;
  } catch {
    throw new Error("Error updating the user");
  }
};

const deleteUserById = async (Id: number): Promise<void> => {
  try {
    const deletedRowCount = await User.destroy({ where: { Id } });

    if (deletedRowCount === 0) {
      throw new Error("User not found or delete failed");
    }
  } catch (error) {
    logger.log("error", error);
    throw new Error("Error deleting user");
  }
};

export default { getElementById, updateUserById, deleteUserById };
