import BrandHeader from "../../components/brands/brandHeader";
import BrandHeaderTab from "../../components/brands/BrandHeaderTab"
import styles from "../../styles/brand.module.css";
import useBrands from '../../hooks/useBrands'
import useData from '../../hooks/useData'
import Link from "next/link";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Head from 'next/head'
import { useRouter } from "next/router";
import HeaderTab from "../../components/headers/HeaderTab";
export default function Brands() {
  const [searchQuery, setSearchQuery] = useState('');
  // Results of the search query in an array
  const [filteredSearch, setFilteredSearch] = useState([]);
  const [searchResult, setSearchResult] = useState([])
  const [brandResult, setBrandResult] = useState([])
  const [loading, setLoading] = useState(true)
	const searchParams = useSearchParams();
	const brand = searchParams.get('brand')
	console.log(brand)
	const router = useRouter()
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

 async function fetchBrands() {
  const res =  await fetch(`https://altclan-brands-api-1-1.onrender.com/api/users/`, {
    method: "GET",
    headers: {

      "Content-Type": "application/json",
    },
    
    credentials: "include"

  })
  const data =  await res?.json()
  setBrandResult(data)
  console.log("Brands: ", brandResult)
  setLoading(false)


}

fetchBrands()

  //console.log(data)
  if (loading == true) {
    return (
      <>
      
      <Head>
       <title>Altclan - alternative fashion brands</title>
            <meta charset="UTF-8" />
            <meta name="robots" content="follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large"/>
            <meta
              name="description"
              content="Explore alternative fashion brands"
            />
              <meta name="keywords"
                    content="altclan, altclan login, login, altclan signup, login altclan" />
                    <meta name="author" content="Altclan"></meta>
            {/* OpenGraph Meta Tags */}
            <meta property="og:title" content="Alternative Fashion Brands - ALTCLAN" />
            <meta property="og:description" content="Explore alternative fashion brands and discover unique styles on ALTCLAN" />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://altclan.com/brands" />
            <meta property="og:site_name" content="ALTCLAN" />
            
            {/* Twitter Meta Tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="Alternative Fashion Brands - ALTCLAN" />
            <meta name="twitter:description" content="Explore alternative fashion brands and discover unique styles on ALTCLAN" />
            <meta name="twitter:site" content="@altclan" />
            <meta name="twitter:creator" content="@altclan" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/alteclan_logo.jpg" />
            <script src="https://upload-widget.cloudinary.com/latest/global/all.js" type="text/javascript"></script>  

       </Head> 

      <div className="mt-3 p-5 text-center">
      <br />

      <div
        role="status"
        className="animate-pulse space-y-8 md:flex md:items-center md:space-x-8 md:space-y-0"
      >
        <div className="flex h-48 w-full items-center justify-center rounded bg-gray-300 dark:bg-gray-700 sm:w-96">
          <svg
            className="h-10 w-10 text-gray-200 dark:text-gray-600"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 18"
          >
            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
          </svg>
        </div>
        <div className="w-full">
          <div className="mb-4 h-2.5 w-48 rounded-full bg-gray-200 dark:bg-gray-700"></div>
          <div className="mb-2.5 h-2 max-w-[480px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
          <div className="mb-2.5 h-2 rounded-full bg-gray-200 dark:bg-gray-700"></div>
          <div className="mb-2.5 h-2 max-w-[440px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
          <div className="mb-2.5 h-2 max-w-[460px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
          <div className="h-2 max-w-[360px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
        </div>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
    </>
    )

  }
  if(brandResult === null){
    return(
      <p>There are no brands yet</p>
    )
  }



  return (
 <>
 <HeaderTab/>
 <div className="bg-white">
  
      
  <div className="max-w-2xl px-4 py-10 mx-auto sm:px-6 lg:max-w-7xl lg:px-8">

   <h1 className="bold text-xl mt-4">Brands</h1> <br/>
    


    <div className="grid pt-1 grid-cols-2 gap-y-4 gap-x-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-20">
      
      {brandResult?.map((brand) => (
        <Link key={brand.id} href={`/brands/${brand.id}?brand=${brand.brand_name}`} className="group">
          <div className="w-full overflow-hidden bg-gray-200 aspect-w-1 aspect-h-1 xl:aspect-w-4 xl:aspect-h-4">
            <img
              src={brand.brand_logo}
              alt={brand.imageAlt}
              className="object-cover object-center w-full h-full group-hover:opacity-75"
            />
          </div>
          <svg className={styles.rightContent} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="star"><path fill="none" stroke="#200E32" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10.2135354,0.441329894 L12.5301907,5.09668871 C12.6437709,5.3306716 12.8673229,5.49423715 13.1274534,5.53368599 L18.3127795,6.28282419 C18.5232013,6.31151358 18.713271,6.4218659 18.8407265,6.58934431 C18.9681821,6.75682272 19.0224584,6.9675444 18.9914871,7.17465538 C18.9654336,7.34490401 18.8826605,7.50177662 18.7562018,7.62057098 L15.0006864,11.2592422 C14.8108765,11.4385657 14.7257803,11.7002187 14.7744505,11.9548706 L15.679394,17.0828999 C15.7448774,17.5054355 15.4552147,17.9019154 15.0278347,17.9747311 C14.8516089,18.001936 14.6711642,17.9738576 14.5120169,17.8944663 L9.88775575,15.4776038 C9.65675721,15.3522485 9.37670064,15.3522485 9.1457021,15.4776038 L4.49429266,17.9123029 C4.1040442,18.1096521 3.62530757,17.962958 3.41740993,17.5823254 C3.33635184,17.4288523 3.30778438,17.2536748 3.33596502,17.0828999 L4.24090849,11.9548706 C4.28467865,11.7005405 4.20030563,11.441111 4.01467262,11.2592422 L0.23200891,7.62057098 C-0.0773363034,7.31150312 -0.0773363034,6.81484985 0.23200891,6.50578199 C0.358259148,6.3905834 0.515216648,6.31324177 0.684480646,6.28282419 L5.86980673,5.53368599 C6.12870837,5.49136141 6.35105151,5.32868032 6.46706943,5.09668871 L8.78372471,0.441329894 C8.87526213,0.25256864 9.04026912,0.108236628 9.24131794,0.0410719808 C9.44236677,-0.0260926667 9.66241783,-0.0103975019 9.85155801,0.0845974179 C10.0076083,0.16259069 10.1343954,0.287540724 10.2135354,0.441329894 Z" transform="translate(2.5 3)"></path></svg>
          <h3 className={styles.brandName}>
            {brand?.brand_name }
          </h3>
          <p className={styles.followers}>{brand.brand_type}</p>
        </Link>
        
      ))}
    </div>
  </div>
  <br/>
</div>
 </>
  )
}