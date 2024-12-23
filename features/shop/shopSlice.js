import generateUniqueId from "../../utils/uuid";

const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    cart: [

    ],
    isCartActive: false
}

const shopSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const { itemId, qty, size, color } = action.payload
            const cartId = generateUniqueId(itemId, color, size)
            //gets all occurences of that item in the cart
            const occurences = state.cart.filter((cartItem) => cartItem.itemId === itemId)
            if (occurences.length !== 0) {
                //finds the occurence with the same size as the incoming item
                const sameSize = occurences.find((oc) => oc.size === size)
                if (sameSize && sameSize.color.toLowerCase() === color.toLowerCase()) {
                    //updates the qty of the already existing item with same size and same color
                    sameSize.qty += qty
                    return
                }
                //same size but diff color(diff item), push to cart
            }
            //if no occurences generate a unique id, then push to cart

            state.cart.push({ id: cartId, ...action.payload })
        },
        removeItem: (state, action) => {
            const { id } = action.payload

            state.cart = state.cart.filter((item) => {
                return item.id !== id
            })


        },
        clearCart: (state, action) => {
            state.cart = []
        },
        updateItemQuantity: (state, action) => {
            const { id, value } = action.payload
            const existingItem = state.cart.find((cartItem) => cartItem.id === id)
            if (existingItem) {
                existingItem.qty = value
            }
        },
        setCartActive: (state, action) => {
            state.isCartActive = action.payload
        }
    }
})

export const { addItem, setCartActive, removeItem, updateItemQuantity, clearCart } = shopSlice.actions

export default shopSlice.reducer