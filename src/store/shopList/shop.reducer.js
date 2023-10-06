import { DELETE_DATA,
        ADD_DATA, 
        ADD_BASKET_DATA, 
        REMOVE_ITEM_FROM_BASKET, 
        ADD_SEARCH_DATA, 
        ADD_FAVORITE_DATA } from './shop.types';

    
const initialState = {
    shopData: [],
    basketData: [],
    searchData: [],
    favoriteData: []
}

export const dataReducer = (state = initialState, action) => {
    switch (action.type) {

        case DELETE_DATA:
            return {
                ...state,
                shopData: action.payload
            }

        case ADD_DATA:
            return {
                ...state,
                shopData: action.payload
            }

        case ADD_BASKET_DATA:
            return {
                ...state,
                basketData: action.payload
            }

        case REMOVE_ITEM_FROM_BASKET:
            return {
                ...state,
                basketData: action.payload,
            };
        
        case ADD_SEARCH_DATA:
            return {
                ...state,
                searchData: action.payload,
            };

        case ADD_FAVORITE_DATA:
            return {
                ...state,
                favoriteData: action.payload,
            };
        default:
            return state
    }
}