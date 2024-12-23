import { createContext, useState, useReducer } from "react";
import CartReducer from "./CartReducer";
import { ProductContext } from "./ProductContext";

const initialState = {
	cart: [],
};

// Create a context
export const CartContext = createContext({ initialState });

// Create a provider for the context
export function CartContextProvider({ children }) {
	const [state, dispatch] = useReducer(CartReducer, initialState);

	// Actions
	function removeFromCart(id) {
		dispatch({
			type: "REMOVE_ITEM_FROM_CART",
			payload: id,
		});
	}

	function addToCart(id) {
		dispatch({
			type: "ADD_ITEM_TO_CART",
			payload: id,
		});
	}
	

	return (
		<CartContext.Provider
			value={{
				cart: state.cart,
				addToCart,
				removeFromCart,
			}}
		>
			{children}
		</CartContext.Provider>
	);
}
