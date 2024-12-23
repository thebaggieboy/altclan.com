import { Analytics } from '@vercel/analytics/react';
import Footer from './Footer'
import HeaderNav from './headers/HeaderNav'


import { useEffect, useRef } from 'react'
import { fetchUser } from '../lib/fetchUser'
import { selectUser, setUser } from '../features/user/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'


export default function Layout({
  children,

}: {
  children: React.ReactNode
}) {
  const dispatch = useDispatch()
  const router = useRouter()

  const ref = useRef("");
  const topRef = useRef(null);
  const handleScroll = () => {
    console.log("Scrolling to the top")
    window.scrollBy({
      top: topRef?.current.getBoundingClientRect().top - window.pageYOffset,
      left: 0,
      behavior: 'smooth',
    });
  };
  useEffect(() => {
    ref.current = router.asPath;
   
  }, [router.asPath]);

  useEffect(() => {
    async function getUser() {
      try {
        const user = await fetchUser()
        console.log("User: ", user)
        //dispatch(setUser(user))
      } catch (error) {
        console.log(error)
      }
    }
    getUser()
  }, [])

  return (
    <>
    <div id="backToTop">

    </div>


    <div className="fixed bottom-0 right-0 p-4">
  <button className="bg-gray-800 text-white rounded-full w-10 h-10 flex items-center justify-center" onClick={handleScroll}>
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
    </svg>
  </button>
</div>
      <HeaderNav />
      {children}
      <Analytics />
     
    </>
  )
}
