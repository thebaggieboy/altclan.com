import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styles from "../../styles/login.module.css";

import { useDispatch, useSelector } from "react-redux";
import { USER_TYPES, selectUser, setUser, setUserType } from "../../features/user/userSlice";
import Head from "next/head"
import Loader from "../../components/Loader";
import { useMutation } from "@tanstack/react-query";
import useSignUp from "../../hooks/useSignUp";
import useDjoserSignup from "../../hooks/useDjoserSignup";

import SignupSuccess from "../../components/EmailTemplates/SignupSuccess";

import { Resend } from 'resend';


const resend = new Resend('re_RdTjmbKL_9oa6oPS4MTWTNs3KdXNgZDXi');


export async function sendEmail() {
	try {
	  const { data, error } = await resend.emails.send({
		from: 'Acme <onboarding@resend.dev>',
		to: ['delivered@resend.dev'],
		subject: 'Hello world',
		react: SignupSuccess,
	  });
  
	  if (error) {
		return Response.json({ error }, { status: 500 });
	  }
  
	  return Response.json(data);
	} catch (error) {
	  return Response.json({ error }, { status: 500 });
	}
  }
export function LoginError() {
	return (
		<div id="alert-2" class="flex items-center p-4 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
			<svg class="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
				<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
			</svg>
			<span class="sr-only">Info</span>
			<div class="ml-2 text-sm text-center font-medium">
				You already have an account with us  <Link href="/accounts/login" class="font-semibold underline hover:no-underline">Login</Link> to continue.
			</div>
		</div>
	)
}

export default function SignUp() {
	const user = useSelector(selectUser);
	const router = useRouter();
	
	if (user !== null) {
		router.push("/products");
	}

	const [spinner, setSpinner] = useState(false)	
	
	

	const { isIdle, isPending, error, mutateAsync: signUpFn } = useSignUp("https://altclan-api.onrender.com/auth/users/", signUpSuccess, USER_TYPES.user)
	//const { isIdle, isPending, error, mutateAsync: signUpFn } = useDjoserSignup("https://altclan-brands-api-1-1.onrender.com/auth/jwt/create", signUpSuccess, USER_TYPES.user)

	
	const [formErr, setFormErr] = useState(error)
	const [formData, setFormData] = useState({
		email: "",
		password1: "",
		password2: ""
	})

	const { email, password1, password2 } = formData

	const emailErr = formErr?.email || null;
	const passwordErr = formErr?.password || formErr?.password2 || null

	const inputChangeHandler = (e) => {
		const { name, value } = e.target
		setFormData((prevValue) => {
			return {
				...prevValue,
				[name]: value
			}
		})

	}
	function signUpSuccess() {
		console.log("Redirecting to login page")
		router.push("/accounts/login?user=success")
	}
	const submit = async (e) => {
		
		e.preventDefault();
		try {
			if (password1 !== password2) {
				throw { password: "Passwords do not match" }
			}
			setSpinner(true)
			const url = "https://altclan-api.onrender.com/auth/users/"
			const res = await fetch(url, {
                method: "POST",
                headers: {

                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password:password1}),
                credentials: "include"

            })
            const data = await res.json()

            if (res.status >= 200 & res.status <= 209) {
				console.log("New User Registered.")
				console.log(data)
				setSpinner(false)
				signUpSuccess()
                
                
            }
			
            const error = { ...data }
            throw error

			
		
		} catch (error) {
			setFormErr(error)
			console.log("SIGNUP ERROR: ", error)
		}
	};

	return (
		<>
		 <Head>
       <title>Altclan - Signup as a user </title>
            <meta charset="UTF-8" />
            <meta
              name="description"
              content="Signup to create an account."
            />
              <meta name="keywords"
                    content="altclan, altclan login, login, fashion, community, aesthetics, enigmas, arts, merchandises,  clothing, rings, accessories" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/alteclan_logo.jpg" />
       </Head> 
		<div className="">
			<div className={styles.loginContainer} >
				<div className={styles.columnImage}>
					<img
						src="https://media.everlane.com/image/upload/c_fill,w_828,ar_380:655,q_auto,dpr_1.0,f_auto,fl_progressive:steep/Modal_Desktop-05102022_pyajh1"
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

						<h1 className={styles.greeting}>Welcome to Altclan</h1>
						<p className={styles.login}>Complete your sign up to join</p>

						<div className="">
							{/* <label for="email" className="block mb-2 text-sm font-medium text-black">Your email</label> */}
							{emailErr !== null && (
								<div id="alert-2" class="flex items-center p-4 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
									<svg class="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
										<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
									</svg>
									<span class="sr-only">Info</span>
									<div class="ml-2 text-sm text-center font-medium">
										{formErr?.email}  <Link href="/accounts/login" class="font-semibold underline hover:no-underline">Login</Link> to continue.
									</div>
								</div>
							)}
							{passwordErr !== null &&
								<div id="alert-2" class="flex items-center p-4 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
									<svg class="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
										<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
									</svg>
									<span class="sr-only">Info</span>
									<div class="ml-2 text-sm text-center font-medium">
										{passwordErr}
									</div>

								</div>}
						
							<input
								type="email"
								onChange={inputChangeHandler}
								name="email"
								id="email"
								className={styles.input}
								placeholder="johndoe@mail.com"

							/>
						</div>
						<div>
							{/* <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Password</label> */}

							<input
								type="password"
								autoComplete
								onChange={inputChangeHandler}
								name="password1"
								id="password"
								placeholder="•••••••"
								className={styles.input}

								required
							/>
						</div>
						<div>
							{/* <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Password</label> */}
							<input
								type="password"
								onChange={inputChangeHandler}
								name="password2"
								autoComplete
								id="password2"
								placeholder="Confirm Password"
								className={styles.input}
								required
							/>
						</div>
						<button disabled={spinner == true} type="submit" className={styles.submit}>
							{
								spinner == true ? <Loader /> : "Signup"
							}
						</button>

						<p className={styles.alternative}>
							Already have an account?
							<Link href="/accounts/login" className={styles.link}>
								Login here
							</Link>
						</p>

					</form>
				</div>
			</div>
		</div>
		</>
	);

}
