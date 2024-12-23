export default (state, action) => {
    switch(action.type) {
      case 'DELETE_NEW_USER':
        return {
          ...state,
          users: state.users.filter(user => transaction.user !== action.payload)
        }
      case 'ADD_NEW_USERS':
        return {
          ...state,
          users: [action.payload, ...state.users]
        }
      default:
        return state; 
    }
  }