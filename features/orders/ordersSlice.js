import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
    name: "order",
    initialState: {
        order: null
    },
    reducers: {
        setOrder: (state, action) => {
            state.order = action.payload
        },
        addOrder: (state, action) => {
            state.order.push(action.payload)
        }
        
    }
})

//action creators
export const { setOrder, addOrder } = orderSlice.actions


//selectors
export const selectOrder = mainState => mainState.order.order

export default orderSlice.reducer