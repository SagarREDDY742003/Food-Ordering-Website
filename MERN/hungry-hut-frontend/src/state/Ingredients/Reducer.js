import { CREATE_INGREDIENT_CATEGORY_SUCCESS, CREATE_INGREDIENT_SUCCESS, GET_INGREDIENT_CATEGORY_SUCCESS, GET_INGREDIENTS, UPDATE_STOCK_SUCCESS } from "./ActionType";

const initialState = {
    ingredients:[],
    update:null,
    categories:null
};

export const ingredientReducer = (state=initialState,action) => {

    switch (action.type) {
        case GET_INGREDIENTS:
            return {
                ...state,
                ingredients:action.payload
            };
            
        case GET_INGREDIENT_CATEGORY_SUCCESS:
            return {
                ...state,
                categories: action.payload
            };
        
        case CREATE_INGREDIENT_CATEGORY_SUCCESS:
            return{
                ...state,
                categories:[...state.categories,action.payload]
            };

        case CREATE_INGREDIENT_SUCCESS:
            return{
                ...state,
                ingredients:[...state.ingredients,action.payload]
            };

        case UPDATE_STOCK_SUCCESS:
            return{
                ...state,
                update:action.payload,
                ingredients: state.ingredients.map((item) => 
                item._id===action.payload._id ? action.payload : item
                )
            };
    
        default:
            return state;
    };
}