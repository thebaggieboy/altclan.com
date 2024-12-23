export default (state, action) => {
    switch(action.type) {
 
      case 'ADD_NEW_TOKEN':
        return {
          ...state,
          token: [action.payload, ...state.token]
        }
      default:
        return state; 
    }
  }