import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react'
import { useSelector } from "react-redux";
import { selectBrandUser, setBrandUser } from "../../../features/brands/brandUserSlice"
import styles from "../../../styles/brand-bio.module.css";
import useUpdateProfileData from '../../../hooks/useUpdateProfileData';
import Loader from "../../../components/Loader"
import { create } from 'domain';
import { selectUser, setUser } from '../../../features/user/userSlice';
export default function BrandLogo() {

  //const data = [];
  const loading = false;
  //const error = null;
  const brand_user = useSelector(selectUser);
  const router = useRouter();

  useEffect(() => {
		if (brand_user === null) {
			router.push("/brands/login");
		}
  

	}, [brand_user]);

  const brandUserData = brand_user;

  const { isPending, error, mutateAsync: updateFn, data } = useUpdateProfileData("https://altclan-brands-api-1-1.onrender.com/api/users/", brand_user?.[0]?.id, setUser)

  const [image, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);
  const [formPersonalData, setFormPersonalData] = useState(null)

  const uploadToClient = (event) => {

    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      setImage(i);
      setCreateObjectURL(URL.createObjectURL(i));

    }
  };

  const uploadToServer = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", 'altclan')
    
    console.log("Image URL: ", createObjectURL)

    const data = await fetch('https://api.cloudinary.com/v1_1/baggieboy/image/upload', {
      method: 'POST',
      body: formData
    }).then(r => r.json());


    console.log("data: ", data.url)

    await updateFn({ email:brand_user[0]?.email, brand_logo: data?.url })

    router.push(`/brands/profile/${brand_user[0]?.id}?brand=${brand_user[0]?.brand_name}`)
  };


  if (isPending) {
    console.log("updating brand logo")
  }


  if (error) {
    console.log(error)
  }

  return (
    <>
     <div className="ml-5 p-2">
   <button type="button" onClick={()=> router.back()} class="w-full flex items-center justify-center w-1/2 px-5 py-2 text-sm text-black transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700">
    <svg class="w-5 h-5 rtl:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
    </svg>
    <span>Go back</span>
</button>
   </div>
      <form className={styles.form}>

        <h1 className={styles.greeting}>Brand Logo</h1>
        <p className={styles.login}>Please note: It is advisable to upload a clean, well compressed and good quality image as your logo</p>

        {error && <div id="alert-2" class="flex items-center p-4 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <svg class="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span class="sr-only">Info</span>
          <div class="mx-auto text-sm text-center font-medium">
            {error}
          </div>

        </div>}


        <div className='text-center' p-2 >
          <img className={styles.logoSize} src={createObjectURL} />
          <input id="file" type="file" name="file" className=' p-1 text-center' onChange={uploadToClient} />


          <button type='submit' onClick={uploadToServer} className={styles.submit}>
            {isPending ? <Loader /> : "Submit"}
          </button>

        

          

        </div>
<br />
<div  >
<a href={`/brands/profile/${brand_user[0]?.id}?brand=${brand_user[0]?.brand_name}`} className={styles.link}>
            Skip for now
          </a>
</div>



      </form>
    </>
  )
}
