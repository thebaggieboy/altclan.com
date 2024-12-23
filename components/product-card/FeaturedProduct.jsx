import React, { useState } from 'react'

export default function FeaturedProduct({data}) {
  const [liked, setLiked] = useState(false);
	
  const { merchandise_name, price, display_image, id } = data;


  return (
    <>
    <div class="max-w-xs overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
    <div class="px-4 py-2">
        <h1 class="text-xl font-bold text-gray-800 uppercase dark:text-white">{merchandise_name}</h1>
    
    </div>

    <img class="object-cover w-full h-64 mt-2" src={display_image} alt="NIKE AIR"/>

    <div class="flex items-center justify-between px-4 py-2 bg-black">
        <p class="text-sm font-bold text-white">${price}</p>
        <button class="text-lg font-semibold text-black uppercase transition-colors duration-300 transform bg-white rounded hover:bg-gray-200 focus:bg-gray-400 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="file: h-6 w-6 p-2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
  </svg>
        </button>
    </div>
</div>
    </>
  )
}
