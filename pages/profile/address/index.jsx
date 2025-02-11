import React, { useState } from 'react'
import Image from "next/image"
import { useDispatch, useSelector } from 'react-redux'

import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { selectUser } from '../../../features/user/userSlice'

import Link from "next/link"

export default function Address() {

  const user = useSelector(selectUser);
  const router = useRouter()
  const dispatch = useDispatch()
  const searchParams = useSearchParams();
  const updateMessage = searchParams.get('update')

  if (user == null || user == '') {
    router.push("/accounts/login");
  }

	const [formData, setFormData] = useState({
        email:user[0].email,
		billing_address: user[0]?.billing_address,
		state: user[0]?.state,	  
		city:user[0]?.city,
		state:user?.[0]?.state,
    zip:user?.[0]?.zip,

	})


	const inputChangeHandler = (e) => {
		const { name, value } = e.target
		setFormData((prevValue) => {
			return {
				...prevValue,
				[name]: value
			}
		})

	}
	const brandProfileAddressSuccess =    <div class="flex items-center text-center p-4 mb-4 text-sm text-green-800 border border-0 bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800" role="alert">
	<svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
	  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
	</svg>
	<span class="sr-only">Info</span>
	<div className='font-bold text-center'>
	You have updated your Billing Address successfully
	</div>
  </div>

	async function updateUserAddress(){
		const res = await fetch(`https://altclan-api.onrender.com/api/users/${user[0]?.id}/`, {
			method: "PUT",
			headers: {

				"Content-Type": "application/json",
			},
			body: JSON.stringify({email:formData?.email, billing_address:formData.billing_address, state:formData.state, city:formData.city, zip:formData.zip}),
			
		})

		const data = await res.json()

		if (res.status >= 200 & res.status <= 209) {
			console.log("User Address UPDATED")
            router.push(`/profile/address?update=success`);

		}
		const error = { ...data }
		throw error

	
	}


  async function onSubmit(){
     console.log("Submit Clicked")
     updateUserAddress()
  }
	console.log("formData: ", formData)
  return (
    <> 
      {updateMessage == 'success' ? brandProfileAddressSuccess : ""}

<div class="mx-4 min-h-screen max-w-screen-xl sm:mx-8 p-2 xl:mx-auto">
  <h1 class="border-b  text-4xl ml-10 font-semibold">Profile</h1>
  <div class="grid grid-cols-8 pt-1 sm:grid-cols-10  m-5">
    
    <div class="relative my-4 w-56 sm:hidden">
      <input class="peer hidden" type="checkbox" name="select-1" id="select-1" />
      <label for="select-1" class="flex w-full cursor-pointer select-none rounded-lg border p-2 px-3 text-sm text-gray-700 ring-blue-700 peer-checked:ring">Accounts </label>
      <svg xmlns="http://www.w3.org/2000/svg" class="pointer-events-none absolute right-0 top-3 ml-auto mr-5 h-4 text-slate-700 transition peer-checked:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
      </svg>

    
      <ul class="max-h-0 select-none flex-col overflow-hidden rounded-b-lg shadow-md transition-all duration-300 peer-checked:max-h-56 peer-checked:py-3">
        <li class="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white">Accounts</li>
        <li class="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white">Orders</li>
        <li class="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white">Wishlist</li>
		<li class="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white">Payment Method</li>
		<li class="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white">Addresses</li>
      </ul>
    </div>

    <div class="col-span-2 hidden sm:block">
      <ul>

        <Link href={`/profile/${user[0]?.id}`}><li class="mt-2 text-xs cursor-pointer border-l-2 px-2 py-3 text-center font-semibold text-black transition hover:border-l-blue-700  hover:bg-black hover:text-white">Accounts</li></Link>
        <Link href="/orders"><li class="mt-2 text-xs cursor-pointer border-l-2 border-transparent px-2 py-3 text-center font-semibold transition hover:bg-black hover:text-white">Orders</li></Link>
   <Link href="/wishlist">     <li class="mt-2 text-xs cursor-pointer border-l-2 border-transparent px-2 py-3 text-center font-semibold transition hover:bg-black hover:text-white">Wishlist</li></Link>
        <Link href='/payment-method'><li class="mt-2 text-xs cursor-pointer border-l-2 border-transparent px-2 py-3 text-center font-semibold transition hover:bg-black hover:text-white">Payment Methods</li></Link>
		<Link href='/addresses'><li class="mt-2 text-xs cursor-pointer border-l-2 bg-black text-white border-transparent px-2 py-3 text-center font-semibold transition hover:bg-black hover:text-white">Addresses</li></Link>
	

      </ul>
    </div>




    <div class="col-span-8 overflow-hidden rounded-xl sm:bg-gray-50 sm:px-8 sm:shadow">
    
    <div className="mx-auto max-w-270">
    
        <div className="grid grid-cols-6 gap-8">
          <div className="col-span-6 xl:col-span-6">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Address Information
                </h3>
              </div>
              <div className="p-7">
              <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="billing_address"
                    >
                      Billing Address
                    </label>
                    <div className="relative">
                     
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="billing_address"
                        id="billing_address"
                        onChange={inputChangeHandler}
                        
                        defaultValue={user[0]?.billing_address}
                      />
                    </div>
                  </div>

                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="state"
                      >
                        State
                      </label>
                      <div className="relative">
                        <span className="absolute left-4.5 top-4">
                       
                        </span>
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          name="state"
                          id="state"
                          placeholder=""
                          value={formData?.state}
                          onChange={inputChangeHandler}
                        />
                      </div>
                    </div>

                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="city"
                      >
                        City
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="city"
                        id="city"
                        placeholder=""
                        value={formData?.city}
                        onChange={inputChangeHandler}
                      />
                    </div>

                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="phonzipeNumber"
                      >
                        Zip
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="zip"
                        id="zip"
                        placeholder="------"
                        value={user[0]?.zip}
                        onChange={inputChangeHandler}
                      />
                    </div>
                  </div>

                 
               

                

                  <div className="flex justify-end gap-4.5">
                    <button
                      className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                   
                    >
                      Cancel
                    </button>
                    <button
                    style={{backgroundColor: "black", color:"white"}}
                      className="flex justify-center rounded py-2 px-6 font-medium "
                     
                      onClick={updateUserAddress}
                    >
                      Save
                    </button>
                  </div>
            
              </div>
            </div>
          </div>
        
        </div>
      </div>
    
    </div>
  </div>
</div>

    </>
  )
}
