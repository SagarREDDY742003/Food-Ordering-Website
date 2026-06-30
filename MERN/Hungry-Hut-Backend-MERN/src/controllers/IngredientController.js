import { createIngredientItem, createIngredientsCategory, findIngredientCategoriesByRestaurantId, findRestaurantsIngredients, updateIngredientStock } from "../services/ingredientService.js";

export async function createIngredientCategory(req,res) {
    try {
        const {name,restaurantId} = req.body;
        const category = await createIngredientsCategory(name,restaurantId);
        res.status(201).json(category);
    } catch (error) {
        if(error instanceof Error)
            res.status(400).json({error:error.message});
        else
            res.status(500).json({error:"Internal server error"})
    }
}

export async function createIngredient(req,res) {
    try {
        const {restaurantId,name,categoryId} = req.body;
        const item = await createIngredientItem(restaurantId,name,categoryId);
        res.status(201).json(item);
    } catch (error) {
        if(error instanceof Error)
            res.status(400).json({error:error.message});
        else
            res.status(500).json({error:"Internal server error"})
    }
}

export async function updateStock(req,res) {
    try {
        const {id} = req.params;
        const item = await updateIngredientStock(id);
        res.status(200).json(item);
    } catch (error) {
        if(error instanceof Error)
            res.status(400).json({error:error.message});
        else
            res.status(500).json({error:"Internal server error"})
    }
}

export async function getRestaurantsIngredients(req,res) {
    try {
        const {id} = req.params;
        const items = await findRestaurantsIngredients(id);
        res.status(200).json(items);
    } catch (error) {
        if(error instanceof Error)
            res.status(400).json({error:error.message});
        else
            res.status(500).json({error:"Internal server error"})
    }
}

export async function getRestaurantsIngredientCategories(req,res) {
    try {
        const {id} = req.params;
        const items = await findIngredientCategoriesByRestaurantId(id);
        res.status(200).json(items);
    } catch (error) {
        if(error instanceof Error)
            res.status(400).json({error:error.message});
        else
            res.status(500).json({error:"Internal server error"})
    }
}