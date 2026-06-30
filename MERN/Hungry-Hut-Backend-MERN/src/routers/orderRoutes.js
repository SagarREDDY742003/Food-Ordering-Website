import { Router } from "express";
import { authenticate } from "../middleware/authenticate.js";
import { createOrderController, deleteOrder, getAllRestaurantOrdersController, getUserOrdersController, updateOrderStatusController } from "../controllers/orderController.js";

const orderRoutes = Router();

// customer
// create order
orderRoutes.post('/order',authenticate,createOrderController);
// get user orders
orderRoutes.get('/order/user',authenticate,getUserOrdersController);

// admin
// get restaurant Orders
orderRoutes.get('/admin/order/restaurant/:restaurantId',authenticate,getAllRestaurantOrdersController);
// delete order
orderRoutes.delete('/admin/order/:orderId',authenticate,deleteOrder);
//update Order Status
orderRoutes.put('/admin/order/:orderId/:orderStatus',authenticate,updateOrderStatusController);
export default orderRoutes;