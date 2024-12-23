import { useState } from "react";
import Image from "next/image";
import { FiExternalLink, FiHeart } from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux';
import { USER_TYPES, selectUser, selectUserType } from './../../features/user/userSlice';

import Link from "next/link";

const ProductCard = ({ data }) => {
	const [liked, setLiked] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');
	const [searchResult, setSearchResult] = useState([]);
	const [wishList, setWishList] = useState([]);
	const user = useSelector(selectUser)

	const addToWishList = async(item)=>{

		// To get wishlist filter out all wishlist with a particular username
		console.log(item)
		console.log("Adding item to wishlist")
	}
	const getWishList = async()=>{
		console.log("Getting orders from api")
		const wishListUrl = await fetch("https://altclan-api-v1.onrender.com/api/wishlist/")
		const data = await wishListUrl.json()
		const wishListResult = data?.filter((product) => product.user_email.toLowerCase().includes(user?.email.toLowerCase()) );
		setWishList(wishListResult)
		console.log("Wish list State: ", wishList)
	}

	

	const { merchandise_name, price, display_image, id } = data;

	return (
		<div className="product-card">
			<div className="product-card__img relative">
				<Image src={display_image} fill alt={merchandise_name} />
			</div>
			<div className="product-card__content">
				<div className="product-card__info">
					<h1 className="product-card__name">{merchandise_name}</h1>
					<p className="product-card__price">₦ {price}</p>
				</div>
				<div className="product-card__actions flex flex-col items-center justify-between gap-y-3">
					<button
						onClick={() => setLiked(!liked)}
						className="product-card__like"
					>
						<FiHeart
							className={`heart-svg lg:h-5 lg:w-5 ${
								liked ? "fill-red-600 stroke-none" : ""
							}`}
						/>
					</button>
					<Link href={"/products/" + id}>
						<button className="product-card__see-more">
							<FiExternalLink className="lg:h-5 lg:w-5" />
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default ProductCard;
