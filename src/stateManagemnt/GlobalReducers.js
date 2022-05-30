// Import All Types
import {
	ADD_TO_CART,
	REMOVE_FROM_CART,
	SET_LOCATION,
	SET_CURRENCY,
	SET_QUANTITY,
	SET_SIZE,
	SET_COLOR,
} from "./types";

// Cart Reducer (Local Storage)
export const cartReducer = (
	state = { cartItems: JSON.parse(localStorage.getItem("cartItems")) || [] },
	action
) => {
	switch (action.type) {
		case ADD_TO_CART:
			return { cartItems: action.payload.cartItems };
		case REMOVE_FROM_CART:
			return { cartItems: action.payload.cartItems };
		default:
			return state;
	}
};

// Location Reducer
export const locationReducer = (state = "", action) => {
	switch (action.type) {
		case SET_LOCATION:
			return action.payload;
		default:
			return state;
	}
};

// Currency Reducer
export const currencyReducer = (
	state = {
		currency: localStorage.getItem("currency") || "USD",
	},
	action
) => {
	switch (action.type) {
		case SET_CURRENCY:
			return { currency: action.payload };
		default:
			return state;
	}
};

// Quantity Reducer
export const quantityReducer = (state = 1, action) => {
	switch (action.type) {
		case SET_QUANTITY:
			return action.payload;
		default:
			return state;
	}
};

// Size Reducer
export const sizeReducer = (
	state = { size: localStorage.getItem("size") || "" },
	action
) => {
	switch (action.type) {
		case SET_SIZE:
			return { size: action.payload };
		default:
			return state;
	}
};

// Color Reducer
export const colorReducer = (
	state = { color: localStorage.getItem("color") || "" },
	action
) => {
	switch (action.type) {
		case SET_COLOR:
			return { color: action.payload };
		default:
			return state;
	}
};
