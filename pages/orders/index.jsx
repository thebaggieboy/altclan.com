import React, { useState, useEffect } from 'react'
import Image from "next/image"
import { useDispatch, useSelector } from 'react-redux'

import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import Tabs from "./Tabs/Tab"
import { selectUser } from '../../features/user/userSlice'
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import fetchProductData from '../../lib/fetchProductData'

import Link from "next/link"
import fetchOrderData from '../../lib/fetchOrderData'
import { selectOrder, setOrder } from '../../features/orders/ordersSlice'
const queryClient = new QueryClient()


export default function Orders() {

  const user = useSelector(selectUser);
  const order= useSelector(selectOrder) 
  const router = useRouter()
  const dispatch = useDispatch()
  const searchParams = useSearchParams();
  const updateMessage = searchParams.get('update')
  const [orders, setOrders] = useState([])
  const [orderError, setOrderError] = useState('No current Order')
  
  let orderResults = []


  useEffect(() => {
    const getOrder = async()=>{
        console.log("Getting orders from api")
        try {
            const orderUrl = await fetch(`https://altclan-api.onrender.com/api/users/${user?.[0]?.id}/`)
            const data = await orderUrl?.json()
            const orderResult = data
            setOrders(orderResult)
            dispatch(setOrder(orderResult.orders))
        
        } catch (error) {
            console.error("Error fetching orders:", error)
        }
    }
  
      if (user !== null) {
          getOrder()
      }
  }, [user])

  
  console.log("order state: ", order?.orders)

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
    <h1 className="text-lg px-2">Current Orders ({user?.[0]?.orders?.length})</h1>
    <table class="w-full pt-3 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
            
                <th scope="col" class="px-2 py-3">
                    ID
                </th>
                <th scope="col" class="px-2 py-3">
                    Qty
                </th>
                <th scope="col" class="px-2 py-3">
                    Size
                </th>
                <th scope="col" class="px-2 py-3">
                    Color
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
        {order?.map((order)=>(
            <tr key={order.id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
           
                <>
                <td class="px-6 py-4 font-semibold text-xs text-gray-900 dark:text-white">
                {order?.id}        
            </td> 
            <td class="px-6 py-4 font-semibold text-xs text-gray-900 dark:text-white">
                {order?.qty}        
            </td> 

            <td class="px-6 py-4 font-semibold text-xs text-gray-900 dark:text-white">
                {order?.size}        
            </td> 
            <td class="px-6 py-4 font-semibold text-xs text-gray-900 dark:text-white">
                {order?.color}        
            </td> 
            <td class="px-6 py-4 font-semibold text-xs text-gray-900 dark:text-white">
                {order?.price}        
            </td> 

        {/* {{    <td class="px-6 py-4 font-semibold text-sm text-gray-900 dark:text-white">
                {order?.delivered === false ? <p className="text-yellow-800 text-xs">Pending</p>  : <p className="text-green-800 text-xs">Completed</p>}        
            </td>}}  */}
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
