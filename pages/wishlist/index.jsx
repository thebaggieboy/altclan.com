import React, { useState } from 'react'
import Image from "next/image"
import { useDispatch, useSelector } from 'react-redux'

import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { selectUser } from '../../features/user/userSlice'
import styles from "../../styles/profile.module.css";
import Link from "next/link"


export default function Orders() {

  const user = useSelector(selectUser);
  const router = useRouter()
  const dispatch = useDispatch()
  const searchParams = useSearchParams();
  const updateMessage = searchParams.get('update')
  const [orders, setOrders] = useState([])
  const [orderError, setOrderError] = useState('No current Order')
  
let orderResults = []

  const getOrder = async()=>{
      console.log("Getting orders from api")
      const orderUrl = await fetch("https://altclan-api-v1.onrender.com/api/orders/")
      const data = await orderUrl.json()
      const orderResult = data?.filter((product) => product.user_email == user?.email );
      
      setOrders(orderResult)
      console.log("Order State: ", orderResult)
  }	  
  getOrder()
  
	const [formData, setFormData] = useState({
  

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

	async function updateWishList(){
		const res = await fetch(`https://altclan-api-v1.onrender.com/api/users/${user[0]?.id}/`, {
			method: "PUT",
			headers: {

				"Content-Type": "application/json",
			},
			body: JSON.stringify({email:formData?.email, first_name:formData.first_name, last_name:formData.last_name, mobile_number:formData.mobile_number, display_picture:formData.display_picture}),
			
		})

		const data = await res.json()

		if (res.status >= 200 & res.status <= 209) {
			console.log("User Profile UPDATED")
    // router.push(`/profile/${user[0]?.id}?update=success`);

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

      <Link href={`/profile/${user[0]?.id}`}><li class="mt-2 text-xs cursor-pointer border-l-2  px-2 py-3 text-center font-semibold  transition hover:border-l-blue-700  hover:bg-black hover:text-white">Accounts</li></Link>
        <Link href="/orders"><li class="mt-2 text-xs cursor-pointer border-l-2 border-transparent px-2 py-3 text-center font-semibold transition hover:bg-black hover:text-white">Orders</li></Link>
   <Link href="/wishlist">     <li class="mt-2 text-xs cursor-pointer border-l-2 border-transparent px-2 py-3 text-center bg-black text-white font-semibold transition hover:bg-black hover:text-white">Wishlist</li></Link>
        <Link href='/payment-method'><li class="mt-2 text-xs cursor-pointer border-l-2 border-transparent px-2 py-3 text-center font-semibold transition hover:bg-black hover:text-white">Payment Methods</li></Link>
		<Link href='/profile/address'><li class="mt-2 text-xs cursor-pointer border-l-2 border-transparent px-2 py-3 text-center font-semibold transition hover:bg-black hover:text-white">Addresses</li></Link>
	
      </ul>
    </div>




    <div class="col-span-8 rounded-xl sm:bg-gray-50 sm:px-8 sm:shadow">
    
    
    <div className={styles.galleryContent}>
						<div className="inventory">
							<div className="grid grid-cols-2 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-10">



								<div >
									<img
										src="https://images.unsplash.com/photo-1622560480654-d96214fdc887?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1288&q=80"
										alt=""
                    style={{width:200}}
									/>
									<p>Product Name: Wiser</p>

									<p>Color(s): Red</p>

									<p>Stock: 5</p>
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
