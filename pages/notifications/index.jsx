import React, { useState } from 'react'
import Image from "next/image"
import { useDispatch, useSelector } from 'react-redux'

import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { selectUser } from '../../features/user/userSlice'
import { useEffect } from 'react'
import {Link} from 'next/link'


export default function Settings() {

 

  const user = useSelector(selectUser);
  const router = useRouter()
  const dispatch = useDispatch()
  const searchParams = useSearchParams();
  const updateMessage = searchParams.get('update')
	const [formData, setFormData] = useState({
    email:user?.[0]?.email,
		brand_name: user?.[0]?.brand_name,
		brand_logo: user?.[0]?.brand_logo,
		brand_bio:user?.[0]?.brand_bio,
    brand_type:user?.[0]?.brand_type,
    mobile_number:user?.[0]?.mobile_number
	})

  useEffect(()=>{
    if (user == null){
        router.push('/brands/login')
    }
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
	<div>
	You have updated your brand profile successfully
	</div>
  </div>

	async function updateBrandUserProfile(){
		const res = await fetch(`https://altclan-brands-api-1-1.onrender.com/api/users/${user[0]?.id}/`, {
			method: "PUT",
			headers: {

				"Content-Type": "application/json",
			},
			body: JSON.stringify({email:formData?.email, brand_name:formData.brand_name, brand_bio:formData.brand_bio, brand_type:formData.brand_type}),
			
		})

		const data = await res.json()

		if (res.status >= 200 & res.status <= 209) {
			console.log("User Profile UPDATED")
     router.push(`/setting?update=success`);

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

<div class="mx-4 min-h-screen max-w-screen-xl sm:mx-8 p-2 xl:mx-auto">
  <h1 class="border-b  text-4xl ml-10 font-semibold">Settings</h1>
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
      </ul>
    </div>

    <div class="col-span-2 hidden sm:block">
      <ul>

        <li class="mt-5 cursor-pointer border-l-2  px-2 py-3 text-center font-semibold text-black transition hover:border-l-blue-700  hover:bg-black "> <a href="/">Accounts</a></li>
        <li class="mt-5 cursor-pointer border-l-2 border-transparent px-2 py-2 text-center font-semibold transition hover:bg-black hover:text-white"> <a href="/security">Security</a> </li>
        <li class="mt-5 cursor-pointer border-l-2 border-transparent px-2 py-2 text-center font-semibold transition hover:bg-black hover:text-white"><a href="/bank_account">Bank Account</a></li>
        <li class="mt-5 cursor-pointer border-l-2 border-transparent px-2 py-2 text-center font-semibold transition bg-black text-white hover:text-white">Notifications</li>

      </ul>
    </div>




    <div class="col-span-8 overflow-hidden rounded-xl sm:bg-gray-50 sm:px-8 sm:shadow">


<div class="mx-4 min-h-screen max-w-screen-xl sm:mx-8 xl:mx-auto">
  <h1 class="border-b py-6 text-4xl font-semibold">Settings</h1>
  <div class="grid grid-cols-8 pt-3 sm:grid-cols-10">
    <div class="relative my-4 w-56 sm:hidden">
      <input class="peer hidden" type="checkbox" name="select-1" id="select-1" />
      <label for="select-1" class="flex w-full cursor-pointer select-none rounded-lg border p-2 px-3 text-sm text-gray-700 ring-blue-700 peer-checked:ring">Notifications </label>
      <svg xmlns="http://www.w3.org/2000/svg" class="pointer-events-none absolute right-0 top-3 ml-auto mr-5 h-4 text-slate-700 transition peer-checked:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
      <ul class="max-h-0 select-none flex-col overflow-hidden rounded-b-lg shadow-md transition-all duration-300 peer-checked:max-h-56 peer-checked:py-3">
        <li class="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white">Notifications</li>
        <li class="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white">Team</li>
        <li class="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white">Others</li>
      </ul>
    </div>

   
    <div class="col-span-8 overflow-hidden rounded-xl bg-gray-50 px-8 shadow">
      <div class="border-b pt-4 pb-8">
        <h1 class="py-2 text-2xl font-semibold">Notification settings</h1>
        <p class="font- text-slate-600">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
      </div>
      <div class="grid border-b py-6 sm:grid-cols-2">
        <div class="">
          <h2 class="text-lg font-semibold leading-4 text-slate-700">Comments</h2>
          <p class="font- text-slate-600">Lorem ipsum dolor, Alias eligendi laboriosam magni reiciendis neque.</p>
        </div>
        <div class="mt-4 flex items-center sm:justify-end">
          <div class="flex flex-col gap-3">
            <label for="push" class="relative inline-flex cursor-pointer items-center">
              <input type="checkbox" value="" id="push" class="peer sr-only" checked />
              <div class="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
              <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Push</span>
            </label>
            <label for="email" class="relative inline-flex cursor-pointer items-center">
              <input type="checkbox" value="" id="email" class="peer sr-only" checked />
              <div class="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
              <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Email</span>
            </label>
            <label for="sms" class="relative inline-flex cursor-pointer items-center">
              <input type="checkbox" value="" id="sms" class="peer sr-only" />
              <div class="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
              <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">SMS</span>
            </label>
          </div>
        </div>
      </div>

      <div class="grid border-b py-6 sm:grid-cols-2">
        <div class="">
          <h2 class="text-lg font-semibold leading-4 text-slate-700">Reminders</h2>
          <p class="font- text-slate-600">Lorem ipsum dolor, Alias eligendi laboriosam magni reiciendis neque.</p>
        </div>
        <div class="mt-4 flex items-center sm:justify-end">
          <div class="flex flex-col gap-3">
            <label for="push" class="relative inline-flex cursor-pointer items-center">
              <input type="checkbox" value="" id="push" class="peer sr-only" />
              <div class="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
              <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Push</span>
            </label>
            <label for="email" class="relative inline-flex cursor-pointer items-center">
              <input type="checkbox" value="" id="email" class="peer sr-only" checked />
              <div class="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
              <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Email</span>
            </label>
            <label for="sms" class="relative inline-flex cursor-pointer items-center">
              <input type="checkbox" value="" id="sms" class="peer sr-only" />
              <div class="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
              <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">SMS</span>
            </label>
          </div>
        </div>
      </div>
      <div class="grid border-b py-6 sm:grid-cols-2">
        <div class="">
          <h2 class="text-lg font-semibold leading-4 text-slate-700">Updates</h2>
          <p class="font- text-slate-600">Lorem ipsum dolor, Alias eligendi laboriosam magni reiciendis neque.</p>
        </div> 
        <div class="mt-4 flex items-center sm:justify-end">
          <div class="flex flex-col gap-3">
            <label for="push" class="relative inline-flex cursor-pointer items-center">
              <input type="checkbox" value="" id="push" class="peer sr-only" />
              <div class="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
              <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Push</span>
            </label>
            <label for="email" class="relative inline-flex cursor-pointer items-center">
              <input type="checkbox" value="" id="email" class="peer sr-only" />
              <div class="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
              <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Email</span>
            </label>
            <label for="sms" class="relative inline-flex cursor-pointer items-center">
              <input type="checkbox" value="" id="sms" class="peer sr-only" />
              <div class="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
              <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">SMS</span>
            </label>
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
