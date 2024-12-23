import React, {useState} from 'react'
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import * as commands from "@uiw/react-md-editor/commands"
import { useDispatch, useSelector } from "react-redux";
import { USER_TYPES, selectUser, selectUserType, setUser } from "../../../features/user/userSlice";
import { useRouter } from "next/router";

import styles from '../../../styles/brand-bio.module.css'
import useBlog from '../../../hooks/useBlog';


const MDEditor = dynamic(
    () => import("@uiw/react-md-editor"),
    { ssr: false}
  );
  


export default function Create() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [formData, setFormData] = useState({
		title: "",
	})
  const user = useSelector(selectUser)

const isBrand = useSelector(selectUserType) === USER_TYPES.brand

const { data, loading, error } = useBlog('https://altclan-brands-api.onrender.com/api/blog/');

  const submit = async(e)=>{
    e.preventDefault()
    console.log('Article submit button clicked')
    console.log(value)
    const res = await fetch('https://altclan-brands-api.onrender.com/api/blog/', {
      method: "POST",
      body: JSON.stringify({user_email:user?.brand_name, title:title, text:value} ),
      headers: {
          "Content-Type": "application/json"
      },
  })

  const data = await res.json()
  console.log("Blog posted successfully")
  if (res.status >= 200 && res.status <= 209) {
    return data
  
}
const err = { ...data }
console.log(err)
//throw { err }

router.push('/blog/')
}

    const inputChangeHandler = (e) => {
        const { name, value } = e.target
        setFormData((prevValue) => {
          return {
            ...prevValue,
            [name]: value
          }
        })
        setTitle(value)
        console.log("Title: ", title)
        console.log("Value: ", value)
      }


    	if (loading) {
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
    
      if (error) {
        return <p> {error.message}</p>;
      }
    
 
      
  return (
    <>
    <section style={{padding:20}}>
      <form onSubmit={submit}>

      <div style={{textAlign:'center', border:0, borderWidth:0}}>
        <input onChange={inputChangeHandler} type="text" name='title' style={{ border:'none', borderWidth:0, padding:10}} placeholder='Article title' />
      </div>

      <div data-color-mode="light" className='p-5'>
        <div className="wmde-markdown-var"> </div>

        <MDEditor preview="edit" name="text" value={value}  onChange={setValue} />
      </div> 

      <button style={{backgroundColor:'black'}} className='ml-5 text-white p-3' type="submit">Submit Article</button>  
      </form> 
    </section> <br /><br />


    </>
  )
}
