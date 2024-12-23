import React, {useState, useEffect} from 'react'
import { PaystackButton } from 'react-paystack'
import { useRouter } from 'next/router';
import {useSelector, useDispath} from 'react-redux'
import {selectCartItems, selectCartTotal} from '../features/shop/shopSelector'
import { selectUser } from '../features/user/userSlice';
import OrderItem from "./OrderItem"
import Link from 'next/link'

export default function Shipping({merchs}) {
  const user = useSelector(selectUser);
  //const email = "thebaggieboy@protonmail.com"
 
  const phone = "+2349093329384"
  const [firstName, setfirstName] = useState('')
  const [lastName, setlastName] = useState('')
  //const name = "Enimofe"
  const name = firstName + " " + lastName
  const [city, setcity] = useState('')
  const [state, setstate] = useState('')
  const [address, setaddress] = useState('')
  const [zip, setzip] = useState('')
  const cartItems = useSelector(selectCartItems);
	const total = useSelector(selectCartTotal);
  
	const shippingFee = 8;
	const grandTotal = shippingFee + total;

  const publicKey = 'pk_test_e9860037f0af2ff47a7c342b2080747cf257e3a1'
  const router = useRouter()
  const amount = grandTotal * 100
  const email = user?.email
  const componentProps = {
    email,
    amount,
    metadata: {
      name,
      phone,
    },
    publicKey,
    text: "Pay Now",
    onSuccess: () => router.push('/payment-success')
   
  }

  const [step, setStep] = useState(2);

	useEffect(() => {
		if (user === null) {
			router.push("/accounts/signup");
		}
	}, [user]);
  
  function submit(e){
    e.preventDefault()
  

    
    console.log('Place order')
  }

  return (
    <>
    <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
    <a href="#" className="text-2xl font-bold text-gray-800">altclan</a>
    <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
      <div className="relative">
        <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
          <li className="flex items-center space-x-3 text-left sm:space-x-4">
            <a className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700" href="/checkout"
              ><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
            </a>
            <span className="font-semibold text-gray-900">Shop</span>
          </li>

          <li className="flex items-center space-x-3 text-left sm:space-x-4">
            <a className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700" href="#"
              ><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
            </a>
            <span className="font-semibold text-gray-900">Shipping</span>
          </li>

          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
          <li className="flex items-center space-x-3 text-left sm:space-x-4">
            <a className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white" href="">3</a>
            <span className="font-semibold text-gray-500">Payment</span>
          </li>
        </ul>
      </div>
    </div>
  </div>

  <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
    <div className="px-4 pt-8">
      <p className="text-xl font-medium">Order Summary</p>
      <p className="text-gray-400">Check your items. And select a suitable shipping method.</p>

      
    
      {cartItems.map((item) => {
	const data = merchs?.find((m) => m.id === item.itemId);
		return (
			<OrderItem key={item.id} data={{ ...item, ...data, cartId: item.id }} />	
            );
			})}
  






      
      <p className="mt-8 text-lg font-medium">Shipping Methods</p>
      <form className="mt-5 grid gap-6">
        <div className="relative">
          <input className="peer hidden" id="radio_1" type="radio" name="radio" checked />
          <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
          <label className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" htmlFor="radio_1">
            <img className="w-14 object-contain" src="/images/naorrAeygcJzX0SyNI4Y0.png" alt="" />
            <div className="ml-5">
              <span className="mt-2 font-semibold">Standard Delivery</span>
              <p className="text-slate-500 text-sm leading-6">Delivery: 2-4 Days</p>
            </div>
          </label>
        </div>
        <div className="relative">
          <input className="peer hidden" id="radio_2" type="radio" name="radio" checked />
          <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
          <label className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" htmlFor="radio_2">
            <img className="w-14 object-contain" src="/images/oG8xsl3xsOkwkMsrLGKM4.png" alt="" />
            <div className="ml-5">
              <span className="mt-2 font-semibold">Express Delivery</span>
              <p className="text-slate-500 text-sm leading-6">Delivery: 1-2 Days</p>
            </div>
          </label>
        </div>
      </form>
    </div>
    
    <div className="mt-10 bg-gray-50 px-4 pt-6 lg:mt-0">
      <p className="text-xl font-medium">Shipping Details</p>
      <p className="text-gray-400">Complete your order by providing your payment details.</p>
      <form onSubmit={submit}>
      <div className="">
        <label htmlFor="email"  className="mt-4 mb-2 block text-sm font-medium">Email</label>
        <div className="relative">
          <input type="text" value={user?.email} disabled onChange={(e) => setEmail(e.target.value)} id="email" name="email" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="your.email@gmail.com" />
          <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
            </svg>
          </div>
        </div>
        <label htmlFor="first-name" className="mt-4 mb-2 block text-sm font-medium">First Name</label>
        <div className="relative">
          <input type="text" onChange={(e) => setfirstName(e.target.value)} id="card-holder" name="card-holder" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Your first name here" />
          <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
            </svg>
          </div>
        </div>

        <label htmlFor="last-name" className="mt-4 mb-2 block text-sm font-medium">Last Name</label>
        <div className="relative">
          <input type="text" onChange={(e) => setlastName(e.target.value)} id="card-holder" name="card-holder" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Your last name here" />
          <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
            </svg>
          </div>
        </div>
  
  
        <div className="mt-6 border-t border-b py-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900">Subtotal</p>
            <p className="font-semibold text-gray-900">$399.00</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900">Shipping</p>
            <p className="font-semibold text-gray-900">$8.00</p>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm font-medium text-gray-900">Total</p>
          <p className="text-2xl font-semibold text-gray-900">$408.00</p>
        </div>
      </div>
     
      <PaystackButton   className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white" {...componentProps} />
   
      </form>
    </div>
    <br/><br/>
  </div>
    </>
  
  )
}
