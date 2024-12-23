import React, { useState, useEffect, Component } from 'react';
import Category from "../../components/Category"
import styles from "../../styles/category.module.css";
import Head from "next/head"

import { useRouter } from "next/router";

const products = [


  {
    id: 1,
    name: "Tees",
    href: "/products?q=Tees",
    price: "$48",
    imageSrc: "/img/tees.jpg",
    imageAlt:
      "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
  },
  {
    id: 2,
    name: "Rings",
    href: "/products?q=Rings",
    price: "$35",
    imageSrc: "/img/rings.jpg",
    imageAlt:
      "Olive drab green insulated bottle with flared screw lid and flat top.",
  },
  {
    id: 3,
    name: "Jeans",
    href: "/products?q=Jeans",
    price: "$89",
    imageSrc: "/img/jeans.jpg",
    imageAlt:
      "Person using a pen to cross a task off a productivity paper card.",
  },
  {
    id: 4,
    name: "Sweaters",
    href: "/products?q=Sweaters",
    price: "$35",
    imageSrc: "/img/sweaters.jpg",
    imageAlt:
      "Hand holding black machined steel mechanical pencil with brass tip and top.",
  },
  {
    id: 5,
    name: "Glasses",
    href: "/products?q=Shades",
    price: "$35",
    imageSrc: "/img/shades.jpg",
    imageAlt:
      "Hand holding black machined steel mechanical pencil with brass tip and top.",
  },
  {
    id: 6,
    name: "Jackets",
    href: "#",
    price: "$35",
    imageSrc: "/img/jackets.jpg",
    imageAlt:
      "Hand holding black machined steel mechanical pencil with brass tip and top.",
  },
  {
    id: 7,
    name: "Bags",
    href: "/products?q=Bags",
    price: "$35",
    imageSrc: "/img/bag.jpg",
    imageAlt:
      "Hand holding black machined steel mechanical pencil with brass tip and top.",
  },
  {
    id: 8,
    name: "Caps",
    href: "/products?q=Caps",
    price: "$35",
    imageSrc: "/img/cap.jpg",
    imageAlt:
      "Hand holding black machined steel mechanical pencil with brass tip and top.",
  },
  {
    id: 9,
    name: "Pendants",
    href: "/products?q=Pendants",
    price: "$35",
    imageSrc: "/img/rip.jpg",
    imageAlt:
      "Hand holding black machined steel mechanical pencil with brass tip and top.",
  },
  {
    id: 10,
    name: "Bracelets",
    href: "/products?q=Bracelets",
    price: "$35",
    imageSrc: "/img/bracelets.webp",
    imageAlt:
      "Hand holding black machined steel mechanical pencil with brass tip and top.",
  },
  {
    id: 11,
    name: "Hoodies",
    href: "/products?q=Hoodies",
    price: "$35",
    imageSrc: "/img/hoodie.jpg",
    imageAlt:
      "Hand holding black machined steel mechanical pencil with brass tip and top.",
  },
  {
    id: 12,
    name: "Masks",
    href: "/products?q=Masks",
    price: "$35",
    imageSrc: "/img/maskk.jpg",
    imageAlt:
      "Hand holding black machined steel mechanical pencil with brass tip and top.",
  },
  {
    id: 13,
    name: "Lumberjacks",
    href: "/products?q=Lumberjacks",
    price: "$35",
    imageSrc: "/img/lmbg.jpeg",
    imageAlt:
      "Hand holding black machined steel mechanical pencil with brass tip and top.",
  },

  
  {
    id: 15,
    name: "Baggy wears",
    href: "/products?q=Baggy wears",
    price: "$35",
    imageSrc: "/img/baggy.webp",
    imageAlt:
      "Hand holding black machined steel mechanical pencil with brass tip and top.",
  },
  {
    id: 17,
    name: "Denim",
    href: "/products?q=Denim",
    price: "$35",
    imageSrc: "/img/denim.jpeg",
    imageAlt:
      "Hand holding black machined steel mechanical pencil with brass tip and top.",
  },

  {
    id: 18,
    name: "Native Wears",
    href: "/products?q=Native",
    price: "$35",
    imageSrc: "/img/nt.jpg",
    imageAlt:
      "Hand holding black machined steel mechanical pencil with brass tip and top.",
  },
  {
    id: 19,
    name: "Sneakers",
    href: "/products?q=Sneakers",
    price: "$35",
    imageSrc: "/img/tt.webp",
    imageAlt:
      "Hand holding black machined steel mechanical pencil with brass tip and top.",
  },

  {
    id: 20,
    name: "Studs",
    href: "/products?q=Studs",
    price: "$35",
    imageSrc: "/img/studs.jpg",
    imageAlt:
      "Hand holding black machined steel mechanical pencil with brass tip and top.",
  },
  {
    id: 21,
    name: "Belt",
    href: "/products?q=Caps",
    price: "$35",
    imageSrc: "/img/belt.webp",
    imageAlt:
      "Hand holding black machined steel mechanical pencil with brass tip and top.",
  },

];


export default function Collection() {
  const router = useRouter()
  return (
    <>
      <Head>
       <title>Search for merch</title>
            <meta charset="UTF-8" />
            <meta
              name="description"
              content="Collections -  Select your merchandise category."
            />
              <meta name="keywords"
                    content="altclan, altclan login, login, fashion, community, aesthetics, enigmas, arts, merchandises,  clothing, rings, accessories" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/alteclan_logo.jpg" />
       </Head> 
       <div className="ml-5 p-2">
   <button type="button" onClick={()=> router.back()} class="w-full flex items-center justify-center w-1/2 px-5 py-2 text-sm text-black transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700">
    <svg class="w-5 h-5 rtl:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
    </svg>
    <span>Go back</span>
</button>
   </div>
    <div className={styles.content}>
  
        <div className="grid sm:grid-cols-3 gap-12  mx-auto">
        {products.map((product) => (
          <div key={product.id} className={styles.card}>
            <div className={styles.container}>
              <h4>
                <b>
                  {product.name}
                </b>
              </h4> 
              <a key={product.id} href={product.href}>
                View all
              </a>
            </div>

            <img
              src={product.imageSrc}
              alt={product.imageAlt}
            />
          </div>
        ))}
        </div>
    </div>
    </>
  )
}
