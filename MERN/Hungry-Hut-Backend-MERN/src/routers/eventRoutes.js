import { Router } from "express";
import { createEvent, deleteEvent, getAllEvents, getRestaurantEvents } from "../controllers/eventController.js";
import { authenticate } from "../middleware/authenticate.js";

const eventRoutes = Router();

// admin
// create event
eventRoutes.post('/admin/events/restaurant/:restaurantId',authenticate,createEvent);
// get All Events Of Restaurant
eventRoutes.get('/admin/events/restaurant/:restaurantId',getRestaurantEvents);
// delete Events
eventRoutes.delete('/admin/events/:eventId',authenticate,deleteEvent);


// customer
// get All Events
eventRoutes.get('/events',getAllEvents);

export default eventRoutes;