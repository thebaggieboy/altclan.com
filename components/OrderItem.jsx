import { useDispatch } from "react-redux";
import { removeItem, updateItemQuantity } from "../features/shop/shopSlice";
import { useState } from "react";

const OrderItem = ({ data }) => {
	const dispatch = useDispatch();
	const { display_image, merchandise_name, category, price, cartId, color, size, qty } =
		data;

	

	const [itemQty, setItemQty] = useState(qty);

	return (
		

<section key={cartId}>
<div className="flex flex-col rounded-lg bg-white sm:flex-row">
    <img className="m-2 h-24 w-28 rounded-md border object-cover object-center" src={display_image} alt="" />
    <div className="flex w-full flex-col px-4 py-4">
      <span className="font-semibold">{merchandise_name}</span>
      <span className="float-right text-gray-400">{category}</span>
      <p className="text-lg font-bold">₦{price.toLocaleString()} x {itemQty}</p>
    </div>
  </div>

</section>
	);
};

export default OrderItem;
