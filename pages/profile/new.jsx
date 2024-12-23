
import { useEffect, useLayoutEffect, useState } from "react";
import ProfileForm from "../../components/ProfileForm";
import styles from "../../styles/profile.module.css";
import { useDispatch, useSelector } from "react-redux";
import { USER_TYPES, selectUser, selectUserType, setUser } from "../../features/user/userSlice";
import { useRouter } from "next/router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import fetchProfileData from "../../lib/fetchProfileData";
import fetchOrderData from "../../lib/fetchOrderData";
import Billing from "../../components/Billing";
import { selectToken } from "../../features/token/tokenSlice";
import { current } from "@reduxjs/toolkit";
import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { useSearchParams } from 'next/navigation'

const Profile = () => {
	const user = useSelector(selectUser);
	const token = useSelector(selectToken);
	const [decodedToken, setDecodedToken] = useState("")
	const [currentUser, setCurrentUser] = useState("")
	const router = useRouter();
	const isBrand = useSelector(selectUserType) === USER_TYPES.user
	const dispatch = useDispatch()
	const client = useQueryClient()
	const [orders, setOrders] = useState([])
	const [dataUser, setDataUser] = useState([])
	const [openModal, setOpenModal] = useState(false);
	const [email, setEmail] = useState('');
    const searchParams = useSearchParams();
    const updateMessage = searchParams.get('update')
	function onCloseModal() {
	  setOpenModal(false);
	  setEmail('');
	}
	
	if (user === null) {
		router.push("/login")
	}

	const [orderError, setOrderError] = useState('No current Order')
	const userId = router.query?.id

	const getOrder = async()=>{
		console.log("Getting orders from api")
		const orderUrl = await fetch("https://altclan-api-v1.onrender.com/api/orders/")
		const data = await orderUrl.json()
		const orderResult = data?.filter((product) => product.user_email == user?.email );
		setOrders(orderResult)
		console.log("Order State: ", orders)
	}	  
	
	useEffect(() => {
		if(token !== null){
			const arrayToken = token.split('.');
			const tokenPayload = JSON.parse(atob(arrayToken[1]));	

			
			setDecodedToken(tokenPayload)
			setCurrentUser(user)
			
			}
		
		
			//getOrder()
			async function fetchProfile() {
				const res =  await fetch(`https://altclan-api-v1.onrender.com/api/users/${user[0]?.id}`, {
					method: "GET",
					headers: {
			
						"Content-Type": "application/json",
					},
					
					credentials: "include"
			
				})
				const data =  await res.json()
				setDataUser(data)
				console.log("Data: ", dataUser)
			}
		fetchProfile()
		
			
	}, [currentUser, dataUser, token, user])
	
	
	
	const [activeSection, setAcvtiveSection] = useState("orders");

	const [subSec, setSubSec] = useState({
		active: false,
		sec: 1,
	});

	const [formActive, setFormActive] = useState({
		active: false,
		type: "",
	});

	const onEdit = (e) => {
		const { form } = e.target.dataset;
		form === "personal" && setFormActive({ active: true, type: form });
		form === "login" && setFormActive({ active: true, type: form });
	};

	const profileData = {
		personal: {
			firstName: "",
			lastName: "",
			bio: "",
			address: "",
			gender: "",
			city: "",
			state: "",
			zip: "",
		},

		login: {
			email: "johndoe38@gmail.com",
			password: "**********",
		},
	};
	const [formData, setFormData] = useState({
		first_name: "",
		last_name: "",
		mobile_number:""
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
	const profileSuccess =    <div class="flex items-center text-center p-4 mb-4 text-sm text-green-800 border border-0 bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800" role="alert">
	<svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
	  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
	</svg>
	<span class="sr-only">Info</span>
	<div>
	You have updated your profile successfully
	</div>
  </div>
	console.log("formData: ", formData)
	async function updateUserProfile(){
		const res = await fetch(`https://altclan-api-v1.onrender.com/api/users/${user[0]?.id}/`, {
			method: "PUT",
			headers: {

				"Content-Type": "application/json",
			},
			body: JSON.stringify({email:user[0]?.email, display_picture:null, first_name:formData.first_name, last_name:formData.last_name, mobile_number:formData.mobile_number}),
			
		})

		const data = await res.json()

		if (res.status >= 200 & res.status <= 209) {
			console.log("User Profile UPDATED")
			router.push(`/profile/${user[0]?.id}?update=success`)

		}
		const error = { ...data }
		throw error

	
	}


	if (dataUser == null || dataUser == '') {
		return (
			<div role="status" className="p-10 text-center  ml-30 mr-30">
				<svg aria-hidden="true" class="w-20 h-20 text-3xl text-black animate-spin dark:text-black fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
					<path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
				</svg>
				<span class="sr-only text-center flex items-center">Loading...</span>
			</div>
		)

	}
 


	return (
		<>
		
	<div class="col-span-2 hidden sm:block">
      <ul>

        <li class="mt-5 cursor-pointer border-l-2 bg-black px-2 py-3 text-center font-semibold text-white transition hover:border-l-blue-700  hover:bg-black ">Accounts</li>
        <li class="mt-5 cursor-pointer border-l-2 border-transparent px-2 py-3 text-center font-semibold transition hover:bg-black hover:text-white">Security</li>
        <li class="mt-5 cursor-pointer border-l-2 border-transparent px-2 py-3 text-center font-semibold transition hover:bg-black hover:text-white">Billing</li>
        <li class="mt-5 cursor-pointer border-l-2 border-transparent px-2 py-3 text-center font-semibold transition hover:bg-black hover:text-white">Notifications</li>

      </ul>
    </div>
			<main className="user-profile">
		
				<div
					className={`user-profile__form ${formActive.active ? "active" : ""}`}
				>
					<ProfileForm
						type={formActive.type}
						onClose={() => {
							setFormActive(false);
						}}
						defaultData={profileData}
					/>
				</div>
				<div className={styles.profileContent}>
					<div className={styles.column1}>
						<img
							src="/assets/abstract-user-flat-4.png"
							alt=""
							className={styles.image}
						/>
					</div>

					<div className={styles.column2}>
						<div className={styles.number}>
							<h1 className={styles.h1}>{dataUser?.email}</h1>

						</div>
						<div>

							<p className={styles.p}>firstname: {dataUser?.first_name}</p>
							<p className={styles.p}>lastname: {dataUser?.last_name}</p>
							<p className={styles.p}>phone: {dataUser?.mobile_number}</p>

							<button
								 onClick={() => setOpenModal(true)}
								
								className={styles.profileButton}
							>
								Update profile
							</button>

							<button
								data-form="login"
								onClick={onEdit}
								className={styles.profileButton}
							>
								Change password
							</button>
						</div>
					</div>
				</div>
			</main>


			
			<Modal show={openModal} onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
			{updateMessage == 'success' ? profileSuccess : ""}
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Update Your Profile</h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="first_name" value="First Name" />
              </div>
              <TextInput
                id="first_name"
                placeholder="name@company.com"
                name='first_name'
                onChange={inputChangeHandler}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="last_name" value="Last Name" />
              </div>
              <TextInput id="last_name"    name='last_name'  onChange={inputChangeHandler} type="text" required />
            </div>

			<div>
              <div className="mb-2 block">
                <Label htmlFor="mobile_number" value="Phone Number" />
              </div>
              <TextInput id="mobile_number" type="mobile_number"    name='mobile_number'
                onChange={inputChangeHandler} required />
            </div>

            <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
             
              <button onClick={updateUserProfile}  className="bg-black p-3 rounder-lg text-white hover:underline dark:text-cyan-500">
                Save
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

			<hr />
			<nav className="user-profile__nav">
				<div
					className={`user-profile__nav-item ${activeSection === "orders" ? "active" : ""
						}`}
					onClick={(e) => {
						setAcvtiveSection("orders");
					}}
				>
					Orders
				</div>

				<div
					className={`user-profile__nav-item ${activeSection === "inventory" ? "active" : ""
						}`}
					onClick={(e) => {
						setAcvtiveSection("inventory");
					}}
				>
					Inventory
				</div>

				<div
					className={`user-profile__nav-item ${activeSection === "billing" ? "active" : ""
						}`}
					onClick={(e) => {
						setAcvtiveSection("billing");
					}}
				>
					Billing
				</div>
			</nav>

			<section className="user-profile__sections">
				{activeSection === "orders" && (
					<div className="orders">
						<div className={styles.center}>
							<p className={styles.grey}> 

							<section class="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
  <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
    <h2 class="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Track the delivery of order #957684673</h2>

    <div class="mt-6 sm:mt-8 lg:flex lg:gap-8">
      <div class="w-full divide-y divide-gray-200 overflow-hidden rounded-lg border border-gray-200 dark:divide-gray-700 dark:border-gray-700 lg:max-w-xl xl:max-w-2xl">
        
{orders.map(order=>(
	
     <>  

	<div class="space-y-4 p-6">
	<div class="flex items-center gap-6">
	
	  <a href="#" class="min-w-0 flex-1 font-medium text-gray-900 hover:underline dark:text-white"> APPLE iPhone 15 5G phone, 256GB, Gold </a>
	</div>

	<div class="flex items-center justify-between gap-4">
	  <p class="text-sm font-normal text-gray-500 dark:text-gray-400"><span class="font-medium text-gray-900 dark:text-white">Product ID:</span> {order?.id}</p>

	  <div class="flex items-center justify-end gap-4">
		<p class="text-base font-normal text-gray-900 dark:text-white">x{order?.number_of_items}</p>

		<p class="text-xl font-bold leading-tight text-gray-900 dark:text-white">${order?.total_amount}</p>
	  </div>
	</div>
  </div>

</>
))}
      
   
    </div>
  </div>
  </div>

  <div class="mt-6 grow sm:mt-8 p-5 lg:mt-0">
        <div class="space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Order history</h3>

          <ol class="relative ms-3 border-s border-gray-200 dark:border-gray-700">
            <li class="mb-10 ms-6">
              <span class="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white dark:bg-gray-700 dark:ring-gray-800">
                <svg class="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"/>
                </svg>
              </span>
              <h4 class="mb-0.5 text-base font-semibold text-gray-900 dark:text-white">Estimated delivery in 24 Nov 2023</h4>
              <p class="text-sm font-normal text-gray-500 dark:text-gray-400">Products delivered</p>
            </li>

          

            <li class="ms-6 text-primary-700 dark:text-primary-500">
              <span class="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary-100 ring-8 ring-white dark:bg-primary-900 dark:ring-gray-800">
                <svg class="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11.917 9.724 16.5 19 7.5" />
                </svg>
              </span>
              <div>
                <h4 class="mb-0.5 font-semibold">19 Nov 2023, 10:45</h4>
                <a href="#" class="text-sm font-medium hover:underline">Order placed - Receipt #647563</a>
              </div>
            </li>
          </ol>

          <div class="gap-4 sm:flex sm:items-center">
            <button type="button" class="w-full rounded-lg  border border-gray-200 bg-white px-5  py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">Cancel the order</button>

            <a href="#" class="mt-4 flex w-full items-center justify-center rounded-lg bg-primary-700  px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300  dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 sm:mt-0">Order details</a>
          </div>
        </div>
		</div>
</section>	
		

					</p>
						</div>
					</div>
				)}



				{activeSection === "inventory" && (
					<div className={styles.galleryContent}>
						<div className="inventory">
							<div className="grid grid-cols-2 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-10">



								<div className={styles.inventory}>
									<img
										src="https://images.unsplash.com/photo-1622560480654-d96214fdc887?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1288&q=80"
										alt=""
									/>
									<p>Product Name: Wiser</p>

									<p>Color(s): Red</p>

									<p>Stock: 5</p>
								</div>
							</div>
						</div>
					</div>
				)}

{activeSection === "billing" && (
					<div className={styles.galleryContent}>
						<div className="billing">
							<div className="p-2">

							<Billing/>
						
							</div>
						</div>
					</div>
				)}
			</section>
			
		</>
	);
};

export default Profile;
