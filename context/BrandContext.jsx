import {createContext, useState, useReducer} from 'react'
import BrandReducer from './BrandReducer'

const initialState = {
    brands:[
        {
            id: 1,
            name: 'Earthen Bottle',
            href: '/brands/brandProfile',
            followers: '48k',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
            imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
          },
          {
            id: 2,
            name: 'Nomad Tumbler',
            href: '#',
            followers: '35k',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
            imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
          },
          {
            id: 3,
            name: 'Focus Paper Refill',
            href: '#',
            followers: '89.4k',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
            imageAlt: 'Person using a pen to cross a task off a brandivity paper card.',
          },
          {
            id: 4,
            name: 'Machined Mechanical Pencil',
            href: '#',
            followers: '1m',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
            imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
          },
          {
            id: 5,
            name: 'Machined Mechanical Pencil',
            href: '#',
            followers: '1m',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
            imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
          },
    ]
}

// Create a context
export const BrandContext = createContext({initialState})

// Create a provider for the context
export function BrandContextProvider({children}){
    const [state, dispatch] = useReducer(BrandReducer, initialState);

    // Actions
    function deleteBrands(id) {
      dispatch({
        type: 'DELETE_BRANDS',
        payload: id
      });
    }
  
    function addBrands(brands) {
      dispatch({
        type: 'ADD_BRANDS',
        payload: brands
      });
    }

    
    return(
        <BrandContext.Provider value={{
            brands:state.brands,
            addBrands,
            deleteBrands
        }}>
            {children}
        </BrandContext.Provider>
    )
}