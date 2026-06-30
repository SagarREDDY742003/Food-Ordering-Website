import mongoose from "mongoose";
import Food from "../models/food.model.js";
import Restaurant from "../models/restaurant.model.js";
import Category from "../models/category.model.js";

export const createFood = async (req, restaurant) => {  
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const food = await Food.create([{
      name: req.name,
      description: req.description,
      price: req.price,
      foodCategory: req.category,
      images: req.images,
      restaurant: restaurant._id,
      isVegetarian: req.vegetarian,
      isSeasonable: req.seasonal,
      ingredients: req.ingredients,
      creationDate: new Date(),
    }],{session});

    restaurant.foods.push(food[0]._id);
    await restaurant.save({session});

    await session.commitTransaction();
    session.endSession();

    return food[0];
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw new Error(error.message);
  }
};

export const deleteFood = async (foodId) => {
  try {
    const food = await Food.findById(foodId);
    if(!food) throw new Error('Food not found');
    // remove food reference from restaurant
    if(food.restaurant){
        const restaurant = await Restaurant.findById(food.restaurant);
        if(restaurant){
            restaurant.foods = restaurant.foods.filter(
                (id) => id.toString() !== foodId.toString()
            );
            await restaurant.save();
        }
    }
    // delete the food itself
    await Food.findByIdAndDelete(foodId);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getRestaurantFood = async (
  restaurantId,
  vegetarian,
  nonveg,
  seasonal,
  food_category,
) => {
  try {
    let query = {restaurant: restaurantId};
    if(vegetarian=="true") query.isVegetarian=true;
    if(nonveg=="true") query.isVegetarian=false;
    if(seasonal=="true") query.isSeasonable=true;
    if (food_category) {
      const category = await Category.findOne({ name: food_category });
      if (!category) throw new Error("Category not found");
      query.foodCategory = category._id;
    }

    const foods = await Food.find(query).populate([
        {path: "ingredients",populate:{path:"category",select:"name"}},
        "foodCategory",
        {path:"restaurant",select:"name _id"},
    ]);
    return foods;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const searchFood = async(keyword) =>{
    try {
        let query = {};
        if(keyword){
            query.$or=[
                {name:{$regex:keyword,$options:"i"}},
                {"foodCategory.name":{$regex:keyword,$options:"i"}},
            ];
        }
        const foods = await Food.find(query);
        return foods;
    } catch (error) {
        throw new Error(error.message);
    }
}

// export const findFoodById = async (foodId) => {
//   try {
//     const food = await Food.findById(foodId);
//     if(!food) throw new Error('Food not found');
//     return food;
//   } catch (error) {
//     throw new Error(error.message);
//   }
// }

export const updateFoodAvailabilityStatus = async (foodId) => {
  try {
    const food = await Food.findById(foodId).populate([
        {path:"ingredients",populate:{path:"category",select:"name"}},
        "foodCategory",
        {path:"restaurant",select:"name _id"},
    ]);
    if(!food) throw new Error("Food not found");
    food.available=!food.available;
    await food.save();
    return food;
  } catch (error) {
    throw new Error('Failed to update avaliability status for food');
  }
};
