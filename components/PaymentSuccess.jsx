import React from 'react'
import Head from 'next/head';
export default function PaymentSuccess() {
  return (
    <div>
      <div className="bg-gray-100 h-screen" style={{fontFamily:"Poppins, Sans-serif", lineHeight:'100%', letterSpacing:1}}>
        <div className="bg-white p-6  md:mx-auto">
          <Head>
            {/* OpenGraph Meta Tags */}
            <meta property="og:title" content="Payment Success - ALTCLAN" />
            <meta property="og:description" content="Your payment was successful on ALTCLAN" />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://altclan.com/payment-success" />
            <meta property="og:site_name" content="ALTCLAN" />
            
            {/* Twitter Meta Tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="Payment Success - ALTCLAN" />
            <meta name="twitter:description" content="Your payment was successful on ALTCLAN" />
            <meta name="twitter:site" content="@altclan" />
            <meta name="twitter:creator" content="@altclan" />
          </Head>
          <svg viewBox="0 0 24 24" className="text-green-600 w-16 h-16 mx-auto my-6">
            <path fill="currentColor"
              d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
            </path>
          </svg>
          <div className="text-center">
            <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">Payment Done!</h3>
            <p className="text-gray-600 my-2">Thank you for completing your secure online payment.</p>
            <p> Have a great day!  </p> <br />
            <div className="py-5 text-center">
              <a href="/products" className="px-12 bg-black text-white font-semibold py-4">
                Continue shopping
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
