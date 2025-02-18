import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styles from "../../styles/login.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUser } from "../../features/user/userSlice";

import Loader from "../../components/Loader";
import useLogin from "../../hooks/useLogin";




export default function ForgotPassword() {
	const dispatch = useDispatch();
	const user = useSelector(selectUser);
	const router = useRouter();
	const [formErr, setFormErr] = useState()
	 
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

	console.log('form: ', formData)
	
 
	async function resetPassword(){
		

		const res = await fetch('https://altclan-api.onrender.com/auth/users/reset_password/', {
			method: "POST",
			headers: {

				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email:formData.email}),
			credentials: "include"

		})
		const data = res 
		console.log('Data: ', data)

	   if (res.status >= 200 & res.status <= 209) {
		console.log("User Password UPDATED")
		const res2 = await fetch('https://altclan-api.onrender.com/auth/users/reset_password_confirm/', {
			method: "POST",
			headers: {

				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email:formData.email}),
			credentials: "include"

		})
		const data2 = res2 
		console.log('Data2: ', data2)
		}
		const error = { ...data }
		throw error

	
	}


	const submit = async (e) => {
		
		e.preventDefault();
		
		console.log("Reset Password")
		resetPassword()
		
	};


	return (
		<div className="">
			<Head>
				<title>Reset Password | ALTCLAN</title>
				<meta name="description" content="Reset your ALTCLAN account password. Enter your email to receive a password reset link." />
				
				{/* OpenGraph Meta Tags */}
				<meta property="og:title" content="Reset Password | ALTCLAN" />
				<meta property="og:description" content="Reset your ALTCLAN account password. Enter your email to receive a password reset link." />
				<meta property="og:type" content="website" />
				<meta property="og:url" content="https://altclan.com/accounts/reset_password" />
				<meta property="og:image" content="https://altclan.com/alteclan_logo.jpg" />
				
				{/* Twitter Meta Tags */}
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content="Reset Password | ALTCLAN" />
				<meta name="twitter:description" content="Reset your ALTCLAN account password. Enter your email to receive a password reset link." />
				<meta name="twitter:image" content="https://altclan.com/alteclan_logo.jpg" />
			</Head>
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
							
							<label for="email" className={styles.label}>Email</label>
							<input
								type="email"
								onChange={inputChangeHandler}
								name="email"
								id="email"
								className={styles.input}
								placeholder=""
								required
							/>
						</div>
					

						<div></div>

						<button type="submit" className={styles.submit}>
							Send Link
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
