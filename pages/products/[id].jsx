import React, { useState, useContext, Component } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { RadioGroup } from "@headlessui/react";
import { ProductContext } from "../../context/ProductContext";
import { CartContext } from "../../context/CartContext";
import useData from "../../hooks/useData";
import { addItem } from "../../features/shop/shopSlice";
import { addItem as addWishListItem } from "../../features/wishlist/wishListSlice";
import Link from "next/link";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import fetchProductData from '../../lib/fetchProductData'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from "react-redux";

import Review from "./../../components/Review"
import { selectUser } from "../../features/user/userSlice";
import Head from 'next/head'

import styles from "../../styles/brand.module"

const reviewSuccess = <div class="flex items-center text-center p-4 mb-4 text-sm text-green-800 border border-0 bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800" role="alert">
<svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
</svg>
<span class="sr-only">Info</span>
<div>
You review has been added Successfully!
</div>
</div>

const queryClient = new QueryClient()

export async function getServerSideProps(context) {
	const id = context.params.id;
	const data = await queryClient.fetchQuery({ queryKey: ["product", id], queryFn: () => fetchProductData(id) })
	console.log("MERCH: ", id)
	 
	return {
		props: { merch: data },
	};
}

const product = {
	breadcrumbs: [
		{ id: 1, name: "Men", href: "#" },
		{ id: 2, name: "Clothing", href: "/products" },
	],

	colors: [
		{ name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
		{ name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
		{ name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
	],
	sizes: [
		{ name: "XXS", inStock: false },
		{ name: "XS", inStock: true },
		{ name: "S", inStock: true },
		{ name: "M", inStock: true },
		{ name: "L", inStock: true },
		{ name: "XL", inStock: true },
		{ name: "2XL", inStock: true },
		{ name: "3XL", inStock: true },
	],
	description:
		'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
	highlights: [
		"Hand cut and sewn locally",
		"Dyed with our proprietary colors",
		"Pre-washed & pre-shrunk",
		"Ultra-soft 100% cotton",
	],
	details:
		'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
};
const reviews = { href: "#", average: 4, totalCount: 117 };

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export default function ProductDetail({ _id, merch }) {
	const user = useSelector(selectUser)

	const dispatch = useDispatch();
	const [selectedColor, setSelectedColor] = useState(product.colors[0]);
	const [selectedSize, setSelectedSize] = useState(merch.available_sizes[1]);
	const { selectedProducts, setSelectedProducts } = useContext(ProductContext);
	const [open, setOpen] = useState(false);
	const [added, setAdded] = useState(false);
	const [isLoading, setIsLoading] = useState(true)
	const [successText, setSuccessText] = useState("")
	const [reviewPosted, setReviewPosted] = useState(false)	
	const [reviewList, setReviewList] = useState(false)	
	const [reviewErr, setReviewErr] = useState([])
	function addToCart() {
		setSuccessText("Item added to cart")
		setAdded(true)

		console.log(added)
		console.log(successText)
		const data = {
			
			itemId: merch.id,
			size: selectedSize,
			color: selectedColor.name,
			qty: 1,
			price: merch.price,
		};
		dispatch(addItem(data));
	}

	function addToWishList() {
		setSuccessText("Item added to wishlist")
		setAdded(true)

		console.log(added)
		console.log(successText)
		const data = {
			itemId: merch.id,
			size: selectedSize,
			color: selectedColor.name,
			qty: 1,
			price: merch.price,
		};
		dispatch(addWishListItem(data));
	}
	const router = useRouter()

	const [formData, setFormData] = useState({
	  email:user?.[0]?.email,
	  review: "",
	})
	const [wishData, setWishData] = useState({
		user_email_: "guest",
		colors: [],
		display_image:"",
		product_name:""

	  })
  
	let { email, review } = formData
	let {user_email_, colors, display_image, product_name} = wishData
  	
	
	const inputChangeHandler = (e) => {
	  const { name, value } = e.target
	  setFormData((prevValue) => {
		return {
		  ...prevValue,
		  [name]: value
		}
	  })
	  console.log("Form Data: ", formData)
	 
	}
	const getReviews = async(e)=>{
		e.preventDefault()
		const url = `https://altclan-api.onrender.com/api/merchandises/${merch?.id}`
		const res = await fetch(url, {
		  method: "GET",
		 
		  headers: {
			  "Content-Type": "application/json"
		  },
	  })
	
	  const data = await res.json()
	
	  if (res.status >= 200 && res.status <= 209) {
		console.log("review LIST")
		setReviewList(true)
		//router.push("#")
	
		  console.log(data)
	  
	
	  const err = { ...data }
	
	  throw { err } 


	  }

	const addReview = async(e)=>{
		e.preventDefault()
		const url = `https://altclan-api.onrender.com/api/merchandises/${merch?.id}`
		const res = await fetch(url, {
		  method: "PATCH",
		  body: JSON.stringify({reviews:{user:user?.email, review:formData.review}}),
		  headers: {
			  "Content-Type": "application/json"
		  },
	  })
	
	  const data = await res.json()
	
	  if (res.status >= 200 && res.status <= 209) {
		console.log("review POSTED")
		setReviewPosted(true)
		//router.push("#")
	
		  console.log(data)
	  }
	
	  const err = { ...data }
	
	  setReviewErr(err)
	  console.log("Review Error: ", err)
	  throw { err } 


	  }


	const addWishList = async(e)=>{
		e.preventDefault()
		const url = 'https://altclan-api.onrender.com/api/wishlist/'
		const res = await fetch(url, {
		  method: "POST",
		  body: JSON.stringify({user_email:user?.[0]?.email, product_name:'',  quantity:'', colors:''}),
		  headers: {
			  "Content-Type": "application/json"
		  },
	  })
	
	  const data = await res.json()
	
	  if (res.status >= 200 && res.status <= 209) {
		console.log("review POSTED")
		//router.push("#")
	
		  console.log("Review: ", data)
	  }
	
	  const err = { ...data }
	  throw { err }
	   
	  }
	  
	  if (merch.length < 1) {
		return (
		  <>
		  
		  <Head>
		   <title>Altclan - alternative fashion brands</title>
				<meta charset="UTF-8" />
				<meta name="robots" content="follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large"/>
				<meta
				  name="description"
				  content="Explore alternative fashion brands"
				/>
				  <meta name="keywords"
						content="altclan, altclan login, login, altclan signup, login altclan" />
						<meta name="author" content="Altclan"></meta>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/alteclan_logo.jpg" />
				<script src="https://upload-widget.cloudinary.com/latest/global/all.js" type="text/javascript"></script>  
	
		   </Head> 
	
		  <div className="mt-5 p-5 text-center">
		  <br />
	
		  <div
			role="status"
			className="animate-pulse space-y-8 md:flex md:items-center md:space-x-8 md:space-y-0"
		  >
			<div className="flex h-48 w-full items-center justify-center rounded bg-gray-300 dark:bg-gray-700 sm:w-96">
			  <svg
				className="h-10 w-10 text-gray-200 dark:text-gray-600"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				fill="currentColor"
				viewBox="0 0 20 18"
			  >
				<path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
			  </svg>
			</div>
			<div className="w-full">
			  <div className="mb-4 h-2.5 w-48 rounded-full bg-gray-200 dark:bg-gray-700"></div>
			  <div className="mb-2.5 h-2 max-w-[480px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
			  <div className="mb-2.5 h-2 rounded-full bg-gray-200 dark:bg-gray-700"></div>
			  <div className="mb-2.5 h-2 max-w-[440px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
			  <div className="mb-2.5 h-2 max-w-[460px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
			  <div className="h-2 max-w-[360px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
			</div>
			<span className="sr-only">Loading...</span>
		  </div>
		</div>
		</>
		)
	
	  }

	return (
		<>
	<div class="bg-white dark:bg-gray-800 py-8" style={{fontFamily:"Poppins, Sans-serif", lineHeight:'100%', letterSpacing:1}}>
	<div className="ml-5 p-2">
   <button type="button" onClick={()=> router.back()} class="w-full flex items-center justify-center w-1/2 px-5 py-2 text-sm text-black transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700">
    <svg class="w-5 h-5 rtl:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
    </svg>
    <span>Go back</span>
</button>
   </div>
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row -mx-4">
            <div class="md:flex-1 px-4">
                <div class="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                    <img class="w-full h-full object-cover" src={merch.display_image} alt="Product Image"/>
                </div>
				<div>
        
				<div class="grid gap-4 p-5">
				
					<div class="grid grid-cols-5 gap-4">
						<div>
							<img class="h-auto max-w-full rounded-lg" src={merch.display_image} alt="" />
						</div>
						<div>
							<img class="h-auto max-w-full rounded-lg" src={merch.display_image} alt="" />
						</div>
						<div>
							<img class="h-auto max-w-full rounded-lg" src={merch.display_image} alt="" />
						</div>
						<div>
							<img class="h-auto max-w-full rounded-lg" src={merch.display_image} alt="" />
						</div>
						<div>
							<img class="h-auto max-w-full rounded-lg" src={merch.display_image} alt="" />
						</div>
					</div>
				</div>
    </div>
                <div class="flex -mx-2 mb-4">
                    <div class="w-1/2 px-2">
                        <button onClick={addToCart}  class="w-full bg-gray-900 dark:bg-gray-600 text-white text-sm py-4 px-4  font-bold hover:bg-black dark:hover:bg-gray-700">Add to Cart</button>
                    </div>
                    <div class="w-1/2 px-2">
                        <button onClick={addToWishList} style={{fontWeight:"bold", backgroundColor:"beige", border:"1px solid black"}} class="w-full text-sm  dark:bg-gray-700 text-black dark:text-white py-4 px-4 font-bold  dark:hover:bg-gray-600">Add to Wishlist</button>
                    </div>
                </div>
            </div>
            <div onClick='#review' class="md:flex-1 px-4">
				{added == true ? <div class="flex items-center text-center p-4 mb-4 text-sm text-green-800 border border-1 bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800" role="alert">
				<svg style={{fontFamily:"Poppins, Sans-Serif"}} class="w-6 h-6 font-bold text-green-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <path d="M12.268 6A2 2 0 0 0 14 9h1v1a2 2 0 0 0 3.04 1.708l-.311 1.496a1 1 0 0 1-.979.796H8.605l.208 1H16a3 3 0 1 1-2.83 2h-2.34a3 3 0 1 1-4.009-1.76L4.686 5H4a1 1 0 0 1 0-2h1.5a1 1 0 0 1 .979.796L6.939 6h5.329Z"/>
  <path d="M18 4a1 1 0 1 0-2 0v2h-2a1 1 0 1 0 0 2h2v2a1 1 0 1 0 2 0V8h2a1 1 0 1 0 0-2h-2V4Z"/>
</svg>

		<span class="sr-only">Tick</span>
		<div className="ml-5">
		{successText}
		</div>
	  </div> : ""}
                <h2 style={{fontFamily:"Poppins, Sans-Serif"}} class="text-4xl text-black font-bold dark:text-white mb-2">{merch.merchandise_name}</h2>BY
				  <h3 style={{fontFamily:"Poppins, Sans-Serif", width:140, fontSize:16, fontStyle:'italic', textDecoration:'underline'}} class="text-black dark:text-white mb-2"><a>{merch.brand_name}</a></h3>
                <p class="text-gray-600 dark:text-gray-300 text-sm mb-4">
				{merch.details}
                </p> <hr />
                <div class="flex mb-4 mt-4">
                    <div class="mr-4">
                        <span style={{fontFamily:"Poppins, Sans-Serif"}} class=" text-black dark:text-gray-300">Price:</span>
                        <span class=" text-black text-sm dark:text-gray-300"> ₦{merch?.price}</span>
                    </div>
                    <div>
                        <span class=" text-gray-700 dark:text-gray-300">Availability:</span>
                        <span class="text-green-700 font-bold text-sm dark:text-gray-300"> In Stock</span>
                    </div>
                </div> 

				<div class="flex items-center">
    <svg class="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
    </svg>
    <p class="ms-2 text-sm font-bold text-gray-900 dark:text-white">4.95</p>
    <span class="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
    <a href="#" class="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white">73 reviews</a>
</div>


                <div class="mb-4 mt-4">
                    <span class=" text-black dark:text-gray-300">Select Color:</span>
                    <div class="flex items-center mt-2">

					<RadioGroup
									value={selectedColor}
									onChange={setSelectedColor}
									className="mt-4"
								>
									<RadioGroup.Label className="sr-only">
										{" "}
										Choose a color{" "}
									</RadioGroup.Label>
									<div className="flex items-center space-x-3">
										{merch.available_colors && merch.available_colors.map((color) => (
											<RadioGroup.Option
												key={color.name}
												value={color}
												className={({ active, checked }) =>
													classNames(
														color.selectedClass,
														active && checked ? "ring ring-offset-1" : "",
														!active && checked ? "ring-2" : "",
														"relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none"
													)
												}
											>
												<RadioGroup.Label as="span" className="sr-only">
													{" "}
													{color.name}{" "}
												</RadioGroup.Label>
												<span
													aria-hidden="true"
													className={classNames(
														color.class,
														"h-8 w-8 rounded-full border border-black border-opacity-10"
													)}
												/>
											</RadioGroup.Option>
										))}
									</div>
								</RadioGroup>
                    </div>
                </div>
                <div class="mb-4">
                    <span class=" text-black dark:text-gray-300">Select Size:</span>
                    <div class="flex items-center mt-2">
<div className="mt-5">
								

								<RadioGroup
									value={selectedSize}
									onChange={setSelectedSize}
									className="mt-4"
								>
									<RadioGroup.Label className="sr-only">
										{" "}
										Choose a size{" "}
									</RadioGroup.Label>
									<div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
										{merch?.available_sizes && merch?.available_sizes.map((size) => (
											<RadioGroup.Option
												key={size.name}
												value={size}

												className={({ active }) =>
													classNames(
														size
															? "cursor-pointer bg-white text-gray-900 shadow-sm"
															: "cursor-not-allowed bg-gray-50 text-gray-200",
														active ? "ring-2 bg-yellow-200" : "",
														"group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
													)
												}
											>
												{({ active, checked }) => (
													<>
														<RadioGroup.Label as="span">
															{size}
														</RadioGroup.Label>
														{size ? (
															<span
																className={classNames(
																	active ? "border" : "border-2",
																	checked
																		? "border-yellow-200"
																		: "border-transparent",
																	"pointer-events-none absolute -inset-px rounded-md"
																)}
																aria-hidden="true"
															/>
														) : (
															<span
																aria-hidden="true"
																className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
															>
																<svg
																	className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
																	viewBox="0 0 100 100"
																	preserveAspectRatio="none"
																	stroke="currentColor"
																>
																	<line
																		x1={0}
																		y1={100}
																		x2={100}
																		y2={0}
																		vectorEffect="non-scaling-stroke"
																	/>
																</svg>
															</span>
														)}
													</>
												)}
											</RadioGroup.Option>
										))}
									</div>
								</RadioGroup>
							</div>

                    </div>
                </div>
                <div>
                    <span class=" text-black dark:text-gray-300">Product Description:</span>
                    <p class="text-black dark:text-gray-300 text-sm mt-2">
                      {merch?.merchandise_description}
                    </p>
                </div> <br /><hr /> <br />
				<div>
                    <span class=" text-black dark:text-gray-300">Product Details:</span>
                    <p class="text-black dark:text-gray-300 text-sm mt-2">
                      {merch?.merchandise_details}
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>
<hr />
		<div className="bg-white">
			<div className="pt-6">
		    <section style={{padding:20}}>
         
	{reviewPosted == true ? reviewSuccess : ""}

	{merch.reviews.map(m=>(
	<>
  <div className={styles.box } id="review">
                <div className={styles.profile}>
                  <img src="https://images.unsplash.com/photo-1653656120693-c987723b2046?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80" alt="" className={styles.img} />
                  <div className={styles.bio}>
                    <h2>{m?.email} </h2>
                  </div>
                </div>
                <div className={styles.qoute}>
                  <p>
                    {m?.review}
                  </p>
                </div>
              </div>
	</>
))}

<form onSubmit={addReview}>
  <label for="message" style={{fontSize:20, fontWeight:'bold', fontFamily:"Poppins, Sans-Serif"}} class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your review</label> <br />



  <textarea onChange={inputChangeHandler} id="review" name="review" rows="4" class="block p-5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a comment..."></textarea>
  <button
	type="submit"
	className="mt-10 flex  items-center justify-center rounded-md border border-black bg-white px-8 py-3  font-medium text-dark  focus:ring-black"
	>
	Submit
 </button>
</form>
       
        </section>
			</div>
		</div> <br /><br />
		</>
	);
}
}