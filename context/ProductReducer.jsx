export default (state, action) => {
    switch(action.type) {
      case 'DELETE_NEW_PRODUCTS':
        return {
          ...state,
          products: state.products.filter(product => transaction.product !== action.payload)
        }
      case 'ADD_NEW_PRODUCTS':
        return {
          ...state,
          products: [action.payload, ...state.products]
        }
      default:
        return state;
    }
  }