export const selectWishListItems = (state) => state.shop.cart

export const selectWishListItem = (id) => {
    return (state) => state.shop.cart.find((item) => item.id === id)
}

export const selectWishListCount = (state) => state.wishlist.wishlist.reduce((acc, item) => {
    return acc += item.qty
}, 0)

export const selectWishListTotal = state => state.wishlist.wishlist.reduce((acc, item) => {
    return acc += (item.price * item.qty)
}, 0)

export const selectWishListActive = state => state.shop.isWishListActive