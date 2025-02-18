"use client";
import React, { useEffect, useState } from "react";

import OrdersTable from "../../../components/Tables/OrdersTable";
import CardDataStats from "../../../components/CardDataStats";
// import Map from "../../../components/Maps/TestMap";
// without this the component renders on server and throws an error
import dynamic from "next/dynamic";
import userOrder from "../../../hooks/userOrder";

import { useSearchParams } from 'next/navigation'
import { USER_TYPES, selectUser } from "../../../features/user/userSlice";
import { selectBrandUser } from "../../../features/brands/brandUserSlice";
import { useRouter } from "next/router";
const MapOne = dynamic(() => import("../../../components/Sidebar/Maps/MapOne"), {
  ssr: false,
});
import { useSelector } from "react-redux";
import useData from "../../../hooks/useData";

import useOrder from '../../../hooks/useOrder'
import useGetProducts from "../../../hooks/useGetProducts";
import Link from "next/link";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import fetchProductData from '../../../lib/fetchProductData'
import Review from "./../../../components/Review"
const queryClient = new QueryClient()


const ECommerce = ({merch}) => {
  const [query, setQuery] = useState([])
  const user = useSelector(selectUser)
	const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('')
  const [productResult,  setProductResult] = useState([])
  const [orderResult,  setOrderResult] = useState([])
  const [salesResult,  setSalesResult] = useState([])
  const searchParams = useSearchParams();
	const loggedInBrand = searchParams.get('q')
   const [total, setTotal] = useState('')
  
   const { data2, isLoading2, error2} = useGetProducts(`https://altclan-brands-api-1-1.onrender.com/api/merchandises`)
   const { data, isLoading, error } = useOrder(`https://altclan-brands-api-1-1.onrender.com/api/orders/`);


    useEffect(() => {
		if (user == null) {
			router.push("/brands/login");
		}
  

	}, [user]);
  useEffect(() => {

    const productResults = data2?.filter((product) => product.brand_name?.toLowerCase().includes(user[0]?.brand_name.toLowerCase()) );
    const orderResults = data?.filter((order) => order.item?.toLowerCase().includes(user[0]?.brand_name.toLowerCase()) );
    const sales = data?.filter((order) => order?.delivered == true );

    setProductResult(productResults);
    setOrderResult(orderResults)
    setSalesResult(sales)
    var total = data?.reduce((accum, product) => accum + product.total_amount, 0)
    console.log('orders total: ', orderResult)
    setTotal(total)
  }, [searchQuery, data, data2, loggedInBrand, productResult]);





 const totalProfit = () =>{
    // Revenue minus sales = Profit
    console.log('Calculating total profit ...')

 
  }

  const totalCustomers = () =>{
    // Count the number of followers in the followers array using length
    
  }

  const totalTransactions = () =>{
    // Count the number of followers in the followers array using length
  }

  const calculatePercentMargin = ()=>{
    // Generate the amount of % increase in the last 24 hours 
  }
  
  return (
    
    <>
  
  <div class="min-h-screen max-w-screen-xl sm:mx-8  xl:mx-auto" style={{fontFamily:"Poppins, Sans-serif", lineHeight:'100%', letterSpacing:1}}>
 
  <div class="grid grid-cols-8  sm:grid-cols-10 ">
    
    <div class="relative  w-56 sm:hidden">
      <input class="peer hidden" type="checkbox" name="select-1" id="select-1" />
      <label for="select-1" class="flex w-full cursor-pointer select-none rounded-lg border p-2 px-3 text-sm text-gray-700 ring-blue-700 peer-checked:ring">Accounts </label>
      <svg xmlns="http://www.w3.org/2000/svg" class="pointer-events-none absolute right-0 top-3 ml-auto mr-5 h-4 text-slate-700 transition peer-checked:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
      </svg>

    
      <ul class="max-h-0 select-none flex-col overflow-hidden rounded-b-lg shadow-md transition-all duration-300 peer-checked:max-h-56 peer-checked:py-3">
        <li class="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white">Accounts</li>
        <li class="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white">Team</li>
        <li class="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white">Others</li>
      </ul>
    </div>

    <div class="col-span-2 hidden sm:block bg-black">
      <ul className="bg-black">

 
      <Link href={'/brands/dashboard/'}><li class="mt-5 cursor-pointer border-l-2 text-xs border-transparent px-2 py-2 text-center font-semibold transition hover:bg-black text-white">Dashboard</li></Link>
        <Link href={'/brands/dashboard/customers'}><li  class="mt-5 cursor-pointer border-l-2 text-xs border-transparent px-2 py-2 text-center font-semibold transition hover:bg-black text-white">Customers</li></Link>
        <Link href={'/brands/dashboard/analytics'}><li class="mt-5 cursor-pointer border-l-2 text-xs border-transparent px-2 py-2 text-center font-semibold transition hover:bg-black text-white">Analytics</li></Link>
        <Link href={'/brands/dashboard/products'}><li class="mt-5 cursor-pointer border-l-2 text-xs border-transparent px-2 py-2 text-center font-semibold transition hover:bg-black text-white">Products</li></Link>
        <Link href={'/brands/dashboard/orders'}><li class="mt-5 cursor-pointer border-l-2 text-xs border-transparent px-2 py-2 text-center font-semibold transition hover:bg-black text-white">Orders</li></Link>
        <Link href={'/brands/dashboard/coupons'}><li class="mt-5 cursor-pointer border-l-2 text-xs border-transparent px-2 py-2 text-center font-semibold transition hover:bg-black text-white">Coupons</li></Link>
        <Link href={'/brands/dashboard/sales'}><li class="mt-5 cursor-pointer border-l-2 text-xs border-transparent px-2 py-2 text-center font-semibold transition hover:bg-black text-white">Sale</li></Link>
        <Link href={'/brands/dashboard/transactions'}><li class="mt-5 cursor-pointer border-l-2 text-xs border-transparent px-2 py-2 text-center font-semibold transition hover:bg-black text-white">Transactions</li></Link>

      </ul>
    </div>


    <div class="col-span-8 overflow-hidden rounded-xl sm:bg-gray-50 sm:px-8 sm:shadow">
    
    <h1 className="mt-5 p-2 bolder text-center" style={{fontFamily:'Poppins, Sans-serif', fontSize:20, fontWeight:"bolder"}}>Customers</h1>
    <button  className="bg-black text-white float-right p-3 rounded">+Add New Order</button> <br />
      <div className="mt-4 p-4 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats title="Total Orders" total="0" >
          <svg
            className="fill-primary dark:fill-white"
            width="22"
            height="16"
            viewBox="0 0 22 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11 15.1156C4.19376 15.1156 0.825012 8.61876 0.687512 8.34376C0.584387 8.13751 0.584387 7.86251 0.687512 7.65626C0.825012 7.38126 4.19376 0.918762 11 0.918762C17.8063 0.918762 21.175 7.38126 21.3125 7.65626C21.4156 7.86251 21.4156 8.13751 21.3125 8.34376C21.175 8.61876 17.8063 15.1156 11 15.1156ZM2.26876 8.00001C3.02501 9.27189 5.98126 13.5688 11 13.5688C16.0188 13.5688 18.975 9.27189 19.7313 8.00001C18.975 6.72814 16.0188 2.43126 11 2.43126C5.98126 2.43126 3.02501 6.72814 2.26876 8.00001Z"
              fill=""
            />
            <path
              d="M11 10.9219C9.38438 10.9219 8.07812 9.61562 8.07812 8C8.07812 6.38438 9.38438 5.07812 11 5.07812C12.6156 5.07812 13.9219 6.38438 13.9219 8C13.9219 9.61562 12.6156 10.9219 11 10.9219ZM11 6.625C10.2437 6.625 9.625 7.24375 9.625 8C9.625 8.75625 10.2437 9.375 11 9.375C11.7563 9.375 12.375 8.75625 12.375 8C12.375 7.24375 11.7563 6.625 11 6.625Z"
              fill=""
            />
          </svg>
        </CardDataStats>

       
        <CardDataStats title="New Orders" total='0'  levelUp>
          <svg
            className="fill-primary dark:fill-white"
            width="20"
            height="22"
            viewBox="0 0 20 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.7531 16.4312C10.3781 16.4312 9.27808 17.5312 9.27808 18.9062C9.27808 20.2812 10.3781 21.3812 11.7531 21.3812C13.1281 21.3812 14.2281 20.2812 14.2281 18.9062C14.2281 17.5656 13.0937 16.4312 11.7531 16.4312ZM11.7531 19.8687C11.2375 19.8687 10.825 19.4562 10.825 18.9406C10.825 18.425 11.2375 18.0125 11.7531 18.0125C12.2687 18.0125 12.6812 18.425 12.6812 18.9406C12.6812 19.4219 12.2343 19.8687 11.7531 19.8687Z"
              fill=""
            />
            <path
              d="M5.22183 16.4312C3.84683 16.4312 2.74683 17.5312 2.74683 18.9062C2.74683 20.2812 3.84683 21.3812 5.22183 21.3812C6.59683 21.3812 7.69683 20.2812 7.69683 18.9062C7.69683 17.5656 6.56245 16.4312 5.22183 16.4312ZM5.22183 19.8687C4.7062 19.8687 4.2937 19.4562 4.2937 18.9406C4.2937 18.425 4.7062 18.0125 5.22183 18.0125C5.73745 18.0125 6.14995 18.425 6.14995 18.9406C6.14995 19.4219 5.73745 19.8687 5.22183 19.8687Z"
              fill=""
            />
            <path
              d="M19.0062 0.618744H17.15C16.325 0.618744 15.6031 1.23749 15.5 2.06249L14.95 6.01562H1.37185C1.0281 6.01562 0.684353 6.18749 0.443728 6.46249C0.237478 6.73749 0.134353 7.11562 0.237478 7.45937C0.237478 7.49374 0.237478 7.49374 0.237478 7.52812L2.36873 13.9562C2.50623 14.4375 2.9531 14.7812 3.46873 14.7812H12.9562C14.2281 14.7812 15.3281 13.8187 15.5 12.5469L16.9437 2.26874C16.9437 2.19999 17.0125 2.16562 17.0812 2.16562H18.9375C19.35 2.16562 19.7281 1.82187 19.7281 1.37499C19.7281 0.928119 19.4187 0.618744 19.0062 0.618744ZM14.0219 12.3062C13.9531 12.8219 13.5062 13.2 12.9906 13.2H3.7781L1.92185 7.56249H14.7094L14.0219 12.3062Z"
              fill=""
            />
          </svg>
        </CardDataStats>
       
      
      </div>
      <OrdersTable />
       
      <div className="mt-4 p-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
     
       
      </div>
    
    </div>
  </div>
</div>

     
    </>
  );
};

export default ECommerce;
