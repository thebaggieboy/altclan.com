import {createContext, useState, useReducer} from 'react'
import TokenReducer from './TokenReducer'
const initialState = {
    token:[ 
    
    ] 
}

// Create a context
export const TokenContext = createContext({initialState})

// Create a provider for the context
export function TokenContextProvider({children}){
    const [state, dispatch] = useReducer(TokenReducer, initialState);
    
    function addToken(id) {
		dispatch({
			type: "ADD_NEW_TOKEN",
			payload: id,
		});
	}
	
    
    return(
        <TokenContext.Provider value={{
            token:state.token,
       
        }}>
            {children}
        </TokenContext.Provider>
    )
}