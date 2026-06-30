import { Router } from "express";
import { createFoodItem, deleteFoodItem, getMenuItemsByRestaurantId, updateFoodAvailability } from "../controllers/foodController.js";
import { authenticate } from "../middleware/authenticate.js";

const foodRouter = Router();

//admin
//create food
foodRouter.post('/admin/food',authenticate,createFoodItem);
//delete food
foodRouter.delete('/admin/food/:id',authenticate, deleteFoodItem);
//update food avaliability status
foodRouter.put('/admin/food/:foodId',updateFoodAvailability);

//customer
// search food
foodRouter.put('/food/search',updateFoodAvailability);
// get restaurant food
foodRouter.get('/food/restaurant/:restaurantId',getMenuItemsByRestaurantId);

export default foodRouter;