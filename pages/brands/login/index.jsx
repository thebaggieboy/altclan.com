import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, FormEvent, useLayoutEffect, useEffect } from 'react'
//import styles from "../../../styles/login.module.css";
import styles from "./../../../styles/login.module.css"
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../components/Loader"
import useBrandLogin from '../../../hooks/useBrandLogin';
import { USER_TYPES, selectUser, setUser, setUserType } from '../../../features/user/userSlice';
import Head from "next/head"
import { useSearchParams } from 'next/navigation';
import { selectUserEmail,  setUserEmail,  setUserEmailType } from "../../../features/user/userActiveEmail";
import {selectToken, setToken} from "../../../features/token/tokenSlice";
import {selectBrandToken, setBrandToken} from "../../../features/brand_token/brandTokenSlice";
import useLogin from '../../../hooks/useLogin';

import { Resend } from 'resend';




export default function Login(req, res) {
    const dispatch = useDispatch();
    const brand_user = useSelector(selectUser); 
    const user_email = useSelector(selectUserEmail);
    const token = useSelector(selectToken);
    const [brand, setBrand] = useState("")
	const [decodedToken, setDecodedToken] = useState("")
    const router = useRouter();
    const searchParams = useSearchParams()
	const search = searchParams.get('user')

    const signupSuccess =  <div class="flex items-center text-center p-4 mb-4 text-sm text-green-800 border border-0 bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800" role="alert">
    <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
    </svg>
    <span class="sr-only">Info</span>
    <div>
    You have created a new account, please login to complete your profile
    </div>
  </div>
  

 useEffect(()=>{
    if (brand_user !== null) {
        console.log(`Brand User: ${brand_user}`);
        //setBrand(brand_user);
        console.log("Brand : ", brand_user[0])
        console.log("Brand Count: ", brand_user.length)
        console.log("Brand Name: ", brand_user[0]?.brand_name)

        if(brand_user[0]?.brand_name == '' && brand_user[0]?.brand_bio == "" && brand_user[0]?.brand_type == "" && brand_user[0]?.mobile_number == ""){
            router.push('/brands/register/brand-bio')
        }

        if(brand_user[0]?.brand_logo == null){
            router.push(`/brands/register/brand-logo`)
        }

       
       
    }

    
 }, [brand_user, brand])


    const { isIdle, isPending, error, mutateAsync: loginFn } = useBrandLogin("https://altclan-brands-api-1-1.onrender.com/auth/jwt/create", loginSuccess, USER_TYPES.brand)

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })
    console.log("Brand Token State: ", token)
	
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
        router.push(`/brands/profile/${brand_user?.[0]?.brand_name}`)
		console.log(document.cookie)
    }


    const submit = async (e) => {
        e.preventDefault();
        try {
        
            await loginFn(formData)
            loginSuccess()
            await fetch('/api/emails', {method:'POST'})
          
	  
        } catch (error) {
            console.log(error)
            
        }
    };


    return (
        <>
     <Head>
       <title>Login as a brand </title>
            <meta charset="UTF-8" />
            <meta
              name="description"
              content="Login to your brand account."
            />
              <meta name="keywords"
                    content="altclan, altclan login" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/alteclan_logo.jpg" />
       </Head> 
        <div className="">
        <div className="ml-5 p-2">
   <button type="button" onClick={()=> router.back()} class="w-full flex items-center justify-center w-1/2 px-5 py-2 text-sm text-black transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700">
    <svg class="w-5 h-5 rtl:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
    </svg>
    <span>Go back</span>
</button>
   </div>
            <div className={styles.loginContainer}>
                <div className={styles.columnImage}>
                    <img src="/img/no-revisions.jpg" alt="" className={styles.img} />
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
                        <h1 className={styles.greeting}>Login to your brand account</h1>
                        <p className={styles.login}>Continue managing your brand and community</p>
                        {search == "success" ? signupSuccess : ""}
                        <div>
                            {/* <label for="email" className="block mb-2 text-sm font-medium text-black">Your email</label> */}
                            {error !== null && (
                                <div id="alert-2" class="flex items-center p-4 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                    <svg class="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                    </svg>
                                    <span class="sr-only">Info</span>
                                    <div class="ml-3 text-sm text-center font-medium">
                                        {error?.non_field_errors}                                    </div>

                                </div>
                            )}
                            <input type="email" onChange={inputChangeHandler} name="email" id="email" className={styles.input} placeholder="name@company.com" required />
                        </div>
                        <div>
                            {/* <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Password</label> */}
                            <input type="password" onChange={inputChangeHandler} name="password" id="password" placeholder="•••••••" className={styles.input} required />
                        </div>
                        <div>

                        </div>

                        <button disabled={isPending} type="submit" className={styles.submit}>
                            {
                                isPending ? <Loader /> : "Login"
                            }
                        </button>

                        <p className={styles.alternative}>
                            Dont have an account?
                            <Link href="/brands/register" className={styles.link}>Signup here</Link>
                        </p>
                        <p className={styles.alternative}>
                            Forgot your password?
                            <Link href="/brands/register" className={styles.link}>Reset Password</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}
