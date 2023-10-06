import { combineReducers } from "redux";
import { dataReducer } from "./shopList/shop.reducer";

export const reducer = combineReducers({
    dataReducer,
})