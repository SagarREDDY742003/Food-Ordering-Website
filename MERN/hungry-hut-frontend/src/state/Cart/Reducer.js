import * as actionType from "./ActionType";
import { LOGOUT } from "../Authentication/ActionType";

const initialState = {
  cart: null,
  cartItems: [],
  loading: false,
  error: null,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.FIND_CART_REQUEST:
    case actionType.GET_ALL_CART_ITEMS_REQUEST:
    case actionType.UPDATE_CART_ITEM_REQUEST:
    case actionType.REMOVE_CART_ITEM_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case actionType.FIND_CART_SUCCESS:
    case actionType.CLEAR_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        cart: action.payload,
        cartItems: action.payload.items,
      };

    case actionType.ADD_ITEM_TO_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        cartItems: [action.payload, ...state.cartItems],
      };

    case actionType.UPDATE_CART_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        cartItems: state.cartItems.map((item) =>
          item._id === action.payload._id ? action.payload : item,
        ),
      };

    case actionType.REMOVE_CART_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        cart: action.payload,
        cartItems: action.payload.items,
      };

    case actionType.FIND_CART_FAILURE:
    case actionType.UPDATE_CART_ITEM_FAILURE:
    case actionType.REMOVE_CART_ITEM_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case LOGOUT:
      localStorage.removeItem("jwt");
      return {
        ...state,
        cartItems: [],
        cart: null,
        success: "logout success",
      };

    default:
      return state;
  }
};

export default cartReducer;
