import {createContext, useState} from 'react'

export const ProductContext = createContext({})

export function ProductsContextProvider({children}){
    const [selectedProducts, setSelectedProducts] = useState()
    return(
        <ProductContext.Provider value={{selectedProducts, setSelectedProducts}}>{children}</ProductContext.Provider>
    )
}