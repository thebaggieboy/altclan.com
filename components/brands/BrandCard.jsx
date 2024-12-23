import { useState } from "react";
import Image from "next/image";
import { FiExternalLink, FiHeart } from "react-icons/fi";

import Link from "next/link";

const BrandCard = ({ data }) => {
	const [liked, setLiked] = useState(false);
	

	const { brand_name, brand_logo, brand_type, id } = data;

	return (
		<div className="product-card">
			<div className="product-card__img relative">
				<Image src={brand_logo} fill alt={brand_name} />
			</div>
			<div className="product-card__content">
				<div className="product-card__info">
					<h1 className="product-card__name">{brand_name}</h1>
                    <p style={{fontSize:12, fontFamily:"poppins"}}> {brand_type}</p>
					
				</div>
			
			</div>
		</div>
	);
};

export default BrandCard;
