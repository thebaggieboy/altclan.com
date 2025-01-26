import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styles from "../../styles/login.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUser } from "../../features/user/userSlice";

import Loader from "../../components/Loader";
import useLogin from "../../hooks/useLogin";

export function LoginError() {
	return (
		<div id="alert-2" class="flex items-center p-4 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
			<svg class="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
				<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
			</svg>
			<span class="sr-only">Info</span>
			<div class="ml-3 text-sm text-center font-medium">
				Email or password is incorrect.
			</div>

		</div>
	)
}

export default function ForgotPassword() {
	const dispatch = useDispatch();
	const user = useSelector(selectUser);
	const router = useRouter();
	const [formErr, setFormErr] = useState()

	if (user !== null) {
		router.push("/login");
	}



	const [formData, setFormData] = useState({
		email: "",
	})

	const inputChangeHandler = (e) => {
		const { name, value } = e.target
		setFormData((prevValue) => {
			return {
				...prevValue,
				[name]: value
			}
		})

	}

	console.log(error)


	async function resetPassword(){
		const res = await fetch(`https://altclan-brands-api-1-1.onrender.com/auth/users/reset_password/`, {
			method: "POST",
			headers: {

				"Content-Type": "application/json",
			},
			body: JSON.stringify({email:formData?.email}),
			
		})

		const data = await res.json()

		if (res.status >= 200 & res.status <= 209) {
		 console.log("User Password UPDATED")
        router.push(`/accounts/login`);

		}
		const error = { ...data }
		throw error

	
	}


	const submit = async (e) => {
		e.preventDefault();
		resetPassword()
		try {
			
		} catch (error) {
			console.log(error)
			setFormErr(error)
		}
	};


	return (
		<div className="">
			<div className={styles.loginContainer}>
				<div className={styles.columnImage}>
					<img
						src="/img/faith.jpg"
						alt=""
						className={styles.img}
					/>
				</div>

				<div className={styles.columnText}>
					<form className={styles.form} onSubmit={submit}>
						<Link href="#" className={styles.head}>
							<img
								className={styles.logo}
								src="/alteclan_logo.jpg"
								alt="logo"
							/>
							{/* Altclan     */}
						</Link>

						<h1 className={styles.greeting}>Reset password</h1>
						<p className={styles.login}>Enter your email to receive the link</p>


						<div className="">
							{/* <label for="email" className="block mb-2 text-sm font-medium text-black">Your email</label> */}
							{error !== null && (
								<div id="alert-2" class="flex items-center p-4 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
								<svg class="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
									<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
								</svg>
								<span class="sr-only">Info</span>
								<div class="ml-3 text-sm text-center font-medium">
									{formErr.non_field_errors}
								</div>
					
							</div>
							)}
							<label for="email" className={styles.label}>Email</label>
							<input
								type="email"
								onChange={inputChangeHandler}
								name="password1"
								id="password1"
								className={styles.input}
								placeholder=""
								required
							/>
						</div>
					

						<div></div>

						<button disabled={isPending} type="submit" className={styles.submit}>
							{
								isPending ? <Loader /> : "Send link"
							}
						</button>

						<p className={styles.alternative}>
							Dont have an account?
							<Link href="/accounts/signup" className={styles.link}>
								Signup here
							</Link>
						</p>
				
					</form>
				</div>
			</div>
		</div>
	);
}
