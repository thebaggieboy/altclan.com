import React, { use, useState, useLayoutEffect} from 'react';
import styles from '../../styles/brand-bio.module.css';
import BrandProfileInfoForm from './BrandProfileInfoForm';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { selectBrandUser, setBrandUser } from '../../features/brands/brandUserSlice';
import useUpdateProfileData from '../../hooks/useUpdateProfileData'
import Loader from "../../components/Loader"
import { mutate } from 'swr';
import { selectUser, setUser } from '../../features/user/userSlice';



const  BrandBioForm = (props) => {

  const brandUserData = useSelector(selectUser);
  const router = useRouter()
  const { isPending, error, mutate: updateFn, data } = useUpdateProfileData("https://altclan-brands-api-1-1.onrender.com/api/users/", brandUserData[0]?.id, setUser)

  const [formData, setFormData] = useState({
    email: brandUserData[0].email,
    brand_name: "",
    brand_bio: "",
    brand_type: "",
    mobile_number:"",
    brand_logo:null
   

  })

  const {  brand_name, brand_bio, brand_type, mobile_number, brand_logo  } = formData

  const inputChangeHandler = (e) => {
    const { name, value } = e.target
    setFormData((prevValue) => {
      return {
        ...prevValue,
        [name]: value
      }
    })

  }

  const [step, setStep] = useState(1);

 
  const updateProfile = (e) => {
    e.preventDefault()
    updateFn(formData)  
  
   router.push('/brands/register/brand-logo')
  }

  if (isPending) {
    console.log("updating brand")
  }


  if (error) {
    console.log(error)
  }


  return (
    <div>
      <div className="">
        <div className={styles.loginContainer}>


          <div className={styles.columnText}>
            <div class="flex items-center text-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800" role="alert">
              <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <span class="sr-only">Info</span>
              <div>
                <span class="font-medium">Account creation successful!</span> You have created a new brand, please fill in the form to get start setting up your brand profile.
              </div>
            </div>

            <form className={styles.form} >

              

              <h1 className={styles.greeting}>About Your Brand</h1>
              <p className={styles.login}>Fill in some of your brand details</p>

              {error && <p className=' text-red-500 text-sm'>Something went wrong please try again</p>}
              <div>
                <label htmlFor="" className={styles.label}>Brand name</label>
                <input type="text" value={brand_name} onChange={inputChangeHandler} name="brand_name" id="brand-name" className={styles.input} placeholder="" required />

              </div>
              <div>
                <label htmlFor="" className={styles.label}>Brand bio</label>

                <textarea type="text" value={brand_bio} onChange={inputChangeHandler} name="brand_bio" id="bio" placeholder="" className={styles.input} required></textarea>
              </div>
              <div>
                <label htmlFor="" className={styles.label}>Brand type</label>
                <div className="pt-2">
                   <select className={styles.input} onChange={inputChangeHandler} name="brand_type" id="">
                    <option value="">Choose community type</option>
                    <option value="Clothing & Apparel">Clothing & apparel</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Arts & Aesthetics">Arts & Aesthetics</option>
                    <option value="Footwears">Footwears</option>
                    <option value="Enigmas">Enigmas</option>
                    <option value="Watches">Watches</option>
                    <option value="Skates">Skates</option>
                    <option value="Caps">Caps</option>
                    <option value="Masks">Masks</option>
                  </select> 

                </div>

              </div>
              <div>

              </div>
              <div>
                <label htmlFor="" className={styles.label}>Mobile number</label>
                <input type="number" value={mobile_number} onChange={inputChangeHandler} name="mobile_number" id="mobile_number" className={styles.input} placeholder="" required />

              </div>

              <button onClick={updateProfile} className={styles.submit}>
                {isPending ? <Loader /> : "Submit"}
              </button>


            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BrandBioForm;
