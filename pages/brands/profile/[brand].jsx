import { Tab } from '@headlessui/react';
import React, { useState, useEffect, Component } from 'react';
import styles from "./../../../styles/brand.module.css";
import MyTabs from '../../../src/aboutcounter/brandProfile'
import useMerch from '../../../hooks/useMerch';
import { useSelector } from "react-redux";
import Link from 'next/link'
import { USER_TYPES, selectUser, selectUserType, setUser } from '../../../features/user/userSlice';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation'
import { selectToken, setToken } from '../../../features/token/tokenSlice';
import fetchProfileData from '../../../lib/fetchProfileData';
import { QueryClient, useQueryClient, useQuery } from "@tanstack/react-query";
import fetchProducts from '../../../lib/fetchProducts'; 
import useOrder from '../../../hooks/useOrder';



 
export default function BrandProfile({id}) {
  const searchParams = useSearchParams();
 const [searchResult,  setSearchResult] = useState([])
 const [orderResult,  setOrderResult] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
 
  const [orderQuery, setOrderQuery] = useState('')
 
  const [brandResult, setBrandResult] = useState([])

  const add_merch = searchParams.get('update')
 
  const merchSuccess =    <div class="flex items-center text-center p-4 mb-4 text-sm text-green-800 border border-0 bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800" role="alert">
  <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
  </svg>
  <span class="sr-only">Info</span>
  <div>
  You added created a merchandise!
  </div>
</div>

const client = useQueryClient()
  const brand_user = useSelector(selectUser)
  const token = useSelector(selectToken)
	const router = useRouter();
  const userId = router.query?.id
  const brand = router.query?.brand
  console.log("ROUTER QUERY:", brand)

  const [decodedToken, setDecodedToken] = useState("")
  const [currentUser, setCurrentUser] = useState("")
  const [dataUser, setDataUser] = useState([])
  const isBrand = useSelector(selectUserType) === USER_TYPES.brand
  //const profileData =  client.getQueryData(["profile", brand_user?.id, user?.user_type])


useEffect(() => {
  if (brand_user == null) {
    router.push("/brands/login");
  } 
  if (searchQuery !== null) {
    setSearchQuery(brand)
  }

}, [brand_user])

  const { data, loading, error, isLoading } = useMerch('https://altclan-brands-api-1-1.onrender.com/api/merchandises/')
  const { dataOrder, loadingOrder, errorOrder, isLoadingOrder } = useOrder('https://altclan-api.onrender.com/api/orders/')
  const results = data?.filter((product) => product?.brand_name?.toLowerCase().includes(searchQuery?.toLowerCase()) );
  const orderResults = dataOrder?.filter((order) => order?.brand_name.toLowerCase().includes(orderQuery?.toLowerCase()) );
  
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  
useEffect(() => {
  if(token !== null){
    const arrayToken = token.split('.');
    const tokenPayload = JSON.parse(atob(arrayToken[1]));	

    
    setDecodedToken(tokenPayload)
    setCurrentUser(brand_user)
    
    }
  
  
    //getOrder()
    
}, [token, brand_user])




async function fetchProfile() {
  const res =  await fetch(`https://altclan-brands-api-1-1.onrender.com/api/users/${brand_user?.[0]?.id}/`, {
    method: "GET",
    headers: {

      "Content-Type": "application/json",
    },
    
    credentials: "include"

  })
  const data =  await res.json()
  setDataUser(data)

}
fetchProfile()

if (isLoading) {
  return (
    <div role="status" className="p-10 mt-32 text-center min-h-[20vh] grid place-items-center ml-30 mr-30">
      <svg aria-hidden="true" class="w-10 h-10 text-3xl text-black animate-spin dark:text-black fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
      </svg>
      <span class="sr-only text-center flex items-center">Loading...</span>
    </div>
  );
}

if (error) {
  return (
    <div className="p-5">
      <h3>
        <span className="text-red-600">{error.message}</span>
      </h3>
    </div>
  );
}

// {if (dataUser == null || dataUser == '') {
//   return (
//     <div role="status" className="p-10 text-center  ml-30 mr-30">
//       <svg aria-hidden="true" class="w-20 h-20 text-3xl text-black animate-spin dark:text-black fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
//         <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
//       </svg>
//       <span class="sr-only text-center flex items-center">Loading...</span>
//     </div>
//   )

// }}
  return (
     <div key={dataUser?.id} className={styles.brandProfileContent}>
       <div className="ml-5 p-2">
   <button type="button" onClick={()=> router.back()} class="w-full flex items-center justify-center w-1/2 px-5 py-2 text-sm text-black transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700">
    <svg class="w-5 h-5 rtl:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
    </svg>
    <span>Go back</span>
</button>
   </div>
          <div className={styles.left}>
            <img src={dataUser?.brand_logo} alt="" className={styles.image}/>
          </div>

            <div className={styles.right}>
              <h1>
                {dataUser?.brand_name}
              </h1> 
              <div className={styles.numbers}>
               
                <p>{dataUser?.brand_type}</p>
              </div>
              
              <p className={styles.about}>
                {dataUser?.brand_bio}
              </p>
              <br />
              

                <Link style={{backgroundColor:'beige', fontWeight:'bolder'}} className=" p-2 text-xs border-0 text-black" href="/brands/merchandise/new">+ Add product</Link>

                <Link  className="bg-black ml-2 p-2 text-xs border-0 text-white" href={`/brands/dashboard/`}>Dashboard</Link>
<br />
            <Link href="/setting" className="pt-10"> 
            <svg class="mt-5 h-6 w-6 text-gray-900 font-bold"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <circle cx="12" cy="12" r="3" />  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg></Link>
            </div>

              <div>
              {add_merch == "success" ? merchSuccess : ""}
              <div>
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-white-900/20 p-5">
          <Tab className="w-full active rounded-lg py-2.5 text-sm font-medium leading-5 text-black-700">
            Shop
          </Tab>



          <Tab className="w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-black-700">
            Reviews
          </Tab>
        </Tab.List>

        <Tab.Panels className={styles.tab}>
          <Tab.Panel className="rounded-xl bg-white p-3">
            <div className="lg:col-span-3 mt-2">
              <div className="mx-auto max-w-2xl  px-4 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8">
                <div className=" grid grid-cols-2 gap-x-6 gap-y-2  lg:grid-cols-3 xl:gap-x-8">
                  {results?.map(
                    ({
                      id,
                      display_image,
                      imageAlt,
                      brand_name,
                      merchandise_name,
                      merchandise_type,
                      labels,
                      price,
                    }) => (
                      <div key={id} className="group relative">
                        <div className=" overflow-hidden  lg:aspect-none group-hover:opacity-75 lg:h-80">
                          <Link href={`/products/${id}`}>
                            <img
                              src={display_image}
                              alt={imageAlt}
                              className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                            />

                          </Link>
                        </div>
                        <Link href={`/products/${id}`}>


                          <div className="flex pt-3 justify-between">
                            <div>
                              <div className="container text-gray-500 text-xs">
                                {labels !== "None" ?
                                  <span style={{ backgroundColor: '#F5F5DC', borderRadius: 0, fontSize: 10 }} class=" text-black me-2 px-2.5 py-0.5 rounded dark:bg-black dark:text-white border border-black">
                                    {labels}
                                  </span> : ""}


                              </div>
                              <h3 className="text-sm pt-2  text-black">
                                {/* An element here was covering the whole card making the add to cart unclickable */}
                                {merchandise_name}
                              </h3> <span style={{ fontSize: 10, fontWeight:'bold' }}>BY</span> <span style={{ fontSize: 14, fontStyle: "italic" }}>{brand_name}</span>

                              <p style={{ fontWeight: 'bold' }} className="text-xs pt-1 text-gray-900">
                                ₦{price}
                              </p>


                            </div>


                          </div>
                        </Link>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
            <br/><br/>

          </Tab.Panel>

          <Tab.Panel className="rounded-xl bg-white p-3">
            <div className={styles.reviews}>
              <div className={styles.box}>
                <div className={styles.profile}>
                  <img src="https://images.unsplash.com/photo-1648737965402-2b9c3f3eaa6f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt="" className={styles.img} />
                  <div className={styles.bio}>
                    <h2>Jane Doe</h2>
                  </div>
                </div>
                <div className={styles.qoute}>
                  <p>
                    Lorem ipsum dolor psum dolor sit amet consectetur psum dolor sit amet consectetur sit amet consectetur adipisicing elit. Sit commodi quis perspiciatis veritatis excepturi est
                  </p>
                </div>
              </div>

              <div className={styles.box}>
                <div className={styles.profile}>
                  <img src="https://images.unsplash.com/photo-1655813678352-e7647461724d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80" alt="" className={styles.img} />
                  <div className={styles.bio}>
                    <h2>Lorem Ipsum</h2>
                  </div>
                </div>
                <div className={styles.qoute}>
                  <p>
                    Lorem ipsum dolor psum dolor sit amet consectetur psum dolor sit amet consectetur sit amet consectetur adipisicing elit. Sit commodi quis perspiciatis veritatis excepturi est
                  </p>
                </div>
              </div>

              <div className={styles.box}>
                <div className={styles.profile}>
                  <img src="https://images.unsplash.com/photo-1653656120693-c987723b2046?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80" alt="" className={styles.img} />
                  <div className={styles.bio}>
                    <h2>Mitchell Pritchett</h2>
                  </div>
                </div>
                <div className={styles.qoute}>
                  <p>
                    Lorem ipsum dolor psum dolor sit amet consectetur psum dolor sit amet consectetur sit amet consectetur adipisicing elit. Sit commodi quis perspiciatis veritatis excepturi est
                  </p>
                </div>
              </div>

              <div className={styles.box}>
                <div className={styles.profile}>
                  <img src="https://images.unsplash.com/photo-1655857202782-8d0ef8f0254b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=428&q=80" alt="" className={styles.img} />
                  <div className={styles.bio}>
                    <h2>Matilda Babosa</h2>
                  </div>
                </div>
                <div className={styles.qoute}>
                  <p>
                    Lorem ipsum dolor psum dolor sit amet consectetur psum dolor sit amet consectetur sit amet consectetur adipisicing elit. Sit commodi quis perspiciatis veritatis excepturi est
                  </p>
                </div>
              </div>

              <div className={styles.box}>
                <div className={styles.profile}>
                  <img src="https://images.unsplash.com/photo-1648737119247-e93f56878edf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80" alt="" className={styles.img} />
                  <div className={styles.bio}>
                    <h2>Manny Nanny</h2>
                  </div>
                </div>
                <div className={styles.qoute}>
                  <p>
                    Lorem ipsum dolor psum dolor sit amet consectetur psum dolor sit amet consectetur sit amet consectetur adipisicing elit. Sit commodi quis perspiciatis veritatis excepturi est
                  </p>
                </div>
              </div>

              <div className={styles.box}>
                <div className={styles.profile}>
                  <img src="https://images.unsplash.com/photo-1655899307814-5210d02b9e05?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=402&q=80" alt="" className={styles.img} />
                  <div className={styles.bio}>
                    <h2>Alex Dunphy</h2>
                  </div>
                </div>
                <div className={styles.qoute}>
                  <p>
                    Lorem ipsum dolor psum dolor sit amet consectetur psum dolor sit amet consectetur sit amet consectetur adipisicing elit. Sit commodi quis perspiciatis veritatis excepturi est
                  </p>
                </div>
              </div>

              <div className={styles.box}>
                <div className={styles.profile}>
                  <img src="https://images.unsplash.com/photo-1655900016340-243a6b3557e6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80" alt="" className={styles.img} />
                  <div className={styles.bio}>
                    <h2>Jack Sparrow</h2>
                  </div>
                </div>
                <div className={styles.qoute}>
                  <p>
                    I owned a ship, sit amet consectetur psum dolor sit amet consectetur sit amet consectetur adipisicing elit. Sit commodi quis perspiciatis veritatis excepturi est
                  </p>
                </div>
              </div>

              <div className={styles.box}>
                <div className={styles.profile}>
                  <img src="https://images.unsplash.com/photo-1599420186946-7b6fb4e297f0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80" alt="" className={styles.img} />
                  <div className={styles.bio}>
                    <h2>Adebolu Marcus</h2>
                  </div>
                </div>
                <div className={styles.qoute}>
                  <p>
                    Lorem ipsum dolor psum dolor sit amet consectetur psum dolor sit amet consectetur sit amet consectetur adipisicing elit. Sit commodi quis perspiciatis veritatis excepturi est
                  </p>
                </div>
              </div>
            </div> <br/>
            {/* <button className={styles.button}>Load more</button> */}
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
              </div>
            </div>
  )
}

