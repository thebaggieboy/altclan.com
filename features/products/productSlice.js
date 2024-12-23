import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: "product",
    initialState: {
        product: null
    },
    reducers: {
        setProduct: (state, action) => {
            state.product = action.payload
        },
        addProduct: (state, action) => {
            state.product.push(action.payload)
        }
    }
})

//action creators
export const { setProduct, addProduct } = productSlice.actions


//selectors
export const selectProduct = mainState => mainState.product.product

export default productSlice.reducer