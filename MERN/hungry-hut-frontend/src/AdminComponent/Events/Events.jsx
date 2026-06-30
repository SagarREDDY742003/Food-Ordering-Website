import { useEffect } from "react";
import EventCard from "../../component/Profile/EventCard";
import { getRestaurantEvents } from "../../state/Restaurant/Action";
import CreateEventForm from "./CreateEventForm";
import { useDispatch, useSelector } from "react-redux";


const Events = () => {

  const dispatch = useDispatch();
  const events = useSelector((state) => state.restaurant.restaurantEvents);
  const restaurant = useSelector((state) => state.restaurant.usersRestaurant);
  useEffect(() => {
    dispatch(getRestaurantEvents({ restaurantId: restaurant._id, jwt: localStorage.getItem("jwt") }));
  }, [dispatch, restaurant._id]);

  return (
    <div>
      <div>
      <CreateEventForm/>
      </div>
      <div className="flex flex-wrap gap-4 p-5">
        {events.map((event) => <EventCard accessButton={true} event={event} />)} 
      </div>

    </div>
  );
};

export default Events;
