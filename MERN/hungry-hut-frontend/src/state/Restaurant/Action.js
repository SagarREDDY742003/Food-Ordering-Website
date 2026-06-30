import { api } from "../../config/api";
import {
  CREATE_CATEGORY_FAILURE,
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_SUCCESS,
  CREATE_EVENTS_FAILURE,
  CREATE_EVENTS_REQUEST,
  CREATE_EVENTS_SUCCESS,
  CREATE_RESTAURANT_FAILURE,
  CREATE_RESTAURANT_REQUEST,
  CREATE_RESTAURANT_SUCCESS,
  DELETE_EVENTS_FAILURE,
  DELETE_EVENTS_REQUEST,
  DELETE_EVENTS_SUCCESS,
  DELETE_RESTAURANT_FAILURE,
  DELETE_RESTAURANT_REQUEST,
  DELETE_RESTAURANT_SUCCESS,
  GET_ALL_EVENTS_FAILURE,
  GET_ALL_EVENTS_REQUEST,
  GET_ALL_EVENTS_SUCCESS,
  GET_ALL_RESTAURANT_FAILURE,
  GET_ALL_RESTAURANT_REQUEST,
  GET_ALL_RESTAURANT_SUCCESS,
  GET_RESTAURANT_BY_ID_FAILURE,
  GET_RESTAURANT_BY_ID_REQUEST,
  GET_RESTAURANT_BY_ID_SUCCESS,
  GET_RESTAURANT_BY_USER_ID_FAILURE,
  GET_RESTAURANT_BY_USER_ID_REQUEST,
  GET_RESTAURANT_BY_USER_ID_SUCCESS,
  GET_RESTAURANTS_CATEGORY_FAILURE,
  GET_RESTAURANTS_CATEGORY_REQUEST,
  GET_RESTAURANTS_CATEGORY_SUCCESS,
  GET_RESTAURANTS_EVENTS_FAILURE,
  GET_RESTAURANTS_EVENTS_REQUEST,
  GET_RESTAURANTS_EVENTS_SUCCESS,
  UPDATE_RESTAURANT_FAILURE,
  UPDATE_RESTAURANT_REQUEST,
  UPDATE_RESTAURANT_STATUS_FAILURE,
  UPDATE_RESTAURANT_STATUS_REQUEST,
  UPDATE_RESTAURANT_STATUS_SUCCESS,
  UPDATE_RESTAURANT_SUCCESS,
} from "./ActionType";

export const getAllRestaurants = (token) => {
  return async (dispatch) => {
    dispatch({ type: GET_ALL_RESTAURANT_REQUEST });
    try {
      const { data } = await api.get("/api/restaurants", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: GET_ALL_RESTAURANT_SUCCESS, payload: data });
      console.log("get all restaurants", data);
    } catch (error) {
      console.log("get all restaurants", error);
      dispatch({ type: GET_ALL_RESTAURANT_FAILURE, payload: error });
    }
  };
};

export const getRestaurantById = (reqData) => {
  return async (dispatch) => {
    dispatch({ type: GET_RESTAURANT_BY_ID_REQUEST });
    try {
      const response = await api.get(
        `/api/restaurants/${reqData.restaurantId}`,
        {
          headers: {
            Authorization: `Bearer ${reqData.jwt}`,
          },
        },
      );
      dispatch({ type: GET_RESTAURANT_BY_ID_SUCCESS, payload: response.data });
      console.log("get restaurant by id", response.data);
    } catch (error) {
      console.log("get restaurant by id", error);
      dispatch({ type: GET_RESTAURANT_BY_ID_FAILURE, payload: error });
    }
  };
};

// export const getRestaurantByUserId = (jwt) => {
//   return async (dispatch) => {
//     dispatch({ type: GET_RESTAURANT_BY_USER_ID_REQUEST });
//     try {
//       const { data } = await api.get(`/api/admin/restaurant/user`, {
//         headers: {
//           Authorization: `Bearer ${jwt}`,
//         },
//       });
//       dispatch({ type: GET_RESTAURANT_BY_USER_ID_SUCCESS, payload: data });
//       console.log("get restaurant by user id ", data);
//     } catch (error) {
//       console.log("get restaurants by user id", error);
//       dispatch({ type: GET_RESTAURANT_BY_USER_ID_FAILURE, payload: error });
//     }
//   };
// };
export const getRestaurantByUserId = () => {
  return async (dispatch, getState) => {
    dispatch({ type: GET_RESTAURANT_BY_USER_ID_REQUEST });
    try {
      // Access auth state directly
      const { auth } = getState();
      const jwt = auth.jwt;
      const role = auth.user?.role;

      let url;
      if (role === "ROLE_ADMIN") {
        url = "/api/admin/restaurant/user";
      } else if (role === "ROLE_CUSTOMER") {
        url = "/api/cart"; // customer route
      } else {
        throw new Error("Unsupported role");
      }

      const { data } = await api.get(url, {
        headers: { Authorization: `Bearer ${jwt}` },
      });

      dispatch({ type: GET_RESTAURANT_BY_USER_ID_SUCCESS, payload: data });
      console.log("get restaurant by user id ", data);
    } catch (error) {
      console.log("get restaurants by user id", error);
      dispatch({ type: GET_RESTAURANT_BY_USER_ID_FAILURE, payload: error });
    }
  };
};

export const createRestaurant = (reqData) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_RESTAURANT_REQUEST });
    try {
      const { data } = await api.post(`/api/admin/restaurant`, reqData.data, {
        headers: {
          Authorization: `Bearer ${reqData.token}`,
        },
      });
      dispatch({ type: CREATE_RESTAURANT_SUCCESS, payload: data });
      console.log("create restaurants", data);
    } catch (error) {
      console.log("create restaurants", error);
      dispatch({ type: CREATE_RESTAURANT_FAILURE, payload: error });
    }
  };
};

export const updateRestaurant = ({ restaurantId, restaurantData, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_RESTAURANT_REQUEST });
    try {
      const response = await api.put(
        `/api/admin/restaurant/${restaurantId}`,
        restaurantData,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        },
      );
      dispatch({
        type: UPDATE_RESTAURANT_SUCCESS,
        payload: response.data,
      });
      console.log("update restaurants", response.data);
    } catch (error) {
      console.log("update restaurants", error);
      dispatch({ type: UPDATE_RESTAURANT_FAILURE, payload: error });
    }
  };
};

export const deleteRestaurant = ({ restaurantId, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_RESTAURANT_REQUEST });
    try {
      const response = await api.delete(
        `/api/admin/restaurant/${restaurantId}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        },
      );
      console.log("delete restaurant", response.data);
      dispatch({ type: DELETE_RESTAURANT_SUCCESS, payload: restaurantId });
    } catch (error) {
      console.log("delete restaurant", error);
      dispatch({ type: DELETE_RESTAURANT_FAILURE, payload: error });
    }
  };
};

export const updateRestaurantStatus = ({ restaurantId, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_RESTAURANT_STATUS_REQUEST });
    try {
      const response = await api.put(
        `/api/admin/restaurant/${restaurantId}/status`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        },
      );
      dispatch({
        type: UPDATE_RESTAURANT_STATUS_SUCCESS,
        payload: response.data,
      });
      console.log("update restaurants", response.data);
    } catch (error) {
      console.log("update restaurants", error);
      dispatch({ type: UPDATE_RESTAURANT_STATUS_FAILURE, payload: error });
    }
  };
};

export const createEvent = ({ data, jwt, restaurantId }) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_EVENTS_REQUEST });
    try {
      const response = await api.post(
        `/api/admin/events/restaurant/${restaurantId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        },
      );
      dispatch({ type: CREATE_EVENTS_SUCCESS, payload: response.data });
      console.log("create events", response.data);
    } catch (error) {
      console.log("create events", error);
      dispatch({ type: CREATE_EVENTS_FAILURE, payload: error });
    }
  };
};

export const getAllEvents = ({ jwt }) => {
  return async (dispatch) => {
    dispatch({ type: GET_ALL_EVENTS_REQUEST });
    try {
      const response = await api.get(`/api/events`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("get all events", response.data);
      dispatch({ type: GET_ALL_EVENTS_SUCCESS, payload: response.data });
    } catch (error) {
      console.log("get all events", error);
      dispatch({ type: GET_ALL_EVENTS_FAILURE, payload: error });
    }
  };
};

export const deleteEvent = ({ eventId, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_EVENTS_REQUEST });
    try {
      const response = await api.delete(`/api/admin/events/${eventId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("delete event", response.data);
      dispatch({ type: DELETE_EVENTS_SUCCESS, payload: eventId });
    } catch (error) {
      console.log("delete event", error);
      dispatch({ type: DELETE_EVENTS_FAILURE, payload: error });
    }
  };
};

export const getRestaurantEvents = ({ restaurantId, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: GET_RESTAURANTS_EVENTS_REQUEST });
    try {
      const response = await api.get(
        `/api/admin/events/restaurant/${restaurantId}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        },
      );
      console.log("get restaurant events", response.data);
      dispatch({
        type: GET_RESTAURANTS_EVENTS_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      console.log("get restaurant events", error);
      dispatch({ type: GET_RESTAURANTS_EVENTS_FAILURE, payload: error });
    }
  };
};

export const createCategory = ({ data, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_CATEGORY_REQUEST });
    try {
      const response = await api.post(`/api/admin/category`, data, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      dispatch({ type: CREATE_CATEGORY_SUCCESS, payload: response.data });
      console.log("create category", response.data);
    } catch (error) {
      console.log("create category", error);
      dispatch({ type: CREATE_CATEGORY_FAILURE, payload: error });
    }
  };
};

export const getRestaurantsCategory = ({ jwt, restaurantId }) => {
  return async (dispatch) => {
    dispatch({ type: GET_RESTAURANTS_CATEGORY_REQUEST });
    try {
      const response = await api.get(
        `/api/category/restaurant/${restaurantId}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        },
      );
      console.log("get restaurant categories", response.data);
      dispatch({
        type: GET_RESTAURANTS_CATEGORY_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      console.log("get restaurant categories", error);
      dispatch({ type: GET_RESTAURANTS_CATEGORY_FAILURE, payload: error });
    }
  };
};
