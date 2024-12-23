import React from 'react'

export default function ComingSoon() {
  return (
   
  <>
  <section x-data="{ isOpen: false }" class="w-full min-h-screen bg-white dark:bg-gray-900">
    <div class="container relative flex flex-col min-h-screen px-6 py-8 mx-auto">
     
        <section class="flex items-center flex-1">
            <div class="flex flex-col w-full ">
                <h1 class="text-5xl font-extrabold text-center lg:text-6xl 2xl:text-7xl">
                    <span class="text-transparent bg-gradient-to-br bg-clip-text from-teal-500 via-indigo-500 to-sky-500 dark:from-teal-200 dark:via-indigo-300 dark:to-sky-500">
                        Coming
                    </span>

                    <span class="text-transparent bg-gradient-to-tr bg-clip-text from-blue-500 via-pink-500 to-red-500 dark:from-sky-300 dark:via-pink-300 dark:to-red-500">
                        Soon
                    </span>
                </h1>

                <p style={{fontFamily:'Arial' }} class="max-w-3xl mx-auto mt-6 text-sm text-center text-gray-700 dark:text-white md:text-xl">
                
🌟 Exciting News Coming Soon! 🌟

We're brewing something special behind the scenes. Stay tuned for our big reveal – it's going to be worth the wait!
 Keep checking back for updates. 🚀
                </p>

                <div class="flex flex-col mt-8 space-y-3 sm:-mx-2 sm:flex-row sm:justify-center sm:space-y-0">
                    <input id="email" type="text" class="px-6 py-3 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring sm:mx-2" placeholder="Email Address" />

                    <button class="px-8 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-black rounded-md hover:bg-blue-600 focus:bg-blue-600 focus:outline-none sm:mx-2">
                        Notify Me
                    </button>
                </div>

                <p class="mt-8 text-center text-gray-700 dark:text-white text-md md:text-xl">Notify me when App is launched :)</p>
            </div>
        </section>

    </div>
</section>
  </>
  )
}
