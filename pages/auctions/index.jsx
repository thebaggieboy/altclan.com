import { Fragment, useContext, useEffect, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
	ChevronDownIcon,
	FunnelIcon,
	MinusIcon,
	PlusIcon,
	Squares2X2Icon,
} from "@heroicons/react/20/solid";
import useMerch from "../../hooks/useMerch";
import { CartContext } from "../../context/CartContext";
import { ProductContext } from "../../context/ProductContext";
import Link from "next/link";
import Head from "next/head"
import { useSearchParams } from 'next/navigation'
import useAuction from "../../hooks/useAuction";


const sortOptions = [
	{ name: "Most Popular", href: "#", current: true },
	{ name: "Best Rating", href: "#", current: false },
	{ name: "Newest", href: "#", current: false },
	{ name: "Price: Low to High", href: "#", current: false },
	{ name: "Price: High to Low", href: "#", current: false },
];
const subCategories = [
	{ name: "Top listings", href: "/products?q=New Merchandise" },
	{ name: "", href: "/brands" },
	
	
];
const filters = [
	{
		id: "color",
		name: "Color",
		options: [
			{ value: "white", label: "White", checked: false },
			{ value: "beige", label: "Beige", checked: false },
			{ value: "blue", label: "Blue", checked: true },
			{ value: "brown", label: "Brown", checked: false },
			{ value: "green", label: "Green", checked: false },
			{ value: "purple", label: "Purple", checked: false },
		],
	},
	{
		id: "category",
		name: "Category",
		options: [
			{ value: "new-arrivals", label: "New Arrivals", checked: false },
			{ value: "sale", label: "Sale", checked: false },
			{ value: "travel", label: "Travel", checked: true },
			{ value: "organization", label: "Organization", checked: false },
			{ value: "accessories", label: "Accessories", checked: false },
		],
	},
	{
		id: "size",
		name: "Size",
		options: [
			{ value: "2l", label: "2L", checked: false },
			{ value: "6l", label: "6L", checked: false },
			{ value: "12l", label: "12L", checked: false },
			{ value: "18l", label: "18L", checked: false },
			{ value: "20l", label: "20L", checked: false },
			{ value: "40l", label: "40L", checked: true },
		],
	},
];

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export default function Products({ _id, merchandise_name, price, picture }) {
	// const { data, loading, error } = useBrands('http://127.0.0.1:8000/api/merchandises/');
	const { data, isLoading, error } = useMerch("https://altclan-brands-api.onrender.com/api/merchandises/");
	//const { data, isLoading, error } = useAuction("https://altclan-brands-api.onrender.com/api/auctions/");
	const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
	const { cart, addToCart } = useContext(CartContext);
	const { selectedProducts, setSelectedProducts } = useContext(ProductContext);
	const [searchQuery, setSearchQuery] = useState('');
	const [genderQuery, setGenderQuery] = useState('');
	const searchParams = useSearchParams();
	const search = searchParams.get('q')
	const gender = searchParams.get('g')

	
	useEffect(() => {
		if (searchQuery != null){
		setSearchQuery(search)
	    setGenderQuery(search)
		console.log("Search params: " + searchQuery)
		console.log("Gender params: " + genderQuery)

        const labelResults = data?.filter((product) => product.labels.toLowerCase().includes(searchQuery.toLowerCase()) );
		  const merchandiseTypeResult = data?.filter((product) => product.merchandise_type.toLowerCase().includes(genderQuery.toLowerCase()) );
		  console.log("Label Results: ", labelResults)
		  console.log("Product Type Results: ", merchandiseTypeResult)
		  //console.log("Search Results for ", search)
		}
		  
		
	  }, [search, searchQuery, data]);

	if (isLoading) {
		return (
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
		);
	}

	if (error) {
		return <p>Error {error.message}</p>;
	}
	

	return (
		<>
		<Head>
       <title>Auctions - Start Shopping </title>
            <meta charset="UTF-8" />
            <meta
              name="description"
              content="You can start to shop and explore between different brands, their exclusive deals and amazing creative products."
            />
              <meta name="keywords"
                    content="altclan, altclan login, login, fashion, community, aesthetics, enigmas, arts, merchandises,  clothing, rings, accessories" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/alteclan_logo.jpg" />
       </Head> 
		<div className="bg-white">
			<div>
				{/* Mobile filter dialog */}
				<Transition.Root show={mobileFiltersOpen} as={Fragment}>
					<Dialog
						as="div"
						className="relative z-40 lg:hidden"
						onClose={setMobileFiltersOpen}
					>
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

						<div className="fixed inset-0 z-40 flex">
							<Transition.Child
								as={Fragment}
								enter="transition ease-in-out duration-300 transform"
								enterFrom="translate-x-full"
								enterTo="translate-x-0"
								leave="transition ease-in-out duration-300 transform"
								leaveFrom="translate-x-0"
								leaveTo="translate-x-full"
							>
								<Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
									<div className="flex items-center justify-between px-4">
										<h2 className="text-lg font-medium text-gray-900">
											Filters
										</h2>
										<button
											type="button"
											className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
											onClick={() => setMobileFiltersOpen(false)}
										>
											<span className="sr-only">Close menu</span>
											<XMarkIcon className="h-6 w-6" aria-hidden="true" />
										</button>
									</div>

									{/* Filters */}
									<form className="mt-4 border-t border-gray-200">
										<h3 className="sr-only">Categories</h3>
										<ul
											role="list"
											className="px-2 py-5 mt-5 font-medium text-gray-900"
										>
											{subCategories.map((category) => (
												<li key={category.name}>
													<Link href={category.href} className="block px-2 py-3">
														{category.name}
													</Link>
												</li>
											))}
										</ul>

										{filters.map((section) => (
											<Disclosure
												as="div"
												key={section.id}
												className="border-t border-gray-200 px-4 py-6"
											>
												{({ open }) => (
													<>
														<h3 className="-mx-2 -my-3 flow-root">
															<Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
																<span className="font-medium text-gray-900">
																	{section.name}
																</span>
																<span className="ml-6 flex items-center">
																	{open ? (
																		<MinusIcon
																			className="h-5 w-5"
																			aria-hidden="true"
																		/>
																	) : (
																		<PlusIcon
																			className="h-5 w-5"
																			aria-hidden="true"
																		/>
																	)}
																</span>
															</Disclosure.Button>
														</h3>
														<Disclosure.Panel className="pt-6">
															<div className="space-y-6">
																{section.options.map((option, optionIdx) => (
																	<div
																		key={option.value}
																		className="flex items-center"
																	>
																		<input
																			id={`filter-mobile-${section.id}-${optionIdx}`}
																			name={`${section.id}[]`}
																			defaultValue={option.value}
																			type="checkbox"
																			defaultChecked={option.checked}
																			className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
																		/>
																		<label
																			htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
																			className="ml-3 min-w-0 flex-1 text-gray-500"
																		>
																			{option.label}
																		</label>
																	</div>
																))}
															</div>
														</Disclosure.Panel>
													</>
												)}
											</Disclosure>
										))}
									</form>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</Dialog>
				</Transition.Root>

				<main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="flex items-baseline justify-between border-b border-gray-200 pb-6">
						<div className="p-1 ml-3">
						
						</div>
						<div className="flex items-center mt-3 ">
							<Menu as="div" className="relative inline-block text-left">
								<div>
									<Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
										Sort
										<ChevronDownIcon
											className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
											aria-hidden="true"
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
									<Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
										<div className="py-1">
											{sortOptions.map((option) => (
												<Menu.Item key={option.name}>
													{({ active }) => (
														<a
															href={option.href}
															className={classNames(
																option.current
																	? "font-medium text-gray-900"
																	: "text-gray-500",
																active ? "bg-gray-100" : "",
																"block px-4 py-2 text-sm"
															)}
														>
															{option.name}
														</a>
													)}
												</Menu.Item>
											))}
										</div>
									</Menu.Items>
								</Transition>
							</Menu>

							<button
								type="button"
								className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
								onClick={() => setMobileFiltersOpen(true)}
							>
								<span className="sr-only">Filters</span>
								<FunnelIcon className="h-5 w-5" aria-hidden="true" />
							</button>
						</div>
					</div>

					<section aria-labelledby="products-heading" className=" pb-24">
						<h2 id="products-heading" className="sr-only">
							Products
						</h2>

						<div className="grid grid-cols-1 gap-x-8 gap-y-4 lg:grid-cols-4">
							{/* Filters */}
							<form className="hidden lg:block">
								<h3 className="sr-only">Categories</h3>
								<ul
									role="list"
									className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900"
								>
									{subCategories.map((category) => (
										<li className="mt-3" key={category.name}>
											<Link href={category.href}>{category.name}</Link>
										</li>
									))}
								</ul>

								{filters.map((section) => (
									<Disclosure
										as="div"
										key={section.id}
										className="border-b border-gray-200 py-6"
									>
										{({ open }) => (
											<>
												<h3 className="-my-3 flow-root">
													<Disclosure.Button className="flex w-full items-center justify-between bg-white py-1 text-sm text-gray-400 hover:text-gray-500">
														<span className="font-medium text-gray-900">
															{section.name}
														</span>
														<span className="ml-6 flex items-center">
															{open ? (
																<MinusIcon
																	className="h-5 w-5"
																	aria-hidden="true"
																/>
															) : (
																<PlusIcon
																	className="h-5 w-5"
																	aria-hidden="true"
																/>
															)}
														</span>
													</Disclosure.Button>
												</h3>
												<Disclosure.Panel className="pt-2">
													<div className="space-y-4">
														{section.options.map((option, optionIdx) => (
															<div
																key={option.value}
																className="flex items-center"
															>
																<input
																	id={`filter-${section.id}-${optionIdx}`}
																	name={`${section.id}[]`}
																	defaultValue={option.value}
																	type="checkbox"
																	defaultChecked={option.checked}
																	className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
																/>
																<label
																	htmlFor={`filter-${section.id}-${optionIdx}`}
																	className="ml-3 text-sm text-gray-600"
																>
																	{option.label}
																</label>
															</div>
														))}
													</div>
												</Disclosure.Panel>
											</>
										)}
									</Disclosure>
								))}
							</form>

							{/* Product grid */}
							<div className="lg:col-span-3">
								<div className="mx-auto max-w-2xl  px-4 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8">
									<div className=" grid grid-cols-1 gap-x-6 gap-y-10  lg:grid-cols-2 xl:gap-x-8">
										{data?.map(
											({
												id,
												display_image,
												imageAlt,
												brand_name,
												merchandise_name,
												merchandise_type,
												labels,
												price,
											}) => (
												<div key={id} class="flex flex-col justify-center items-center">
												<div class="!z-5 relative flex flex-col rounded-[20px] max-w-[300px] bg-white bg-clip-border shadow-3xl shadow-shadow-500 flex flex-col w-full !p-4 3xl:p-![18px] bg-white undefined">
													<div class="h-full w-full">
														<div class="relative w-full">
															<img src={display_image} class="mb-3 h-full w-full rounded-xl 3xl:h-full 3xl:w-full" alt=""/>
															<button class="absolute top-3 right-3 flex items-center justify-center rounded-full bg-white p-2 text-brand-500 hover:cursor-pointer">
																<div class="flex h-full w-full items-center justify-center rounded-full text-xl hover:bg-gray-50">
																	<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M352.92 80C288 80 256 144 256 144s-32-64-96.92-64c-52.76 0-94.54 44.14-95.08 96.81-1.1 109.33 86.73 187.08 183 252.42a16 16 0 0018 0c96.26-65.34 184.09-143.09 183-252.42-.54-52.67-42.32-96.81-95.08-96.81z"></path></svg>
																</div>
															</button>
														</div>
														<div class="mb-3 flex items-center justify-between px-1 md:items-start">
															<div class="mb-2">
																<p class="text-lg font-bold text-navy-700"> {merchandise_name} </p>
																<p class="mt-1 text-sm font-medium text-gray-600 md:mt-2">By {brand_name} </p>

															</div>
															<div class="flex flex-row-reverse md:mt-2 lg:mt-0">

																{/* 
																	<span class="z-0 ml-px inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#E0E5F2] text-xs text-navy-700 ">+5</span><span class="z-10 -mr-3 h-8 w-8 rounded-full border-2 border-white">
																	<img class="h-full w-full rounded-full object-cover" src="" alt=""/>
																</span>
																
																*/}  
																							
															</div>
														</div> <hr /> 
														<p class="mt-1 text-xs font-bold text-gray-500 md:mt-2">Auction ends in 9:00:20 </p>
														<div class="flex items-center justify-between md:items-center lg:justify-between ">
															
															<div class="flex">
																
																<p class="!mb-0 text-sm font-bold text-brand-500">Current Bid: 0.91 <span>ETH</span></p>
															</div>
															<button href="" class="linear rounded-[20px] bg-black px-4 py-2 text-base font-medium text-white transition duration-200">Place Bid</button>
														</div>
													</div>
												</div>
											   
											</div>
											)
										)}
									</div>
								</div>
							</div>
						</div>
					</section>
				</main>
			</div>
		</div>
		</>
	);
}
