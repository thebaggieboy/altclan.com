import React, {useState} from "react";
import CarouselWrapper from "./CarouselWrapper";
import ProductCard from "./product-card/ProductCard";
import useBrands from '../hooks/useBrands'
import BrandCard from "./BrandCard"
import useData from "./../hooks/useData"

export default function TrendingBrands() {
	const brands = [1, 2, 3, 4, 5];
	const products = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	const [trendingBrands, setTrendingBrands] = useState(null)
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

	//const { data, isLoading, error } = useBrands("https://altclan-brands-api-1-1.onrender.com/api/users/")
	async function getBrands(
	
	
	) {
		const  url = "https://altclan-brands-api-1-1.onrender.com/api/users/"
		const res =   await fetch(url, {
			method: "GET",
			headers: {
			
				"Content-Type": "application/json"
			},
		})
	
		const data =  await res?.json()
		setTrendingBrands(data)
		
		
	}
	
	console.log("Trending brands: ", trendingBrands)

	
getBrands()
	
	
	const num = 2;
	num.toLocaleString();

 
	return (
		<>
			<div className="p-5 pt-5 mt-3">
				<h4 className="text-center text-2xl capitalize">
					Trending Brands
				</h4>
				<br />
				<CarouselWrapper
					slidesPerView={2}
					spaceBetween={10}
					breakpoints={carouselBreakpoints}
					controls
				>
					{trendingBrands?.map((d, i) => {
						if (i <= 10) {
							return <BrandCard key={d.id} data={d} />;
						}
					})}
				</CarouselWrapper>
			</div>
		</>
	);
}
