import React, { useEffect, useState } from "react";
import CarouselWrapper from "./CarouselWrapper";
import ProductCard from "./product-card/ProductCard";
import useBrands from '../hooks/useBrands'
import useMerch from "../hooks/useMerch";

export default function TrendingMerch() {
	const brands = [1, 2, 3, 4];
	const products = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	const [trendingMerch, setTrendingMerch] = useState(null)
	const carouselBreakpoints = {
		640: {
			slidesPerView: 3,
			spaceBetween: 20,
		},
		1024: {
			slidesPerView: 4,
			spaceBetween: 30,
		},
	};

	async function getMerch(
	
	
	) {
		const  url = "https://altclan-brands-api-1-1.onrender.com/api/merchandises/"
		const res =   await fetch(url, {
			method: "GET",
			headers: {
			
				"Content-Type": "application/json"
			},
		})
	
		const data =  await res?.json()
	
		if(trendingMerch == null){
			setTrendingMerch(data)
		}
		
	}
	//const { data, isLoading, error } = useMerch("https://altclan-brands-api-1-1-1.onrender.com/api/merchandises/")
	console.log("Trending merch: ", trendingMerch)

	
getMerch()
	const num = 2;
	num.toLocaleString();

	
	return (
		<>
			<div className="p-5 pt-5 mt-5">
				<h4 className="text-center text-2xl capitalize">
					Trending Merchandise
				</h4>
				<br />
				<CarouselWrapper
					slidesPerView={2}
					spaceBetween={10}
					breakpoints={carouselBreakpoints}
					controls
				>
					{trendingMerch?.map((d, i) => {
						if (i <= 10) {
							return <ProductCard key={d.id} data={d} />;
						}
					})}
				</CarouselWrapper>
			</div>

			
		</>
	);
}
