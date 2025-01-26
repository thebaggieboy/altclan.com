import React, { useState } from 'react'
import Image from "next/image"
import { useDispatch, useSelector } from 'react-redux'

import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { selectUser } from '../../features/user/userSlice'
import { useEffect } from 'react'
import {Link} from 'next/link'
import { split } from 'postcss/lib/list'


export default function Settings() {

 
  const secretKey = 'sk_test_e163ed7b7618f59d3947b8ff3170437a4439e644'
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
    // if (user == null){
    //     router.push('/brands/login')
    // }
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
const splitPayment = (()=>{
  console.log("Splitting Payments")
  const https = require('https')


const params = JSON.stringify({
  "email": "thebaggieboy@protonmail.com",
  "amount": 200000,
  "subaccount": "ACCT_453xt8in0algnev",
  "bearer": "subaccount"
})

const options = {
  hostname: 'api.paystack.co',
  port: 443,
  path: '/transaction/initialize',
  method: 'POST',
  headers: {
    Authorization: 'Bearer ' + secretKey,
    'Content-Type': 'application/json'
  }
}

const req = https.request(options, res => {
  let data = ''

  res.on('data', (chunk) => {
    data += chunk
  });

  res.on('end', () => {
    console.log(JSON.parse(data))
  })
}).on('error', error => {
  console.error(error)
})

req.write(params)
req.end()
})
const generateVAN = (()=>{
  console.log("Creating new Sub Account")

  const https = require('https')

  const params = JSON.stringify({
    "business_name": "Oasis",
    "bank_code": "058",
    "account_number": "0501548215",
    "percentage_charge": 10
  })
  
  const options = {
    hostname: 'api.paystack.co',
    port: 443,
    path: '/subaccount',
    method: 'POST',
    headers: {
      Authorization: `Bearer ${secretKey}`,
      'Content-Type': 'application/json'
    }
  }
  
  const req = https.request(options, res => {
    let data = ''
  
    res.on('data', (chunk) => {
      data += chunk
    });
  
    res.on('end', () => {
      console.log(JSON.parse(data))
    })
  }).on('error', error => {
    console.error(error)
  })
  
  req.write(params)
  req.end()
  splitPayment()

})  




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
        <li class="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white">Bank Information</li>
        <li class="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white">Team</li>
        <li class="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white">Others</li>
      </ul>
    </div>

    <div class="col-span-2 hidden sm:block">
      <ul>

        <li class="mt-5 cursor-pointer border-l-2 px-2 py-3 text-center font-semibold text-black transition hover:border-l-blue-700  hover:bg-black hover:text-white"> <a href="/">Accounts</a></li>
        <li class="mt-5 cursor-pointer border-l-2 border-transparent px-2 py-2 text-center font-semibold transition hover:bg-black hover:text-white"> <a href="/security">Security</a> </li>
        <li class="mt-5 cursor-pointer  bg-black border-l-2 border-transparent px-2 py-2 text-center text-white font-semibold transition hover:bg-black hover:text-white"><a href="/bank_account">Bank Account</a></li>
        <li class="mt-5 cursor-pointer border-l-2 border-transparent px-2 py-2 text-center font-semibold transition hover:bg-black hover:text-white">Notifications</li>

      </ul>
    </div>




    <div class="col-span-8 overflow-hidden rounded-xl sm:bg-gray-50 sm:px-8 sm:shadow">
    
    <div className="mx-auto max-w-270">
    
        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Bank Information
                </h3>
              </div>
              <div className="p-7">
              <p className=' text-xs '>You can generate a Virtual Account Number that would be used to receive payment from customers for sales of your products. 
              We use paystack payment gateway api for using in generating, displaying and security of account information.</p>
              <br />
              <button
                    style={{backgroundColor: "beige", color:"black"}}
                      className="flex justify-center rounded  py-2  px-6 text-xs "
                     
                      onClick={generateVAN}
                    >
                
                     <p className='bolder'> Tap to generate</p>
                    </button>
                  <br />

                  <div className="mb-5.5 ">
                    <label
                      className="mb-3 block text-xs font-medium text-black dark:text-white"
                      htmlFor="emailAddress"
                    >
                      Bank Name
                    </label>
                    <div className="relative">
                      <span className="absolute left-4.5 top-4">
                       
                      </span>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-1 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="bank_name"
                        id="bank_name"
                        onChange={inputChangeHandler}
                        disabled
                        
                      />
                    </div>
                  </div>
                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-xs font-medium text-black dark:text-white"
                      htmlFor="emailAddress"
                    >
                      Account Name
                    </label>
                    <div className="relative">
                      <span className="absolute left-4.5 top-4">
                     
                      </span>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-1 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="account_name"
                        id="account_name"
                        onChange={inputChangeHandler}
                        disabled
                       
                      />
                    </div>
                  </div>
                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-xs font-medium text-black dark:text-white"
                      htmlFor="emailAddress"
                    >
                      Account Number
                    </label>
                    <div className="relative">
                      <span className="absolute left-4.5 top-4">
                       
                      </span>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-1 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="account_number"
                        id="account_number"
                        onChange={inputChangeHandler}
                        disabled
                        
                      />
                    </div>
                  </div>
            {/* {      <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="Username"
                    >
                      Brand Type
                    </label>
                    <select  onChange={inputChangeHandler} name="brand_type" id=""  className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary">
                      
                      <option value="">{formData?.brand_type}</option>
                    </select>
                  </div>} */}

                

                  <div className="flex justify-end gap-4.5">
                 
                  
                  </div>
            
              </div>
            </div>
          </div>
          <div className="col-span-5 xl:col-span-2">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Connected Accounts
                </h3>
              </div>
              <div className="p-7">
              

                  

                  <div className="flex justify-end gap-4.5">
                   
                    <button
                      className="flex justify-center rounded bg-black py-2 px-6 font-medium text-white hover:bg-opacity-95"
                      
                      onClick={generateVAN}
                    >
                      Add
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
