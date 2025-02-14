"use client";
import React, { useEffect, useState } from "react";
import ChartOne from "../../../components/Charts/ChartOne";
import ChartThree from "../../../components/Charts/ChartThree";
import ChartTwo from "../../../components/Charts/ChartTwo";
import ChatCard from "../../../components/Chat/ChatCard";
import TableOne from "../../../components/Tables/TableOne";
import CardDataStats from "../../../components/CardDataStats";
// import Map from "../../../components/Maps/TestMap";
// without this the component renders on server and throws an error
import dynamic from "next/dynamic";
import useDashboard from "../../../hooks/useDashboard";

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
import styles from '../../../styles/new_product.module.css';
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
  const { data, isLoading, error} = useData('https://altclan-api.onrender.com/api/orders/')


    useEffect(() => {
		if (user == null) {
			router.push("/brands/login");
		}
  

	}, [user]);
  useEffect(() => {

    const productResults = data2?.filter((product) => product.brand_name?.toLowerCase().includes(user[0]?.brand_name.toLowerCase()) );
    const orderResults = data?.filter((order) => order.name_of_brand?.toLowerCase().includes(user[0]?.brand_name.toLowerCase()) );
    const sales = data?.filter((order) => order?.delivered == true );

    setProductResult(productResults);
    setOrderResult(orderResults)
    setSalesResult(sales)
    var total = data?.reduce((accum, product) => accum + product.total_amount, 0)
    console.log('orders total: ', total)
    setTotal(total)
  }, [searchQuery, data, data2, loggedInBrand, productResult]);





 const totalProfit = () =>{
    // Revenue minus sales = Profit
    console.log('Calculating total profit ...')

 
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

  <div class="grid grid-cols-8  sm:grid-cols-10">
    
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



    <div class="col-span-8 overflow-hidden rounded-xl sm:bg-gray-50 sm:px-8 sm:shadow"> <br />
  
    <div>
                <div className="">
           <div className={styles.loginContainer}>
         
   
           <div className={styles.columnText}>
               <form className={styles.form}>
               
                   <h1 className={styles.greeting}>Create Product</h1>
                <br />
                   <div>
                   <label for="email" className="block mb-2 ml-19 text-sm font-medium text-black">Merchandise Name</label> 
                       <input type="text" onChange={e => setMerchandiseName(e.target.value)} name="brand-name" id="brand-name" className={styles.input} placeholder="" required/>
                       
                   </div>
                   <div>
                   <label for="brand_bio" className="block mb-2 ml-19 text-sm font-medium text-black">Merchandise Size</label> 
                       <textarea type="text" onChange={e => setMerchandiseSize(e.target.value)} name="bio" id="bio" placeholder="" className={styles.input} required></textarea>
                   </div>
                   <div>
                   <label for="brand_bio" className="block mb-2  ml-19 text-sm font-medium text-black">Label</label> 
                       <textarea type="text" onChange={e => setLabels(e.target.value)} name="bio" id="bio" placeholder="" className={styles.input} required></textarea>
                   </div>
                   <div>
                   <label for="brand_bio" className="block mb-2 ml-19 text-sm font-medium text-black">Delivery Cost</label> 
                       <textarea type="text" onChange={e => setdeliveryCost(e.target.value)} name="bio" id="bio" placeholder="" className={styles.input} required></textarea>
                   </div>
                   <div>
                   <label for="brand_bio" className="block mb-2 ml-19 text-sm font-medium text-black">Category</label> 
                       <textarea type="text" onChange={e => setCategory(e.target.value)} name="bio" id="bio" placeholder="" className={styles.input} required></textarea>
                   </div>
                   <div>
                   <label for="brand_bio" className="block mb-2 xl:ml-19 text-sm font-medium text-black">Price</label> 
                       <textarea type="text" onChange={e => setPrice(e.target.value)} name="bio" id="bio" placeholder="" className={styles.input} required></textarea>
                   </div>
   
                
                
   
                   <button type='submit'  className={styles.submit}>
                       Add new merch
                   </button>
      
                 </form>
           </div>
           </div>
       </div>
           </div>

     
    
    </div>
  </div>

  
</div>

     
    </>
  );
};

export default ECommerce;
