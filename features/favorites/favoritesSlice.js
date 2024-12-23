import generateUniqueId from "../../utils/uuid";

const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    favorite: [

    ],
    isFavoriteActive: false
}

const favoriteSlice = createSlice({
    name: 'favorite',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const { itemId, qty, size, color } = action.payload
            const favoriteId = generateUniqueId(itemId, color, size)
            //gets all occurences of that item in the favorite
            const occurences = state.favorite.filter((favoriteItem) => favoriteItem.itemId === itemId)
            if (occurences.length !== 0) {
                //finds the occurence with the same size as the incoming item
                const sameSize = occurences.find((oc) => oc.size === size)
                if (sameSize && sameSize.color.toLowerCase() === color.toLowerCase()) {
                    //updates the qty of the already existing item with same size and same color
                    sameSize.qty += qty
                    return
                }
                //same size but diff color(diff item), push to favorite
            }
            //if no occurences generate a unique id, then push to favorite

            state.favorite.push({ id: favoriteId, ...action.payload })
        },
        removeItem: (state, action) => {
            const { id } = action.payload

            state.favorite = state.favorite.filter((item) => {
                return item.id !== id
            })


        },
        clearFavorite: (state, action) => {
            state.favorite = []
        },
        updateItemQuantity: (state, action) => {
            const { id, value } = action.payload
            const existingItem = state.favorite.find((favoriteItem) => favoriteItem.id === id)
            if (existingItem) {
                existingItem.qty = value
            }
        },
        setFavoriteActive: (state, action) => {
            state.isFavoriteActive = action.payload
        }
    }
})

export const { addItem, setFavoriteActive, removeItem, updateItemQuantity, clearCart } = favoriteSlice.actions

export default favoriteSlice.reducer