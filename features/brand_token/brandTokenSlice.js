import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    brand_token: null
}
const brandTokenSlice = createSlice({
    name: "brand_token",
    initialState,
    reducers: {
        addBrandToken: (state, action) => {
            state.brand_token.push(action.payload)
        },
        setBrandToken: (state, action) => {
            state.brand_token = action.payload
        }
    }
})

export const {setBrandToken} = brandTokenSlice.actions

export const selectBrandToken = mainState => mainState.brand_token.brand_token

export default brandTokenSlice.reducer