import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {React,  Fragment, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { USER_TYPES, selectUser, selectUserType, setUser } from "../../features/user/userSlice";
import { useRouter } from "next/router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import * as commands from "@uiw/react-md-editor/commands"

import useBlog from '../../hooks/useBlog';

const MDEditor = dynamic(
    () => import("@uiw/react-md-editor"),
    { ssr: false }
  );
  

export default function Blog() {
    const user = useSelector(selectUser)
    const router = useRouter();
	const isBrand = useSelector(selectUserType) === USER_TYPES.brand
    const { data, loading, error } = useBlog('https://altclan-brands-api.onrender.com/api/blog/');
    console.log("Data: ", data)
  const [value, setValue] = useState("**Hello world!!!**");
    useEffect(() => {
		
	
	}, [user])

  if(data?.length < 1 ){
    return(
      <div className="p-10 mt-5 text-lg border shadow-sm" style={{fontFamily:'Poppins'}}>
      <p>No Articles Posted Yet! </p>
    </div>
    )
  }

  
  if(data == undefined || data == null ){
    return(
      <div className="p-10 mt-5 text-lg border shadow-sm" style={{fontFamily:'Poppins'}}>
        <p>No Articles or <span className="text-red-400">Network Timeout!</span> <br /> Please refresh the page and try again</p>
      </div>
    )
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

  

   <section class="bg-white dark:bg-gray-900">
  <div class="max-w-screen-xl pt-5 text-center">
  {user ? <a href='/blog/create/' style={{backgroundColor:'black', color:'white', padding:10}}>Write article</a> : <a href='/brands/login' style={{backgroundColor:'black', color:'white', padding:10}}>Login to create new article</a>}
      <div class="grid gap-8 lg:grid-cols-2 p-5">
    
      {data.map((article)=>(
        <Link key={article?.id} href={`/blog/detail/${article?.id}`}>
       <article key={article?.id} class="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
       <di key={article?.id}v class="flex justify-between items-center mb-5 text-gray-500">
           <span class="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
               <svg class="mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clip-rule="evenodd"></path><path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"></path></svg>
               Article
           </span>
           <span class="text-sm">14 days ago</span>
       </di>
       <h2 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"><a href="#">{article.title}</a></h2>
    
       <div class="flex justify-between items-center">
   
           <a href="#" class="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline">
               Read more
               <svg class="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
           </a>
       </div>
   </article>  
   </Link>    
))}         
      </div>  
  </div>


</section> 
    </>
  )
}
