import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import styles from "../../styles/login.module.css";
import { useDispatch, useSelector } from "react-redux";
import { USER_TYPES, selectUser, selectUserType, setUser, setUserType } from "../../features/user/userSlice";
import { selectUserEmail,  setUserEmail,  setUserEmailType } from "../../features/user/userActiveEmail";
import {selectToken, setToken} from "../../features/token/tokenSlice";
import Head from "next/head"
import Loader from "../../components/Loader";
import useLogin from "../../hooks/useLogin";
import { useSearchParams } from 'next/navigation'
import useMerch from "../../hooks/useMerch"
import useData from "../../hooks/useData";
import { jwtDecode } from "jwt-decode";

import SignupSuccess from "../../components/EmailTemplates/SignupSuccess";

import { Resend } from 'resend';
 	

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

export default function SignUp() {
	const [accessToken, setAccessToken] = useState("")
	const [refreshToken, setRefreshToken] = useState("")
	const dispatch = useDispatch();
	const user = useSelector(selectUser);
	const user_email = useSelector(selectUserEmail);
	
	const token = useSelector(selectToken);
	
	const router = useRouter();
	const [formErr, setFormErr] = useState(null)
	const [searchQuery, setSearchQuery] = useState('');
	const [profileQuery, setProfileQuery] = useState([]);
	const searchParams = useSearchParams()
	const search = searchParams.get('user')
	const [userResult, setUserResult] = useState([])
	const [spinner, setSpinner] = useState(false)	
	
    const resend = new Resend('re_RdTjmbKL_9oa6oPS4MTWTNs3KdXNgZDXi');



	const signupSuccess =    <div class="flex items-center text-center p-4 mb-4 text-sm text-green-800 border border-0 bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800" role="alert">
		<svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
		  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
		</svg>
		<span class="sr-only">Info</span>
		<div>
		You have created a new account, please login to complete your profile
		</div>
	  </div>

	

	if (user !== null) {
	 
		router.push("/products");
		
	}
	

	//const { isIdle, isPending, error, mutateAsync: loginFn } = useLogin("https://altclan-api.onrender.com/dj-rest-auth/login/", loginSuccess, USER_TYPES.user)
	const { isIdle, isPending, error, mutateAsync: loginFn } = useLogin("https://altclan-api.onrender.com/auth/jwt/create", loginSuccess, USER_TYPES.user)
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	})
	//console.log("Query params: ", search)
	console.log("Token State: ", token)
	
	const inputChangeHandler = (e) => {
		const { name, value } = e.target
		setFormData((prevValue) => {
			return {
				...prevValue,
				[name]: value
			}
		})

	}

 
	async function loginEmail(){
		dispatch(setUserEmail(formData?.email))
		console.log("User Email: ", user_email)
	
	}
	loginEmail()
	
	async function loginSuccess() {
    
        console.log("Successful Login")
        const today = new Date();
        const oneMonthFromToday = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
        document.cookie = `user_type=user; expires=${oneMonthFromToday.toUTCString()} Path=/`
    
		console.log(document.cookie)
    }


	const submit = async (e) => {
		e.preventDefault();
		//
		
		try {
			
			await loginFn(formData)
		
			loginSuccess()


			
		
		} catch (error) {
			console.log(error)
			setSpinner(false)
			setFormErr(error)
		}
	};
	
	return (
		<>
		<Head>
       <title>Altclan - Login as a user </title>
            <meta charset="UTF-8" />
            <meta
              name="description"
              content="Login to continue."
            />
              <meta name="keywords"
                    content="altclan, altclan login, login, fashion, community, aesthetics, enigmas, arts, merchandises,  clothing, rings, accessories" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/alteclan_logo.jpg" />
       </Head> 
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

						<h1 className={styles.greeting}>Login to your account</h1>
						<p className={styles.login}>Complete your login to continue</p>

						{search == "success" ? signupSuccess : ""}
						<div className="">
							{/* <label for="email" className="block mb-2 text-sm font-medium text-black">Your email</label> */}
							{error !== null && (
								<div id="alert-2" class="flex items-center p-4 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
									<svg class="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
										<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
									</svg>
									<span class="sr-only">Info</span>
									<div class="ml-3 text-sm text-center font-medium">
										{formErr?.non_field_errors}
									</div>
									<div class="ml-3 text-sm text-center font-medium">
										{formErr?.detail}
									</div>
								</div>
							)}
							<input
								type="email"
								onChange={inputChangeHandler}
								name="email"
								id="email"
								className={styles.input}
								placeholder="name@company.com"
								required
							/>
						</div>
						<div>
							{/* <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Password</label> */}
							<input
								type="password"
								onChange={inputChangeHandler}
								name="password"
								id="password"
								placeholder="•••••••"
								className={styles.input}
								required
							/>
						</div>

						<div></div>

						<button disabled={isPending} type="submit" className={styles.submit}>
							{
								isPending ? <Loader /> : "Login"
							}
						</button>

						<p className={styles.alternative}>
							Dont have an account?
							<Link href="/accounts/signup" className={styles.link}>
								Signup here
							</Link>
						</p>
						<p className={styles.alternative}>
							Forgot your password?
							<Link href="/accounts/reset_password" className={styles.link}>
								Reset Password
							</Link>
						</p>
					</form>
				</div>
			</div>
		</div>
		</>
	);

}
