export const selectCartFavoriteItems = (state) => state.favorite.favorite

export const selectCartFavoriteItem = (id) => {
    return (state) => state.favorite.favorite.find((item) => item.id === id)
}

export const selectCartFavoriteCount = (state) => state.favorite.favorite.reduce((acc, item) => {
    return acc += item.qty
}, 0)

export const selectCartFavoriteTotal = state => state.favorite.favorite.reduce((acc, item) => {
    return acc += (item.price * item.qty)
}, 0)

export const selectCartFavoriteActive = state => state.favorite.isFavoritetActive