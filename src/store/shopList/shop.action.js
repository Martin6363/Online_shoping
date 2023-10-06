import { ADD_DATA, 
        DELETE_DATA, 
        ADD_BASKET_DATA, 
        REMOVE_ITEM_FROM_BASKET, 
        ADD_SEARCH_DATA, 
        ADD_FAVORITE_DATA } from './shop.types'


export function addData ( list ) {
    return {
        type: ADD_DATA,
        payload: list
    }
}

export function deleteData ( list ) {
    return {
        type: DELETE_DATA,
        payload: list
    }
}


// Basket data

export function addBasketData ( list ) {
    return {
        type: ADD_BASKET_DATA,
        payload: list
    }
}

export function deleteBasketData (data, id) {
    const updatedBasketData = data.filter((basket) => basket.basketId !== id);
    return {
        type: REMOVE_ITEM_FROM_BASKET,
        payload: updatedBasketData
    }
}


// Search data 

export function addSearchData ( list ) {
    return {
        type: ADD_SEARCH_DATA,
        payload: list
    }
}


// Favorite Data

export function addFavoriteData ( list ) {
    return {
        type: ADD_FAVORITE_DATA,
        payload: list
    }
}