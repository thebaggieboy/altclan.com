import {createContext, useState, useReducer} from 'react'

const initialState = {
    users:[
     
    ]
}

// Create a context
export const UserContext = createContext({initialState})

// Create a provider for the context
export function UserContextProvider({children}){
 
    // Actions
    function deleteUsers(id) {
      dispatch({
        type: 'DELETE_NEW_USER',
        payload: id
      });
    }
  
    function newUser(users) {
      dispatch({
        type: 'ADD_NEW_USER',
        payload: users
      });
    }

    
    return(
        <UserContext.Provider value={{
            users:state.users,
            newUser,
            deleteUsers
        }}>
            {children}
        </UserContext.Provider>
    )
}