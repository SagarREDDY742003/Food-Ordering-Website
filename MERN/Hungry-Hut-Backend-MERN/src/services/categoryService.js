import Category from "../models/category.model.js";
import Restaurant from "../models/restaurant.model.js";

export async function createCategory(name, userId) {
  try {
    const restaurant = await Restaurant.findOne({ owner: userId });
    if (!restaurant) throw new Error("Restaurant not found");
    const createdCategory = new Category({
      name,
      restaurant: restaurant._id,
    });
    await createdCategory.save();
    return createdCategory;
  } catch (error) {
    throw new Error("Failed to create category");
  }
}

export async function findCategoryByRestaurantId(restaurantId) {
  try {
    const categories = await Category.find({ restaurant: restaurantId });
    return categories;
  } catch (error) {
    throw new Error("Failed to find restaurant categories");
  }
}

export async function findCategoryById(categoryId) {
  try {
    const category = await Category.findById(categoryId);
    if(!category) throw new Error("category not found");
    return category;
  } catch (error) {
    throw new Error("Failed to find category");
  }
}
