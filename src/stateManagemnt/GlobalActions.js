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

// Add To Cart Actions Function
export const addToCart = (product) => (dispatch, getState) => {
	const cartItems = getState().cart.cartItems.slice();
	let alreadyExists = false;
	cartItems.forEach((x) => {
		if (x.id === product.id) {
			alreadyExists = true;
			x.count++;
		}
	});
	if (!alreadyExists) {
		cartItems.push({ ...product, count: 1 });
	}
	dispatch({
		type: ADD_TO_CART,
		payload: { cartItems },
	});
	localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

// Remove From Cart Actions
export const removeFromCart = (product) => (dispatch, getState) => {
	const cartItems = getState().cart.cartItems.slice();
	cartItems.forEach((x) => {
		if (x.id === product.id) {
			x.count--;
			if (x.count === 0) {
				cartItems.splice(cartItems.indexOf(x), 1);
			}
		}
	});
	dispatch({
		type: REMOVE_FROM_CART,
		payload: { cartItems },
	});
	localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

// Location Actions
export const setLocation = (location) => (dispatch) => {
	dispatch({
		type: SET_LOCATION,
		payload: location,
	});
};

// Currency Actions
export const setCurrency = (currency) => (dispatch) => {
	dispatch({
		type: SET_CURRENCY,
		payload: currency,
	});
	localStorage.setItem("currency", currency);
};

// Qunatity Actions
export const setQuantity = (quantity) => (dispatch) => {
	dispatch({
		type: SET_QUANTITY,
		payload: quantity,
	});
};

// Size Actions
export const setSize = (sizeItem) => (dispatch) => {
	dispatch({
		type: SET_SIZE,
		payload: sizeItem,
	});
	localStorage.setItem("size", sizeItem);
	console.log(sizeItem);
};

// Color Actions
export const setColor = (colorItem) => (dispatch) => {
	dispatch({
		type: SET_COLOR,
		payload: colorItem,
	});
	localStorage.setItem("color", colorItem);
	console.log(colorItem);
};
