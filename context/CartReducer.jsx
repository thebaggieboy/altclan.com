export default (state, action) => {
    switch(action.type) {
      case 'REMOVE_ITEM_FROM_CART':
        return {
          ...state,
          cart: state.cart.filter(cart => transaction.cart !== action.payload)
        }
       
      case 'ADD_ITEM_TO_CART':

        
        return {
          ...state,
          cart: [action.payload, ...state.cart]
        }
      default:
        return state;
    }
  }