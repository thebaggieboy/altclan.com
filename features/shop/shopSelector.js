export const selectCartItems = (state) => state.shop.cart

export const selectCartItem = (id) => {
    return (state) => state.shop.cart.find((item) => item.id === id)
}

export const selectCartCount = (state) => state.shop.cart.reduce((acc, item) => {
    return acc += item.qty
}, 0)

export const selectCartTotal = state => state.shop.cart.reduce((acc, item) => {
    return acc += (item.price * item.qty)
}, 0)

export const selectCartActive = state => state.shop.isCartActive