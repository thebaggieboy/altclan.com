import React from 'react'
import ReactMarkdown from "react-markdown";
 
export async function getServerSideProps(context) {
  const id = context.params.id
  const res = await fetch(`https://altclan-brands-api.onrender.com/api/blog/${id}`)
  //const res = await fetch(`http://127.0.0.1:8000/api/brand_profile/${id}`);
  const data = await res.json()
  console.log(data)

  return {
    props: {blog:data}
  }

}


export default function Detail({blog}) {
  return (
    <>
 
<aside aria-label="Recent Posts" class="mx-auto mt-10 max-w-screen-xl">
  <div class="mx-auto max-w-screen-xl px-4 md:px-8">
  
    <div class="mb-10 md:mb-16">
      <h2 class="mb-4 mx-auto max-w-screen-md  text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">{blog.title}</h2>
      <p class="mx-auto max-w-screen-md text-gray-500 md:text-lg">
{blog.text}
       </p>
    </div>
   

    <div class="grid gap-8 sm:grid-cols-2 sm:gap-12 lg:grid-cols-2 xl:grid-cols-2 xl:gap-16">

   
     
    
 
    </div>
  </div>
</aside>

    </>
  )
}
