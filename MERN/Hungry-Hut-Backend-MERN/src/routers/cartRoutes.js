import { Router } from "express";
import {addItemToCartController, clearCartController, findUserCart, removeItemFromCart, updateCartItemQuantityController} from "../controllers/cartController.js"
import { authenticate } from "../middleware/authenticate.js";

const cartRoutes = Router();

// add Item To Cart
cartRoutes.put('/cart/add',authenticate,addItemToCartController);
// update Cart Item Quantity
cartRoutes.put('/cart-item/update',authenticate,updateCartItemQuantityController);
// remove Cart Item
cartRoutes.delete('/cart-item/:id/remove',authenticate,removeItemFromCart);
// clear Cart
cartRoutes.put('/cart/clear',authenticate,clearCartController);
// find User Cart
cartRoutes.get('/cart',authenticate,findUserCart);

export default cartRoutes;