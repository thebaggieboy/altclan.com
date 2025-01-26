import Link from "next/link";

import { Fragment, useContext, useState, useEffect } from "react";
import { Dialog, Popover, Tab, Transition, Disclosure, Menu } from "@headlessui/react";
import style from "./header.module.css"


import {
	Bars3Icon,
	MagnifyingGlassIcon,
	ShoppingBagIcon,
	XMarkIcon,

} from "@heroicons/react/24/outline";

//import Cart from '../Cart'
import { CartContext } from "../../context/CartContext";
import { useDispatch, useSelector } from "react-redux";
import { USER_TYPES, selectUser, selectUserType, setUser, setUserType } from "../../features/user/userSlice";
import { selectBrandUser, setBrandUser } from "../../features/brands/brandUserSlice";
import logoutUser from "../../lib/logoutUser";
import { selectCartCount } from "../../features/shop/shopSelector";
import { selectToken, setToken } from "../../features/token/tokenSlice"
import { selectBrandToken, setBrandToken } from "../../features/brand_token/brandTokenSlice";
import { selectUserEmail, setUserEmail } from "../../features/user/userActiveEmail";


const navigation = {
	pages: [
		{ name: "Home", href: "/" },
		{ name: "About", href: "/about" },
		{ name: "Brands", href: "/brands" },
		{ name: "Shop", href: "/products" },
		{ name: "Start a brand", href: "/brands/register" },
		{ name: "Blog", href: "/blog" },
	],

	categories: [
		{
			id: "women",
			name: "Women",
			featured: [
				{
					name: "New Arrivals",
					href: "/products?q=New Merchandise&g=women",
					imageSrc:
						"https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg",
					imageAlt:
						"Models sitting back to back, wearing Basic Tee in black and bone.",
				},
				{
					name: "Basic Tees",
					href: "/products?q=T-shirts&g=women",

					imageSrc:
						"https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg",
					imageAlt:
						"Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.",
				},
			],
			sections: [
				{
					id: "clothing",
					name: "Clothing",
					items: [
						{ name: "Tops", href: "/products?q=Tops&g=women" },
						{ name: "Dresses", href: "/products?q=Dresses&g=women" },
						{ name: "Pants", href: "/products?q=Pants&g=women" },
						{ name: "Denim", href: "/products?q=Denim&g=women" },
						{ name: "Sweaters", href: "/products?q=Sweatshirts&g=women" },
						{ name: "T-Shirts", href: "/products?q=T-shirts&g=women" },
						{ name: "Jackets", href: "/products?q=Jackets&g=women" },
						{ name: "Hoodies", href: "/products?q=Hoodies&g=women" },
						{ name: "Masks", href: "/products?q=Masks&g=women" },
						{ name: "Browse All", href: "/products?g=women" },
					],
				},
				{
					id: "accessories",
					name: "Accessories",
					items: [
						{ name: "Watches", href: "/products?q=Watches&g=women" },
				
						{ name: "Bags", href: "/products?q=Bags&g=women" },
						{ name: "Sunglasses", href: "/products?q=Shades&g=women" },
						{ name: "Hats", href: "/products?q=Hats&g=women" },
						{ name: "Pendants", href: "/products?q=Pendants&g=women" },
						{ name: "Piercings & Studs", href: "/products?q=Piercings & Studs&g=women" },
						{ name: "Belts", href: "/products?q=Belts&g=women" },
				
					],
				},
			],
		},
		{
			id: "men",
			name: "Men",
			featured: [
				{
					name: "New Arrivals",
					href: "/products?q=New Merchandise&g=men",
					imageSrc:
						"https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg",
					imageAlt:
						"Drawstring top with elastic loop closure and textured interior padding.",
				},
				{
					name: "Artwork Tees",
					href: "/products?q=T-shirts&g=men",
					imageSrc:
						"https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg",
					imageAlt:
						"Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.",
				},
			],
			sections: [
				{
					id: "clothing",
					name: "Clothing",
					items: [
						{ name: "Tops", href: "/products?q=Tops&g=men" },
						
						{ name: "Pants", href: "/products?q=Pants&g=men" },
						{ name: "Denim", href: "/products?q=Denim&g=men" },
						{ name: "Sweaters", href: "/products?q=Sweatshirts&g=men" },
						{ name: "T-Shirts", href: "/products?q=T-shirts&g=men" },
						{ name: "Jackets", href: "/products?q=Jackets&g=men" },
						{ name: "Hoodies", href: "/products?q=Hoodies&g=men" },
						{ name: "Masks", href: "/products?q=Masks&g=men" },
						{ name: "Browse All", href: "/products?g=men" },
					],
				},
				{
					id: "accessories",
					name: "Accessories",
					items: [
						{ name: "Watches", href: "/products?q=Watches&g=men" },
				
						{ name: "Bags", href: "/products?q=Bags&g=men" },
						{ name: "Sunglasses", href: "/products?q=Shades&g=men" },
						{ name: "Hats", href: "/products?q=Hats&g=men" },
						{ name: "Pendants", href: "/products?q=Pendants&g=men" },
						{ name: "Piercings & Studs", href: "/products?q=Piercings & Studs&g=men" },
						{ name: "Belts", href: "/products?q=Belts&g=men" },
				
					],
				},
			],
		},
	],
};

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export default function HeaderNav() {
	const cartCount = useSelector(selectCartCount);
	const [open, setOpen] = useState(false);
	const user = useSelector(selectUser);
	const user_email = useSelector(selectUserEmail);
	const token = useSelector(selectToken);
	const brand_token = useSelector(selectBrandToken);
	const [decodedToken, setDecodedToken] = useState("")
	const [userType, setUserType] = useState("")
	const isBrand = useSelector(selectUserType) == USER_TYPES.brand
	

	const dispatch = useDispatch();

	useEffect(()=>{
		if(user !== null){
			console.log("User: ", user[0])
			if(token !== null){
			const arrayToken = token.split('.');
			const tokenPayload = JSON.parse(atob(arrayToken[1]));	
			console.log("Token Payload ID: ", tokenPayload?.user_id);
			const url = `https://altclan-api.onrender.com/api/users/${tokenPayload?.user_id}`
			if(user?.[0].hasOwnProperty("brand_name")){
				console.log("User is a brand")
			}
			console.log("isbrand", isBrand)

			if(isBrand == USER_TYPES.brand){
				setUserType("brand")
			}else{
				setUserType("user")
			}
			setDecodedToken(tokenPayload);
			
			}
	
		} 
	}, [user, token])


	console.log("Decoded Token: ", decodedToken)
	console.log("IB", isBrand)
	console.log("User Type: ", userType)
	async function logout() {
		try {
		
			document.cookie = ""

			dispatch(setToken(null))
			dispatch(setBrandToken(null))
			dispatch(setUserEmail(null))
			dispatch(setUser(null));
			dispatch(setBrandUser(null));
			setDecodedToken("")
		
		
			
			
		} catch (error) {
			console.log(error);
		}
	}


	return (
		<div style={{fontFamily:'Poppins, Sans-serif', color:"black", lineHeight:'100%', letterSpacing:2}} className="sticky top-0 z-50 bg-white text-black">
			{/* Mobile menu */}
			<Transition.Root show={open} as={Fragment}>
				<Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
					<Transition.Child
						as={Fragment}
						enter="transition-opacity ease-linear duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="transition-opacity ease-linear duration-300"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black bg-opacity-25" />
					</Transition.Child>

					<div className="fixed inset-0 z-50 flex">
						<Transition.Child
							as={Fragment}
							enter="transition ease-in-out duration-300 transform"
							enterFrom="-translate-x-full"
							enterTo="translate-x-0"
							leave="transition ease-in-out duration-300 transform"
							leaveFrom="translate-x-0"
							leaveTo="-translate-x-full"
						>
							<Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
								<div className="flex px-4 pb-2 pt-5">
									<button
										type="button"
										className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
										onClick={() => setOpen(false)}
									>
										<span className="sr-only">Close menu</span>
										<XMarkIcon className="h-6 w-6" aria-hidden="true" />
									</button>
								</div>

								{/* Links */}
								<Tab.Group as="div" className="mt-2">
									<div className=" space-y-6 border-t border-gray-200 px-4 py-6">
										<div className="flow-root">
											<Link
												href="/"
												className="-m-2 block p-2 font-medium text-gray-900"
											></Link>
										</div>

										<div className="flow-root">
											<div className="  space-y-6 ">
												{navigation.pages.map((page) => (
													<div key={page.name} className="flow-root">
														<a
															href={page.href}
															className="-m-2 block p-2 font-medium text-gray-900"
														>
															{page.name}
														</a>
													</div>
												))}
											</div>
										</div>
									</div>
									<div className="border-b border-gray-200">
										<Tab.List className="-mb-px flex space-x-8 px-4">
											{navigation.categories.map((category) => (
												<Tab
													key={category.name}
													className={({ selected }) =>
														classNames(
															selected
																? "border-indigo-600 text-indigo-600"
																: "border-transparent text-gray-900",
															"flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium"
														)
													}
												>
													{category.name}
												</Tab>
											))}
										</Tab.List>
									</div>
									<Tab.Panels as={Fragment}>
										{navigation.categories.map((category) => (
											<Tab.Panel
												key={category.name}
												className="space-y-10 px-4 pb-8 pt-10"
											>
												<div className="grid grid-cols-2 gap-x-4">
													{category.featured.map((item) => (
														<div
															key={item.name}
															className="group relative text-sm"
														>
															<div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
																<img
																	src={item.imageSrc}
																	alt={item.imageAlt}
																	className="object-cover object-center"
																/>
															</div>
															<Link
																href={item.href}
																className="mt-6 block font-medium text-gray-900"
															>
																<span
																	className="absolute inset-0 z-10"
																	aria-hidden="true"
																/>
																{item.name}
															</Link>
															<p aria-hidden="true" className="mt-1">
																Shop now
															</p>
														</div>
													))}
												</div>
												{category.sections.map((section) => (
													<div key={section.name}>
														<p
															id={`${category.id}-${section.id}-heading-mobile`}
															className="font-medium text-black"
														>
															{section.name}
														</p>
														<ul
															role="list"
															aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
															className="mt-6 flex flex-col space-y-6"
														>
															{section.items.map((item) => (
																<li key={item.name} className="flow-root">
																	<a
																		href={item.href}
																		className="-m-2 block p-2 text-gray-500"
																	>
																		{item.name}
																	</a>
																</li>
															))}
														</ul>
													</div>
												))}
											</Tab.Panel>
										))}
									</Tab.Panels>
								</Tab.Group>

								{/**  <div className="border-t border-gray-200 px-4 py-6">
									<Link href="#" className="-m-2 flex items-center p-2">
										<img
											src="https://tailwindui.com/img/flags/flag-nigeria.svg"
											alt=""
											className="block h-auto w-5 flex-shrink-0"
										/>
										<span className="ml-3 block text-base font-medium text-gray-900">
											NGN
										</span>
										<span className="sr-only">, change currency</span>
									</Link>
								</div> */}
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition.Root>

			<header className="relative bg-white">
				<p className="flex h-10 items-center justify-center bg-black px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
					Get free delivery on orders over ₦30,000
				</p>

				<nav
					aria-label="Top"
					className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
				>
					<div className="border-b border-gray-200">
						<div className="flex h-16 items-center">
							<button
								type="button"
								className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
								onClick={() => setOpen(true)}
							>
								<span className="sr-only">Open menu</span>
								<Bars3Icon className="h-6 w-6" aria-hidden="true" />
							</button>

							{/* Logo */}
							<div className="ml-4 flex lg:ml-0">
								<Link href="/">
									<span className="sr-only">Altclan</span>
									<b className=""> ALTCLAN</b>
								</Link>
							</div>

							{/* Flyout menus */}
							<Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
								<div className="flex h-full space-x-8">
									{navigation.categories.map((category) => (
										<Popover key={category.name} className="flex">
											{({ open }) => (
												<>
													<div className="relative flex ">
														<Popover.Button
															className={classNames(
																open
																	? "border-indigo-600 text-indigo-600 outline-none"
																	: "border-transparent text-gray-700 outline-none hover:text-gray-800",
																"relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out"
															)}
														>
															{category.name}
														</Popover.Button>
													</div>

													<Transition
														as={Fragment}
														enter="transition ease-out duration-200"
														enterFrom="opacity-0"
														enterTo="opacity-100"
														leave="transition ease-in duration-150"
														leaveFrom="opacity-100"
														leaveTo="opacity-0"
													>
														<Popover.Panel className="absolute inset-x-0 top-full text-sm text-gray-500">
															{/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
															<div
																className="absolute inset-0 top-1/2 bg-white shadow"
																aria-hidden="true"
															/>

															<div className="relative z-[5] bg-white">
																<div className="mx-auto max-w-7xl px-8">
																	<div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
																		<div className="col-start-2 grid grid-cols-2 gap-x-8">
																			{category.featured.map((item) => (
																				<div
																					key={item.name}
																					className="group relative text-base sm:text-sm"
																				>
																					<div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
																						<img
																							src={item.imageSrc}
																							alt={item.imageAlt}
																							className="object-cover object-center"
																						/>
																					</div>
																					<Link
																						href={item.href}
																						className="mt-6 block font-medium text-gray-900"
																					>
																						<span
																							className="absolute inset-0 z-10"
																							aria-hidden="true"
																						/>
																						{item.name}
																					</Link>
																					<p
																						aria-hidden="true"
																						className="mt-1"
																					>
																						Shop now
																					</p>
																				</div>
																			))}
																		</div>
																		<div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
																			{category.sections.map((section) => (
																				<div key={section.name}>
																					<p
																						id={`${section.name}-heading`}
																						className="font-medium text-gray-900"
																					>
																						{section.name}
																					</p>
																					<ul
																						role="list"
																						aria-labelledby={`${section.name}-heading`}
																						className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
																					>
																						{section.items.map((item) => (
																							<li
																								key={item.name}
																								className="flex"
																							>
																								<a
																									href={item.href}
																									className="hover:text-gray-800"
																								>
																									{item.name}
																								</a>
																							</li>
																						))}
																					</ul>
																				</div>
																			))}
																		</div>
																	</div>
																</div>
															</div>
														</Popover.Panel>
													</Transition>
												</>
											)}
										</Popover>
									))}

									{navigation.pages.map((page) => (
										<a
											key={page.name}
											href={page.href}
											className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
										>
											{page.name}
										</a>
									))}

								</div>
							</Popover.Group>

							<div className="ml-auto flex items-center">
								<div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
									{user === null ? (
										<>
											<Link
												href="/login"
												className="text-sm font-medium text-gray-700 hover:text-gray-800"
											>
												Login
											</Link>
											<span
												className="h-6 w-px bg-gray-200"
												aria-hidden="true"
											/>
											<Link
												href="/signup"
												className="text-sm font-medium text-gray-700 hover:text-gray-800"
											>
												Sign Up
											</Link>
										</>
									) : (
										<>
											<Link
												className="text-sm font-bold text-gray-700 hover:text-gray-800"
												href={`${user[0]?.id !== null && user?.[0].hasOwnProperty("brand_name") ? `/brands/profile/${user[0]?.brand_name}`: "/profile/" + user?.[0]?.id}`}
											>
												Profile
											</Link>
											<span
												className="h-6 w-px bg-gray-200"
												aria-hidden="true"
											/>
											<button
												onClick={logout}
												className="text-sm font-bold text-red-400 hover:text-red-600"
											>
												Logout
											</button>
										</>
									)}
								</div>


								{/* <div className="hidden lg:ml-8 lg:flex">
									<Link
										href="#"
										className="flex items-center text-gray-700 hover:text-gray-800"
									>
										<img
											src="/flag.jpg"
											alt=""
											className="block h-auto w-5 flex-shrink-0"
										/>
										<span className="ml-3 block text-sm font-medium">NGN</span>
										<span className="sr-only">, change currency</span>
									</Link>
								</div>*/}

								{/* Search */}
								<div className="flex lg:ml-6">
									<Link href="/search">
										<div className="p-2 text-gray-400 hover:text-gray-500">
											<span className="sr-only">Search</span>
											<MagnifyingGlassIcon
												className="h-6 w-6"
												aria-hidden="true"
											/>
										</div>
									</Link>
								</div>


								{/* Profile dropdown */}
								<Menu as="div" className="relative ml-3">
									<div>
										<Menu.Button className="relative lg:hidden flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
											<span className="absolute -inset-1.5" />
											<span className="sr-only">Open user menu</span>
											<img
												className="h-8 w-8 rounded-full"
												src="/img/profile.jpg"
												alt=""
											/>
										</Menu.Button>
									</div>
									<Transition
										as={Fragment}
										enter="transition ease-out duration-100"
										enterFrom="transform opacity-0 scale-95"
										enterTo="transform opacity-100 scale-100"
										leave="transition ease-in duration-75"
										leaveFrom="transform opacity-100 scale-100"
										leaveTo="transform opacity-0 scale-95"
									>
										<Menu.Items className={`absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${style.headerscroll}`}>
											{user === null ?
												<Menu.Item>
													{({ active }) => (
														<Link
															href="/signup"
															className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
														>
															Sign up
														</Link>


													)}
												</Menu.Item> :
												<Menu.Item>
													{({ active }) => (
														<Link
															href={`${user[0]?.id !== null && user[0].hasOwnProperty("brand_name")  ? `/brands/profile/${user[0]?.brand_name}`: "/profile/" + user[0]?.id}`}
															className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
														>
															Profile
														</Link>
														


													)}
													
												</Menu.Item>

											}

											{user === null ? <Menu.Item>
												{({ active }) => (
													<Link
														href="/login"
														className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
													>
														Log in
													</Link>
												)}
											</Menu.Item> :
											
												<Menu.Item>
													{({ active }) => (
														<Link
															href=""
															onClick={logout}
															className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-red')}
														>
															Logout
														</Link>
													)}
												</Menu.Item>}


										</Menu.Items>
									</Transition>
								</Menu>


								{/* Cart */}
								<div className="ml-4 flow-root lg:ml-6">
									<Link
										href="/cart"
										data-modal-target="defaultModal"
										data-modal-toggle="defaultModal"
										className="group -m-2 flex items-center p-2"
									>
									
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
</svg>
										
										<span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
											{cartCount}
										</span>
										<span className="sr-only">items in cart, view bag</span>
									</Link>

								 
								</div>


							</div>
						</div>
					</div>
				</nav>
			</header>
		</div>
	);
}
