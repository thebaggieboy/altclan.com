import React from 'react'
import Link from 'next/link'
import BrandSignupTab from "./BrandSignupTab"
export default function BrandContactForm() {
  return (
    <div className="w-100 ">
<section className="p-5">

<form className="">
  <div className="mb-6">
    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mobile Number</label>
    <input type="text" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
  </div>
  <div className="mb-6">
    <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Billing Address</label>
    <input type="text" id="city" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@brand.com" required />
  </div>

  <div className="mb-6">
    <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">City</label>
    <input type="text" id="city" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@brand.com" required />
  </div>
  <div className="mb-6">
    <label htmlFor="state" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">State</label>
    <input type="text" id="state" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@brand.com" required />
  </div>
  <div className="mb-6">
    <label htmlFor="zip" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Zip</label>
    <input type="text" id="zip" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@brand.com" required />
  </div>


 
  <button
            type="submit" 
                className="mt-10 flex w-full items-center justify-center rounded-md border border-black bg-black py-3 px-8 text-base font-medium text-dark  focus:ring-black focus:ring-offset-2"
              >
                Complete Signup
              </button>
</form>
  
</section>

    </div>
  ) 
}
   