import React, { useState, useEffect } from 'react'
import Image from "next/image"
import { useDispatch, useSelector } from 'react-redux'

import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import Tabs from "./Tabs/Tab"
import { selectUser } from '../../features/user/userSlice'

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
      try {
          const orderUrl = await fetch(`https://altclan-api.onrender.com/api/users/${user?.[0]?.id}/`)
          const data = await orderUrl?.json()
          console.log("User Orders: ", data)
          const orderResult = data
          setOrders(orderResult)
          console.log("Your order: ", orderResult)
      } catch (error) {
          console.error("Error fetching orders:", error)
      }
  }

  useEffect(() => {
      if (user !== null) {
          getOrder()
      }
  }, [user])
  
  const [formData, setFormData] = useState({
    email: user ? user?.[0]?.email : '',
    first_name: user ? user?.[0]?.first_name : '',
    last_name: user ? user?.[0]?.last_name : '',  
    mobile_number: user ? user?.[0]?.mobile_number : '',
    display_picture: user ? user?.[0]?.display_picture : '',
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
  const brandProfileSuccess = (
      <div className="flex items-center text-center p-4 mb-4 text-sm text-green-800 border border-0 bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800" role="alert">
          <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span className="sr-only">Info</span>
          <div className='font-bold text-center'>
              You have updated your user profile successfully
          </div>
      </div>
  )


  console.log("formData: ", formData)

  return (
      <> 
          {updateMessage == 'success' ? brandProfileSuccess : ""}

<div class="mx-4 min-h-screen max-w-screen-xl sm:mx-8 p-5 xl:mx-auto" style={{fontFamily:"Poppins, Sans-serif", lineHeight:'100%', letterSpacing:1}}>
  <h1 class="border-b  text-4xl ml-10 font-semibold">Profile</h1>
  <div class="grid grid-cols-8 pt-1 sm:grid-cols-10 ">
    
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

      <Link href={`/profile/${user?.[0]?.id}`}><li class="mt-2 text-xs cursor-pointer border-l-2  px-2 py-3 text-center font-semibold  transition hover:border-l-yellow-300  hover:bg-black hover:text-white ">Accounts</li></Link>
        <Link href="/orders"><li class="mt-2 text-xs cursor-pointer border-l-2 border-transparent bg-black text-white px-2 py-3 text-center font-semibold transition hover:bg-black border-l-yellow-300 transition hover:border-l-yellow-300 hover:text-white"  style={{color:"beige"}}>Orders</li></Link>
   <Link href="/wishlist">     <li class="mt-2 text-xs cursor-pointer border-l-2 border-transparent px-2 py-3 text-center font-semibold transition hover:bg-black hover:text-white">Wishlist</li></Link>
        <Link href='/payment-method'><li class="mt-2 text-xs cursor-pointer border-l-2 border-transparent px-2 py-3 text-center font-semibold transition hover:bg-black hover:text-white">Payment Methods</li></Link>
		<Link href='/addresses'><li class="mt-2 text-xs cursor-pointer border-l-2 border-transparent px-2 py-3 text-center font-semibold transition hover:bg-black hover:text-white">Addresses</li></Link>
	
      </ul>
    </div>




    <div class="col-span-8 overflow-hidden sm:bg-gray-50 sm:px-8 sm:shadow">
    
    

<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <h1 className="text-lg px-2">Current Orders ({orders?.length})</h1>
    <table class="w-full pt-3 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
            
                <th scope="col" class="px-2 py-3">
                    Tracking ID
                </th>
                <th scope="col" class="px-2 py-3">
                    Qty
                </th>
                <th scope="col" class="px-2 py-3">
                    Price
                </th>
                <th scope="col" class="px-2 py-3">
                    Status
                </th>
            </tr>
        </thead>
        <tbody>
        {orders.map(order=>(
            <tr key={order.id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
           
                <>
                <td class="px-6 py-4 font-semibold text-xs text-gray-900 dark:text-white">
                {order?.tracking_number}        
            </td> 
            <td class="px-6 py-4 font-semibold text-xs text-gray-900 dark:text-white">
                {order?.number_of_items}        
            </td> 

            <td class="px-6 py-4 font-semibold text-xs text-gray-900 dark:text-white">
                {order?.total_amount}        
            </td> 
            <td class="px-6 py-4 font-semibold text-sm text-gray-900 dark:text-white">
                {order?.delivered === false ? <p className="text-yellow-800 text-xs">Pending</p>  : <p className="text-green-800 text-xs">Completed</p>}        
            </td> 
             </>
            
            </tr>
        ))}   
        
        </tbody>
    </table>
</div>

    
    </div>

    
  </div>
</div>

    </>
  )
}
