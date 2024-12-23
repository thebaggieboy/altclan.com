import { useDispatch } from "react-redux";
import { removeItem, updateItemQuantity } from "../features/shop/shopSlice";
import { useState } from "react";

const CartItem = ({ data }) => {
	const dispatch = useDispatch();
	const { display_image, merchandise_name, category, price, cartId,color, size, qty } = data;

	function removeFromCart(id) {
		dispatch(removeItem(id));
	}

	const [itemQty, setItemQty] = useState(qty);

	function incrementQty() {
		setItemQty((prevValue) => {
			dispatch(updateItemQuantity({ id: cartId, value: prevValue + 1 }));
			return prevValue + 1;
		});
	}

	function decrementQty() {
		setItemQty((prevValue) => {
			if (prevValue > 1) {
				dispatch(updateItemQuantity({ id: cartId, value: prevValue - 1 }));
				return prevValue - 1;
			}
            return prevValue
		});
	}

	return (
		<ul key={cartId} className="-my-8">
			<li className="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0">
				<div className="shrink-0">
					<img
						className="h-24 w-24 max-w-full rounded-lg object-cover"
						src={display_image}
						alt=""
					/>
				</div>

				<div className="relative flex flex-1 flex-col justify-between">
					<div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
						<div className="pr-8 sm:pr-5">
							<p className="text-base font-semibold text-gray-900">
								{merchandise_name}
							</p>
							<p className="mx-0 mb-0 mt-1 text-sm text-gray-600">
								Color: {color}
							</p>
							<p className="mx-0 mb-0 mt-1 text-sm text-gray-600">
								Size: {size}
							</p>
						</div>

						<div className="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
							<p className="w-20 shrink-0 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">
								₦{price?.toLocaleString()}
							</p>

							<div className="sm:order-1">
								<div className="mx-auto flex h-8 items-stretch text-gray-600">
									<button
										onClick={decrementQty}
										className="flex items-center justify-center rounded-l-md bg-gray-200 px-4 transition hover:bg-black hover:text-white"
									>
										-
									</button>
									<div className="flex w-full items-center justify-center bg-gray-100 px-4 text-xs uppercase transition">
										{itemQty}
									</div>
									<button
										onClick={incrementQty}
										className="flex items-center justify-center rounded-r-md bg-gray-200 px-4 transition hover:bg-black hover:text-white"
									>
										+
									</button>
								</div>
							</div>
						</div>
					</div>

					<div className="absolute right-0 top-0 flex sm:bottom-0 sm:top-auto">
						<button
							onClick={() => removeFromCart({ id: cartId })}
							type="button"
							className="flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out hover:text-gray-900 focus:shadow"
						>
							<svg
								className="h-5 w-5"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M6 18L18 6M6 6l12 12"
									className=""
								></path>
							</svg>
						</button>
					</div>
				</div>
			</li>
		</ul>
	);
};

export default CartItem;
