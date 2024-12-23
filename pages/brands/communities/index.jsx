import React from 'react';
import { io } from "socket.io-client";


const data = [
  {id:1, community_name: "Gothic Affairs", name: "", followers:[]},
  {id:2, community_name: "Altemen", name: "", followers:[]},
  {id:3, community_name: "Aesthetic Paradise", name: "", followers:[]},
  {id:4, community_name: "The unruly club", name: "", followers:[]},
  {id:5, community_name: "Leather Jackets", name: "", followers:[]}
]

const Communities = () => {
    return (
      <>
        <div className="ml-2">
   <button type="button" onClick={()=> router.back()} class="w-full flex items-center justify-center w-1/2 px-5 py-2 text-sm text-black transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700">
    <svg class="w-5 h-5 rtl:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
    </svg>
    <span>Go back</span>
</button>
   </div>
      
        <div className="p-5">
        <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Explore communities</h1>
        <p class="mb-6 text-xs font-normal text-gray-500 ">
            
        Communities are independent hubs, galleries & spaces on Altclan that curate, promote, and sell artworks.
        
            .</p>
        <div class="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
    <ul class="flex flex-wrap -mb-px">
        <li class="me-2">
            <a href="#" class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">Top Communities</a>
        </li>
        <li class="me-2">
            <a href="#" class="inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500" aria-current="page">Trending</a>
        </li>
       
    
    </ul>
</div>
    </div>

        

<section className='p-5'>

<div class="lg:order-first">
                      <div class="flex flex-col">
                        <div style={{backgroundColor: 'beige'}} class="p-5 rounded-3xl  ring-1 ring-white/10 shadow-sm">
                          <div class="flex justify-between">
                            <div class="flex items-center gap-3">
                              <svg class="w-8 h-8 text-black rounded-full" viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="280" height="280" rx="32" fill="#d1cfdf"></rect>
                                <g clip-path="url(#clip0_501_1489)">
                                  <path d="M196.064 183.936L152.127 140L196.064 96.0636L240 140L196.064 183.936ZM83.9364 183.936L40 140L83.9364 96.0636L127.873 140L83.9364 183.936ZM140 240L96.0636 196.064L140 152.127L183.936 196.064L140 240ZM140 127.873L96.0636 83.9364L140 40L183.936 83.9364L140 127.873Z" fill="currentColor"></path>
                                </g>
                                <defs>
                                  <clipPath id="clip0_501_1489">
                                    <rect width="200" height="200" fill="white" transform="translate(40 40)"></rect>
                                  </clipPath>
                                </defs>
                              </svg>
                              <p class="text-black font-semibold">
                                Community Name
                              </p>
                            </div>
                        
                          </div>
                          <p class="mt-4 text-xs text-black">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever
                             since the 1500s.
                          </p>
                          <div class="flex mt-6">
                            <a class="items-center tetxt-xs justify-between inline-flex p-3 font-medium  text-center text-black duration-200 bg-white/5 border border-white/5 rounded-xl h-14  focus:outline-none focus-visible:outline-black text-base focus-visible:ring-black" href="#">
                            <span>→</span> Join community 
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>


</section>

      </>
    );
}

export default Communities;
