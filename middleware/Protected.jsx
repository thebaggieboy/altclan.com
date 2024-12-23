import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/user/userSlice";
import { useRouter } from "next/router";

const Protected = (Component) => {
	const user = null
	const brand_user = null	
	const router = useRouter();

	if (user === null) {
		router.push("/accounts/signup");
		return;
	}

	if (brand_user === null) {
		router.push("/brands/register/");
		return;
	}

	return (
		<>
			<Component />
		</>
	);
};

export default Protected;
