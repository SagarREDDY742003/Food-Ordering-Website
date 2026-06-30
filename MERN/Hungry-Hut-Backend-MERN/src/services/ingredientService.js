import IngredientCategory from "../models/ingredientCategory.model.js";
import IngredientsItem from "../models/ingredientsItem.model.js";
import Restaurant from "../models/restaurant.model.js";
import { findRestaurantById } from "./RestaurantService.js";

export async function createIngredientsCategory(name,restaurantId) {
    try {
        let category = await IngredientCategory.findOne({
            restaurant:restaurantId,
            name:name,
        });
        if(category) return category;
        const restaurant = await Restaurant.findById(restaurantId);
        if(!restaurant) throw new Error("Restaurant not found");

        category = await IngredientCategory.create({
            restaurant:restaurantId,
            name:name,
        });
        return category;
    } catch (error) {
        throw new Error('Failed to create ingredients category');
    }
}

export async function findIngredientsCategoryById(id) {
    try {
        const category = await IngredientCategory.findById(id);
        if(!category) throw new Error("Ingredient category not found");
        return category;
    } catch (error) {
        throw new Error('Failed to find ingredients category');
    }
}

export async function findIngredientCategoriesByRestaurantId(restaurantId) {
    try {
        const categories = await IngredientCategory.find({
            restaurant:restaurantId,
        });
        return categories;
    } catch (error) {
        throw new Error('Failed to find ingredients categories for restaurant');
    }
}

export async function findRestaurantsIngredients(restaurantId) {
    try {
        const items = await IngredientsItem.find({
            restaurant:restaurantId,
        }).populate({path:"category",select:"name"});
        return items;
    } catch (error) {
        throw new Error('Failed to find ingredients for restaurant');
    }
}

export async function createIngredientItem(restaurantId,ingredientName,categoryId) {
    try {
        const category = await findIngredientsCategoryById(categoryId);
        const restaurant = await findRestaurantById(restaurantId);
        let item = await IngredientsItem.findOne({
            restaurant:restaurantId,
            name:ingredientName,
            category:category._id,
        });
        if(item) return item;
        item = await IngredientsItem.create({
            restaurant:restaurantId,
            name:ingredientName,
            category:category._id,
        });
        category.ingredients.push(item._id);
        await category.save();
        return item;
    } catch (error) {
        throw new Error('Failed to create ingredients item');
    }
}

export async function updateIngredientStock(id) {
    try {
        const item = await IngredientsItem.findById(id).populate({path:"category",select:"name"});
        if(!item) throw new Error('ingredient not found');
        item.inStock = !item.inStock;
        await item.save();
        return item;
    } catch (error) {
        throw new Error('Failed to update ingredient stock status');
    }
}