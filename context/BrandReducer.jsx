export default (state, action) => {
    switch(action.type) {
      case 'DELETE_BRAND':
        return {
          ...state,
          brands: state.brands.filter(brand => transaction.brand !== action.payload)
        }
      case 'ADD_BRAND':
        return {
          ...state,
          brands: [action.payload, ...state.brands]
        }
      default:
        return state;
    }
  }