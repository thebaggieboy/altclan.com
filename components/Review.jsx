import React, {useState} from 'react'
import styles from '../styles/brand-bio.module.css'
import { useRouter } from 'next/router'


export default function Create() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    review: "",
  })

  const { email,review } = formData

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


  const addReview = async()=>{

    const url = 'https://altclan-api.onrender.com/api/reviews/'
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({email:email, review:review}),
      headers: {
          "Content-Type": "application/json"
      },
  })

  const data = await res.json()

  if (res.status >= 200 && res.status <= 209) {
    console.log("review POSTED")
    router.push("#")

      conosole.log(data)
  }

  const err = { ...data }
  throw { err }
   
  }


  return (
    <>
    <section style={{padding:20}}>
         
<form onSubmit={addReview}>
  <label for="message" style={{fontSize:20, fontWeight:'bold', fontFamily:"Poppins, Sans-Serif"}} class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your review</label> <br />
  <textarea onChange={inputChangeHandler} id="message" rows="4" class="block p-5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a comment..."></textarea>
</form>
        <button
							type="submit"
							className="mt-10 flex  items-center justify-center rounded-md border border-black bg-white px-8 py-3  font-medium text-dark  focus:ring-black"
							>
							Submit
					</button>
        </section>
    </>
  )
}
