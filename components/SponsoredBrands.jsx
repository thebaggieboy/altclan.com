import React from "react";
import { CartContext } from "../context/CartContext";
import { ProductContext } from "../context/ProductContext";
import Link from "next/link";
import styles from "./../styles/component5.module.css";
import CarouselWrapper from "./CarouselWrapper";
import ProductCard from "./product-card/ProductCard";
import BrandCard from "./BrandCard"
import useData from "./../hooks/useData"

const SponsoredBrands = () => {
	const { data, loading, error } = useData('https://altclan-brands-api.onrender.com/api/brand_users');



    
	if (loading) {

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

	return (
		<div>
			<h1 className="text-center text-3xl capitalize">Featured Brands</h1>
			<div className={styles.row}>
				{data?.map((product) => (
					<div key={product.id}>
						<Link href={"/brands/" + product.id}>
							<div className={styles.imageCol}>
								<div className={styles.card}>
									<img
										src={product.brand_logo}
										alt=""
										className={styles.productImage}
									/>

									<h1 className={styles.name}>{product.brand_name}</h1>

								
								</div>
							</div>
						</Link>
					</div>
				))}
			</div>
		</div>

		
	);
};

export default SponsoredBrands;
