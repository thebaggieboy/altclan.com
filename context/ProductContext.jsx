import {createContext, useState} from 'react'
import ProductReducer from "./ProductReducer"
const initialState = {
    products:[

    ]
}

export const ProductContext = createContext({initialState})

export function ProductsContextProvider({children}){
    //const [state, dispatch] = useReducer(ProductReducer, initialState);
    const [selectedProducts, setSelectedProducts] = useState([]);

    return(
        <ProductContext.Provider value={{selectedProducts, setSelectedProducts}}>
            {children}
        </ProductContext.Provider>
    )
}