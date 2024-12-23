import {React, useState, useEffect, useContext} from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link'
import {CartContext} from '../context/CartContext'
import HeaderTab from './../components/headers/HeaderTab'
import Category from './../components/Category'
import useMerch from "../hooks/useMerch"
import Head from "next/head"
import { useSearchParams } from 'next/navigation'
const categories = [
  // More categories...
]
import useDebounce from '../hooks/useDebounce'
export default function Search({ _id, merchandise_name, price, picture }) {
  const {cart, addToCart} = useContext(CartContext);
  const [searchQuery, setSearchQuery] = useState('');
  // Results of the search query in an array
  const router = useRouter()
  const [filteredSearch, setFilteredSearch] = useState([]);
  const [searchResult, setSearchResult] = useState([])
	const searchParams = useSearchParams();
	const search = searchParams.get('search')
	
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);

    setTimeout(() => {
      router.push(`/search?q=${searchQuery}`)
  
      console.log("Delayed for 500 millisecond.");
      clearTimeout(searchQuery);
    }, 500);
   
    
  

  };
  console.log("Search Query: ", searchQuery)
  const { data, loading, error } = useMerch('https://altclan-brands-api-1-1.onrender.com/api/merchandises/')
  //const { data, loading, error } = useMerch('https://altclan-api-v1.onrender.com/api/merchandises/')
  //const data = fetch('https://altclan-api-v1.onrender.com/api/merchandises/')
 
 


  useEffect(() => {

    if (searchQuery !== null) {
      const results = data?.filter((product) => product.merchandise_name.toLowerCase().includes(searchQuery.toLowerCase()) );
      setSearchResult(results);
      
      console.log("Search Results for ", searchQuery, searchResult)
    } else {
      setSearchResult([]);
    }
  }, [searchQuery, data]);



  return (
   <>
    <Head>
       <title>Search for merch</title>
            <meta charset="UTF-8" />
            <meta
              name="description"
              content="Search for products using keywords."
            />
              <meta name="keywords"
                    content="altclan, altclan login, login, fashion, community, aesthetics, enigmas, arts, merchandises,  clothing, rings, accessories" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/alteclan_logo.jpg" />
       </Head> 
  <div className="pt-2 m-2 " style={{fontFamily:'Poppins, Sans-serif', lineHeight:'100%', letterSpacing:2}}>
      <div className="mx-auto p-5 ">
        <div className="flex items-center" >   
            <label for="simple-search" className="sr-only">Search</label>
            <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                
                </div>
                <input type="text" style={{borderRadius:0}} onChange={handleSearchChange} value={searchQuery} id="simple-search" className="bg-gray-50 mt-2   border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full pl-10 p-4  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="Search" required/>
            </div>
      
        </div>
  </div>
  <h2 style={{fontFamily:'Poppins, Sans-serif', lineHeight:'100%', letterSpacing:2}} className='text-center'>{`Search results for "${searchQuery}"`}</h2> <br/>
  {searchQuery && searchResult?.map((product) => (
           <section style={{fontFamily:'Poppins, Sans-serif', lineHeight:'100%', letterSpacing:2}} key={product.id } aria-labelledby="products-heading" className="pb-24">
           <div className="mx-auto max-w-2xl  px-4 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8">
									<div className=" grid grid-cols-2 gap-x-6 gap-y-10  lg:grid-cols-4 xl:gap-x-8">
                  {searchResult?.map(
											({
												id,
												display_image,
												imageAlt,
												brand_name,
												merchandise_name,
												merchandise_type,
												labels,
												price,
											}) =>(
												<div key={id} className="group relative">
													<div className="min-h-100 aspect-h-1 aspect-w-1 w-full overflow-hidden  lg:aspect-none group-hover:opacity-75 lg:h-80">
														<Link href={`/products/${id}`}>
															<img
																src={display_image}
																alt={imageAlt}
																className="h-full w-full object-cover object-center lg:h-full lg:w-full"
															/>
															
														</Link>
													</div>
													<Link href={`/products/${id}`}>

													
													<div className="flex pt-3 justify-between">
														<div>
														<div className="container text-gray-500 text-xs">
															{labels != "None" ?
															 <span style={{backgroundColor:'#F5F5DC', borderRadius:0, fontSize:10}} class=" text-black me-2 px-2.5 py-0.5 rounded dark:bg-black dark:text-white border border-black">
															{labels}
															</span> : ""}

														
															</div>
															<h3 className="text-sm pt-2  text-black">
																{/* An element here was covering the whole card making the add to cart unclickable */}
																{merchandise_name} 
															</h3> <span style={{fontSize:12}}>by</span> <span style={{fontSize:13, fontStyle:"italic"}}>{brand_name}</span> 
															
															<p style={{fontWeight:'bold'}}  className="text-xs pt-1 text-gray-900">
																₦{price}
															</p>

														
														</div>

												
													</div>
													</Link>
												</div>
											)

										)}
									</div>
								</div>
         </section>
        ))}

  <div className='pt-10'>
    
  </div>
</div>
</>
  )
}
