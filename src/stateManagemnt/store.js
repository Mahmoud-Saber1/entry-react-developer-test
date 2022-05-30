// Create Store for the application
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import {
	cartReducer,
	locationReducer,
	currencyReducer,
	quantityReducer,
	sizeReducer,
	colorReducer,
} from "./GlobalReducers";

// Cpmpose enhancer And Initial State
const initialState = {};
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Create Store
const store = createStore(
	combineReducers({
		cart: cartReducer,
		location: locationReducer,
		currency: currencyReducer,
		quantity: quantityReducer,
		sizeItem: sizeReducer,
		colorItem: colorReducer,
	}),
	initialState,
	composeEnhancer(applyMiddleware(thunk))
); // Export Store
export default store;
