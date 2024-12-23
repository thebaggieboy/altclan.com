import React, { useState, useLayoutEffect, useEffect } from 'react';
import styles from '../../styles/brand-merchandise.module.css';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import useAddMerchandise from '../../hooks/useAddMerchandise';
import Loader from "../Loader"
import { USER_TYPES, selectUser } from '../../features/user/userSlice';
import { selectBrandUser } from '../../features/brands/brandUserSlice';

const MERCH_FORM_DATA = {
  categories:
    [

      "Arts",
      "T-shirts",
      "Tops",
      "Rings",

      "Chains & Necklaces",
      "Jeans",
      "Jackets",
      "Joggers",
      "Denim",
      "Skating",
      "Sweatshirts",
      "Hoodies",
      "Kicks & Slides",
      "Hats & Caps",
      "Masks",
      "Shades",
      "Slides",
      "Earrings",
      "Wallets",
      "Belts",
      "Shoes",
      "Native Wears",
      "Vintage Shirts",
      "Pendants",
      "Lumberjacks",
      "Piercings & Studs",
      "Baggy Wears"],
  gender: ["Male", "Female", "Non-Binary", "Do not specify"],
  labels:
    ["None",
      "New Merchandise",
      "Resale",
      "Limited Stock",
      "FREE DELIVERY"],
  size_types: {
    none: "",
    clothing: ["S", "M", "L", "XL", "2XL", "3XL"],
    wrist: [5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5],
    ring: [3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5],
    foot: [38, 39, 40, 41, 42, 43, 44, 45, 46],
    neck: [14, 14.5, 15, 15.5, 16, 16.5, 17, 17.5, 18, 18.5, 19, 19.5, 20, 20.5, 21, 21.5, 22, 22.5, 23, 23.5],
    art: ["12x16", "16x20", "20x28", "24x32", "16x16", "24x24", "8x16", "8x16"]
  },
  colors: ["Black", "White", "Blue", "Red", "Yellow", "Green", "Pink", "Purple"],

}


const AuctionForm = (props) => {
  const { isPending, error, mutateAsync: updateFn, data } = useAddMerchandise('https://altclan-brands-api.onrender.com/api/merchandises/', newMerchSuccess, USER_TYPES.brand)
  const dispatch = useDispatch();
  const brand_user = useSelector(selectUser)
  const router = useRouter()
  // console.log(brand_user)

  async function newMerchSuccess() {
    await router.push("/brands/profile/" + brand_user?.id);
  }

  const [formErr, setFormErr] = useState(error)
  const [formData, setFormData] = useState({
    brand_name: brand_user?.brand_name,
    merchandise_name: "",
    merchandise_type: "",
    labels: "",
    merchandise_description: "",
    merchandise_details: "",
    merchandise_gender: "",
    display_image: "",
    size_type: "",
    available_sizes: "",
    price: ""

  })
  const [sizeType, setSizeType] = useState("")
  const [availableSizes, setAvailableSizes] = useState([])
  const [availableColors, setAvailableColors] = useState([])

  const sizeInputChange = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setAvailableSizes([...availableSizes, value]);
    } else {
      setAvailableSizes(availableSizes.filter((color) => color !== value));
    }
  }
  
  const colorInputChange = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setAvailableColors([...availableColors, value]);
    } else {
      setAvailableColors(availableColors.filter((color) => color !== value));
    }
  }
  console.log("Available Sizes: ", availableSizes)
  console.log("Available Colors: ", availableColors)

  console.log("Brand User: ", brand_user)
  const { brand_name, merchandise_name, size_type, available_sizes, merchandise_gender, labels, display_image, merchandise_type, discount_price, merchandise_description, merchandise_details, price } = formData
  const [image, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);
  const [formPersonalData, setFormPersonalData] = useState(null)

  useEffect(() => {
    if (brand_user === null) {
      router.push("/brands/login");
    }

  }, [brand_user]);

  const uploadToClient = (event) => {

    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      setImage(i);
      setCreateObjectURL(URL.createObjectURL(i));

    }
  };


  //const merchError = formErr?.email || null;
  const inputChangeHandler = (e) => {
    const { name, value } = e.target
    setFormData((prevValue) => {
      return {
        ...prevValue,
        [name]: value
      }
    })
    console.log("Form Data: ", formData)
  }


  const updateMerchandise = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const imageformData = new FormData(e.target)

    let data = {}
    console.log("Submit button clicked")
    const map = formData.entries()
    for (const [key, value] of map) {
      data[key] = value
    }

    imageformData.append("file", image);
    imageformData.append("upload_preset", 'altclan')

    const imageData = await fetch('https://api.cloudinary.com/v1_1/baggieboy/image/upload', {
      method: 'POST',
      body: imageformData
    }).then(r => r.json());

    console.log("Image Form Data: ", image)
    console.log("Image Form URL: ", createObjectURL)
    console.log(data)
    console.log(imageData.url)
    console.log(imageformData)

    await updateFn(
      {
        brand_name: brand_user?.brand_name,
        merchandise_name: data.merchandise_name,
        size_type: sizeType,
        labels: data.labels,
        merchandise_gender: data.merchandise_gender,
        merchandise_description: data.merchandise_description,
        merchandise_details: data.merchandise_details,
        display_image: imageData.url,
        price: data.price,
        available_sizes: availableSizes,
        available_colors: availableColors,
        merchandise_type: data.merchandise_type
      }
    )
  }

  if (isPending) {
    console.log("Updating new merch ")
  }


  if (error) {
    console.log(error)
  }


  return (

    <form className="" onSubmit={updateMerchandise}>
      <div className={styles.loginContainer}>


        <div className={styles.columnText}>



          <p className={styles.login}>Fill in some of your product details</p>

          {error && <div id="alert-2" class="flex items-center p-4 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <svg class="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span class="sr-only">Info</span>
            <div class="mx-auto text-sm text-center font-medium">
              Something is wrong
            </div>

          </div>}

          <div>
            <label htmlFor="" className={styles.label}>Merchandise name</label>
            <input type="text" onChange={inputChangeHandler} name="merchandise_name" id="brand-name" className={styles.input} placeholder="" required />

          </div>
          <div>
            <label htmlFor="" className={styles.label}>Display image</label> <br />

            <input type="file" onChange={uploadToClient} name="file" id="file" className={styles.input} placeholder="" />

          </div>
          <div>
            <label htmlFor="" className={styles.label}>Gender</label>
            <div className="pt-2">
              <select onChange={inputChangeHandler} className={styles.input} name="merchandise_gender" id="merchandise_gender">
                <option value="">Choose merch gender</option>
                {
                  MERCH_FORM_DATA.gender.map((g) => <option key={g} value={g}>{g}</option>)
                }

              </select>

            </div>

          </div>
          <div>
            <label htmlFor="" className={styles.label}>Available colors</label>
            <div className='mx-[10%] my-2 grid grid-cols-[repeat(auto-fit,minmax(8rem,1fr))] gap-y-2'>
              {
                MERCH_FORM_DATA.colors.map((s) => <div key={s} className=' flex items-center  gap-2'>
                  <input onChange={colorInputChange} type='checkbox' className='w-4 h-4' id={s} value={s} />
                  <label className='cursor-pointer text-lg' htmlFor={s}>{s}</label>
                </div>)
              }

            </div>


          </div>
          <div>
            <label htmlFor="" className={styles.label}>Description</label>

            <textarea onChange={inputChangeHandler} type="text" name="merchandise_description" id="bio" placeholder="" className={styles.input} required></textarea>
          </div>
          <div>
            <label htmlFor="" className={styles.label}>Details </label> <br />

            <textarea onChange={inputChangeHandler} type="text" name="merchandise_details" id="bio" placeholder="" className={styles.input} required></textarea>
          </div>
          <div>
            <label htmlFor="" className={styles.label}>Category</label>
            <div className="pt-2">
              <select onChange={inputChangeHandler} className={styles.input} name="merchandise_type" id="">
                <option value="" selected disabled>Choose merch category</option>
                {
                  MERCH_FORM_DATA.categories.map((c) => <option key={c} value={c}>{c}</option>)
                }
              </select>

            </div>

          </div>
          <div>
            <label htmlFor="" className={styles.label}>Labels</label>
            <div className="pt-2">
              <select onChange={inputChangeHandler} className={styles.input} name="labels" id="">
                <option value="">Choose merch label</option>
                {
                  MERCH_FORM_DATA.labels.map((l) => <option key={l} value={l}>{l}</option>)
                }

              </select>

            </div>

          </div>
          <label htmlFor="" className={styles.label}>Size Type</label>
          <select className={styles.input} name="size_type" id="" onChange={(e) => {
            setSizeType(e.target.value)
            setAvailableSizes([])
          }}>
            <option value="" selected disabled>Select size type</option>
            {
              Object.keys(MERCH_FORM_DATA.size_types).map((st) => <option key={st} value={st}>{st}</option>)
            }

          </select>
          {sizeType === "clothing" && <div className=''>
            <label htmlFor="" className={styles.label}>Clothing Sizes</label>


            <div className='mx-[10%] my-2 grid grid-cols-[repeat(auto-fit,minmax(8rem,1fr))] gap-y-2'>
              {
                MERCH_FORM_DATA.size_types.clothing.map((s) => <div key={s} className=' flex items-center  gap-2'>
                  <input type='checkbox' name='clothing' className='w-4 h-4' id={s} onChange={sizeInputChange} value={s} />
                  <label className=' cursor-pointer text-lg' htmlFor={s}>{s}</label>
                </div>)
              }
            </div>


          </div>}

          {
            sizeType === "ring" && <div className=''>
              <label htmlFor="" className={styles.label}> Ring Sizes</label>

              <div className='mx-[10%] my-2 grid grid-cols-[repeat(auto-fit,minmax(8rem,1fr))] gap-y-2'>
                {
                  MERCH_FORM_DATA.size_types.ring.map((s) => <div key={s} className=' flex items-center  gap-2'>
                    <input type='checkbox' name='ring' className='w-4 h-4' id={s} onChange={sizeInputChange} value={s} />
                    <label className=' cursor-pointer text-lg' htmlFor={s}>{s}</label>
                  </div>)
                }
              </div>

            </div>
          }
          {sizeType === "wrist" &&
            <div>

              <label htmlFor="" className={styles.label} > Wrist Size</label>

              <div className='mx-[10%] my-2 grid grid-cols-[repeat(auto-fit,minmax(8rem,1fr))] gap-y-2'>
                {
                  MERCH_FORM_DATA.size_types.wrist.map((s) => <div key={s} className=' flex items-center  gap-2'>
                    <input type='checkbox' name='wrist' className='w-4 h-4' id={s} onChange={sizeInputChange} value={s} />
                    <label className=' cursor-pointer text-lg' htmlFor={s}>{s}</label>
                  </div>)
                }
              </div>
            </div>
          }

          {sizeType === "neck" &&
            <div>

              <label htmlFor="" className={styles.label} > Neck Size</label>

              <div className='mx-[10%] my-2 grid grid-cols-[repeat(auto-fit,minmax(8rem,1fr))] gap-y-2'>
                {
                  MERCH_FORM_DATA.size_types.neck.map((s) => <div key={s} className=' flex items-center  gap-2'>
                    <input type='checkbox' name='neck' className='w-4 h-4' id={s} onChange={sizeInputChange} value={s} />
                    <label className=' cursor-pointer text-lg' htmlFor={s}>{s}</label>
                  </div>)
                }
              </div>
            </div>
          }

          {sizeType === "foot" &&
            <div className=''>
              <label htmlFor="" className={styles.label}>Shoe Size Guide</label>

              <div className='mx-[10%] my-2 grid grid-cols-[repeat(auto-fit,minmax(8rem,1fr))] gap-y-2'>
                {
                  MERCH_FORM_DATA.size_types.foot.map((s) => <div key={s} className=' flex items-center  gap-2'>
                    <input type='checkbox' name='foot' className='w-4 h-4' id={s} onChange={sizeInputChange} value={s} />
                    <label className=' cursor-pointer text-lg' htmlFor={s}>{s}</label>
                  </div>)
                }
              </div>

            </div>
          }


          <div>

            <label htmlFor="" className={styles.label}>Price (₦)</label>
            <input type="number" onChange={inputChangeHandler} name="price" id="price" className={styles.input} placeholder="" required />

          </div>

          <button type='submit' className={styles.submit}>
            {isPending ? <Loader /> : "Submit"}
          </button>



        </div>
      </div>
    </form>


  );
}

export default AuctionForm;
