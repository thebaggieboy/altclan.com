import React, { useState, useEffect } from "react";
import Link from 'next/link'
import { useRouter } from 'next/router'



const data = [
  {id:1, community_name: "Gothic Affairs", members:[], logo:''},
  {id:2, community_name: "Altemen", members:[], logo:''},
  {id:3, community_name: "Aesthetic Paradise", members:[], logo:''},
  {id:4, community_name: "The unruly club", members:[], logo:''},
  {id:5, community_name: "Leather Jackets", members:[], logo:''}
]
export default function Communities() {
  const router = useRouter()
  const [joinText, setJoinText] = useState("Join")
  const [communityClicked, setCommunityClicked] = useState(false) 

  const joinCommunity = ()=>{
    console.log("Join Community")
    setJoinText("Joined")
  }

  return (
    <>
<div style={{lineHeight:'100%', letterSpacing:2}}>
<div className="">
<div className="ml-5 mt-2">
   <button type="button" onClick={()=> router.back()} class="w-full flex items-center justify-center w-1/2 px-5 py-2 text-sm text-black transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700">
    <svg class="w-5 h-5 rtl:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
    </svg>
    <span>Go back</span>
</button>
   </div>
<h1 className='font-semibold ml-10 text-2xl pt-5'>Explore Communities</h1>
<h2 className='font-semibold ml-10 text-1xl pt-10'>Recommended for you</h2></div> <br />
<div class="grid p-10 grid-cols-1 bg-gray-50 grid-rows-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">


 {data?.map(community => (
  <>
      <div
    class="me-4 mb-5 p-2 hover:bg-gray-800  hover:text-white shadow-sm shadow-black block border rounded-lg bg-white bg-surface-dark  shadow-secondary-1 text-surface">
      <button className='p-3 text-yellow-100 font-bold' onClick={joinCommunity} style={{backgroundColor:'black', color:'beige', borderRadius:30, width:70, float:'right'}}>{joinText}</button> <br />
   <Link href={`/communities/${community?.id}`}>
   <div class="p-5 mb-4">


 <div className='flex'>
 <span><img class="w-10 h-12 rounded-full" src="/alteclan_logo.jpg" alt="Rounded avatar"/> </span> <span className='font-bold text-lg pt-3 pl-2'>{community?.community_name}</span>
 </div>
  
  <p class=" text-xs font-semibold mt-2 ml-3">
   13k Members
  </p>

  

  <p class=" text-xs mt-2 ml-3">
    A community connecting lovers of goth clothing
  </p>

  

</div>
   </Link>
  </div>
  </>
 ))}

 

   
</div>
</div>
    </>
  )
}
