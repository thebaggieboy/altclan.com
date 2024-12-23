import React from 'react'
import Link from 'next/link'
import BrandSignupTab from './BrandSignupTab'

const brand_type = [
  {
    type:"Clothing & apparel",
  },
  {
    type:"Accessories",
  },
  {
    type:"Arts",
  },
  {
    type:"Footwears",
  },
]
export default function BrandSignUpForm() {
  return (
    
 <>

     <div className="w-100">
      
      <section className="p-5">
      
      <form className="">
        <div className="mb-6">

          <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Brand Username</label>
          <input type="text" id="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
        </div>
        <div className="mb-6">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name of Brand</label>
          <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@brand.com" required />
        </div>
        <div className="mb-6">
        
        
      <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Brand Bio</label>
      <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
      
        </div>
   
<label for="brand" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select your brand type</label>
<select id="brand" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
  <option>Clothing & Apparel</option>
  <option>Accessories</option>
  <option>Footwears & Slides</option>
  <option>Enigmas</option>
  <option>Wristwatches & Handbands</option>
  <option>Art</option>
  <option>Skates & Boards</option>
  <option>Caps</option>
  <option>Masks</option>
</select>

      
      
       
        <button
                  type="submit" 
                      className="mt-10 flex w-full items-center justify-center rounded-md border border-black bg-black py-3 px-8 text-base font-medium text-dark  focus:ring-black focus:ring-offset-2"
                    >
                      Continue
                    </button>
      </form>
          
      </section>
      
          </div>
 </>
  )
}
