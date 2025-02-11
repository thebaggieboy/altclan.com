import React, { useState } from 'react'
import Image from "next/image"
import { useDispatch, useSelector } from 'react-redux'

import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { selectUser } from '../../features/user/userSlice'

import Link from "next/link"

export default function Settings() {

  const user = useSelector(selectUser);
  const router = useRouter()
  const dispatch = useDispatch()
  const searchParams = useSearchParams();
  const updateMessage = searchParams.get('update')

  if (user == null || user == '') {
    router.push("/accounts/login");
  }

	const [formData, setFormData] = useState({
    email:user[0]?.email,
		first_name: user[0]?.first_name,
		last_name: user[0]?.last_name,	  
		mobile_number:user[0]?.mobile_number,
		display_picture:user[0]?.display_picture,

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
	const brandProfileSuccess =    <div class="flex items-center text-center p-4 mb-4 text-sm text-green-800 border border-0 bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800" role="alert">
	<svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
	  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
	</svg>
	<span class="sr-only">Info</span>
	<div className='font-bold text-center'>
	You have updated your user profile successfully
	</div>
  </div>

	async function updateUserProfile(){
		const res = await fetch(`https://altclan-api.onrender.com/api/users/${user[0]?.id}/`, {
			method: "PUT",
			headers: {

				"Content-Type": "application/json",
			},
			body: JSON.stringify({email:formData?.email, first_name:formData?.first_name, last_name:formData?.last_name, mobile_number:formData.mobile_number, display_picture:formData.display_picture}),
			
		})

		const data = await res.json()

		if (res.status >= 200 & res.status <= 209) {
		 console.log("User Profile UPDATED")
     router.push(`/profile/${user[0]?.id}?update=success`);

		}
		const error = { ...data }
		throw error

	
	}


  async function onSubmit(){
     console.log("Submit Clicked")
  }
	console.log("formData: ", formData)
  return (
    <> 
      {updateMessage == 'success' ? brandProfileSuccess : ""}

<div class="mx-4 min-h-screen max-w-screen-xl sm:mx-8 p-2 xl:mx-auto" style={{fontFamily:"Poppins, Sans-serif", lineHeight:'100%', letterSpacing:1}}>
<div className="ml-5 mt-2">
  
   </div>
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
        <li class="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white">Security</li>
		<li class="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white">Payment Method</li>
		<li class="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white">Addresses</li>
      </ul>
    </div>

    <div class="col-span-2 hidden sm:block">
      <ul>

        <Link href={`/profile/${user[0]?.id}`}><li class="mt-2 text-xs cursor-pointer border-l-2 bg-black px-2 py-3 text-center font-semibold text-white border-l-yellow-300 transition hover:border-l-yellow-200  hover:bg-black hover:text-white"  style={{color:"beige", fontWeight:'bold'}}>Accounts</li></Link>
        <Link href="/orders"><li class="mt-2 text-xs cursor-pointer border-l-2 border-transparent px-2 py-3 text-center font-semibold transition hover:bg-black hover:text-white">Orders</li></Link>
   <Link href="/security">     <li class="mt-2 text-xs cursor-pointer border-l-2 border-transparent px-2 py-3 text-center font-semibold transition hover:bg-black hover:text-white">Security</li></Link>
   <Link href="/profile/billing">     <li class="mt-2 text-xs cursor-pointer border-l-2 border-transparent px-2 py-3 text-center font-semibold transition hover:bg-black hover:text-white">Billing</li></Link>
        <Link href='/payment-method'><li class="mt-2 text-xs cursor-pointer border-l-2 border-transparent px-2 py-3 text-center font-semibold transition hover:bg-black hover:text-white">Payment Methods</li></Link>
		<Link href='/profile/address'><li class="mt-2 text-xs cursor-pointer border-l-2 border-transparent px-2 py-3 text-center font-semibold transition hover:bg-black hover:text-white">Addresses</li></Link>
	

      </ul>
    </div>




    <div class="col-span-8 overflow-hidden rounded-xl sm:bg-gray-50 sm:px-8 sm:shadow">
    
    <div className="mx-auto max-w-270">
    
        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  User Information
                </h3>
              </div>
              <div className="p-7">
             
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="first_name"
                      >
                        First Name
                      </label>
                      <div className="relative">
                        <span className="absolute left-4.5 top-4">
                       
                        </span>
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3  px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          name="first_name"
                          id="first_name"
                          placeholder=""
                          value={formData?.first_name}
                          onChange={inputChangeHandler}
                        />
                      </div>
                    </div>

                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="last_name"
                      >
                       Last Name
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="last_name"
                        id="last_name"
                        placeholder=""
                        value={formData?.last_name}
                        onChange={inputChangeHandler}
                      />
                    </div>
                  </div>

                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="emailAddress"
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <span className="absolute left-4.5 top-4">
                        <svg
                          className="fill-current"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.8">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M3.33301 4.16667C2.87658 4.16667 2.49967 4.54357 2.49967 5V15C2.49967 15.4564 2.87658 15.8333 3.33301 15.8333H16.6663C17.1228 15.8333 17.4997 15.4564 17.4997 15V5C17.4997 4.54357 17.1228 4.16667 16.6663 4.16667H3.33301ZM0.833008 5C0.833008 3.6231 1.9561 2.5 3.33301 2.5H16.6663C18.0432 2.5 19.1663 3.6231 19.1663 5V15C19.1663 16.3769 18.0432 17.5 16.6663 17.5H3.33301C1.9561 17.5 0.833008 16.3769 0.833008 15V5Z"
                              fill=""
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M0.983719 4.52215C1.24765 4.1451 1.76726 4.05341 2.1443 4.31734L9.99975 9.81615L17.8552 4.31734C18.2322 4.05341 18.7518 4.1451 19.0158 4.52215C19.2797 4.89919 19.188 5.4188 18.811 5.68272L10.4776 11.5161C10.1907 11.7169 9.80879 11.7169 9.52186 11.5161L1.18853 5.68272C0.811486 5.4188 0.719791 4.89919 0.983719 4.52215Z"
                              fill=""
                            />
                          </g>
                        </svg>
                      </span>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="email"
                        name="emailAddress"
                        id="emailAddress"
                        onChange={inputChangeHandler}
                        disabled
                        defaultValue={user?.[0]?.email}
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
                    style={{backgroundColor: "beige", color:"black"}}
                      className="flex justify-center rounded py-2 px-6 font-medium "
                     
                      onClick={updateUserProfile}
                    >
                      Save
                    </button>
                  </div>
            
              </div>
            </div>
          </div>
          <div className="col-span-5 xl:col-span-2">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Your Photo
                </h3>
              </div>
              <div className="p-7">
              
                  <div className="mb-4 flex items-center gap-3">
                    <div className="h-14 w-14 rounded-full">
                      <Image
                        src={formData?.display_picture == null ? `/assets/abstract-user-flat-4.png` : formData?.display_picture}
                        width={55}
                        height={55}
                        alt="User"
                      />
                    </div>
                    <div>
                      <span className="mb-1.5 text-black dark:text-white">
                        Edit your photo
                      </span>
                      <span className="flex gap-2.5">
                        <button className="text-sm hover:text-primary">
                          Delete
                        </button>
                        <button className="text-sm hover:text-primary">
                          Update
                        </button>
                      </span>
                    </div>
                  </div>

                  <div
                    id="FileUpload"
                    className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border-2 border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5"
                  >
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                    />
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z"
                            fill="#3C50E0"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z"
                            fill="#3C50E0"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z"
                            fill="#3C50E0"
                          />
                        </svg>
                      </span>
                      <p>
                        <span className="text-primary">Click to upload</span> or
                        drag and drop
                      </p>
                      <p className="mt-1.5">SVG, PNG, JPG or GIF</p>
                      <p>(max, 800 X 800px)</p>
                    </div>
                  </div>

                  <div className="flex justify-end gap-4.5">
                    <button
                      className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                     
                    >
                      Cancel
                    </button>
                    <button
                      className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-95"
                      
                      onClick={updateUserProfile}
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
