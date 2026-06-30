import { findAllEvents, findRestaurantEvents, createEventOfRestaurant, deleteRestaurantEvent } from "../services/eventService.js";


export async function createEvent(req, res) {
  try {
    // const { data } = req.body;
    const { restaurantId } = req.params;
    const createdEvent = await createEventOfRestaurant(req.body, restaurantId);
    res.status(201).json(createdEvent);
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message });
    else res.status(500).json({ error: "Internal server error" });
  }
}

export async function getAllEvents(req, res) {
  try {
    const events = await findAllEvents();
    res.status(200).json(events);
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message });
    else res.status(500).json({ error: "Internal server error" });
  }
}

export async function getRestaurantEvents(req, res) {
  try {
    const {restaurantId} = req.params;
    const events = await findRestaurantEvents(restaurantId);
    res.status(200).json(events);
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message });
    else res.status(500).json({ error: "Internal server error" });
  }
}

export async function deleteEvent(req, res) {
  try {
    const {eventId} = req.params;
    await deleteRestaurantEvent(eventId);
    res.status(200).json({message:"Event Deleted",success:true});
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message });
    else res.status(500).json({ error: "Internal server error" });
  }
}
