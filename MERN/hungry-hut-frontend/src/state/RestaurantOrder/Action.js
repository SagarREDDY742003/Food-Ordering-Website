import { api } from "../../config/api";
import {
  GET_RESTAURANT_ORDER_FAILURE,
  GET_RESTAURANT_ORDER_REQUEST,
  GET_RESTAURANT_ORDER_SUCCESS,
  UPDATE_ORDER_STATUS_FAILURE,
  UPDATE_ORDER_STATUS_REQUEST,
  UPDATE_ORDER_STATUS_SUCCESS,
} from "./ActionType";

export const updateOrderStatus = ({ orderId, orderStatus, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_ORDER_STATUS_REQUEST });
    try {
      const response = await api.put(
        `api/admin/order/${orderId}/${orderStatus}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log("updateOrderStatus", response.data);
      dispatch({ type: UPDATE_ORDER_STATUS_SUCCESS, payload: response.data });
    } catch (error) {
      console.log("error", error);
      dispatch({ type: UPDATE_ORDER_STATUS_FAILURE, payload: error });
    }
  };
};

export const getRestaurantsOrder = ({ restaurantId, orderStatus, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: GET_RESTAURANT_ORDER_REQUEST });
    try {
      const { data } = await api.get(`api/admin/order/restaurant/${restaurantId}`, {
        params: { orderStatus: orderStatus },
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("getRestaurantsOrder", data);
      dispatch({ type: GET_RESTAURANT_ORDER_SUCCESS, payload: data });
    } catch (error) {
      console.log("error", error);
      dispatch({ type: GET_RESTAURANT_ORDER_FAILURE, payload: error });
    }
  };
};
