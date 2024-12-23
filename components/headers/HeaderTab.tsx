import React, { useEffect, useState } from 'react';
import Link from 'next/link'
import styles from "./header.module.css";

export default function HeaderTab() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    // <div className="flex justify-center text-sm font-medium text-center text-gray-900 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
    //     <ul className="flex">
    //         <li className="mr-2">
    //             <Link href="/brands" className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 text-gray-700 dark:hover:text-gray-300">Brands</Link>
    //         </li>
    //         <li className="mr-2">
    //             <Link href="/products" className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 text-gray-700 dark:hover:text-gray-300">Explore</Link>
    //         </li>
    //           <li className="mr-2">
    //             <Link href="/products?q=whats-new" className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 text-gray-700 hover:border-gray-300 dark:hover:text-gray-300">Whats New?</Link>
    //         </li>
        
            
    //     </ul>
    // </div>

    <div style={{fontFamily:'Poppins, Sans-serif', color:"black", lineHeight:'100%', letterSpacing:1, fontWeight:'bold'}} className={isScrolled ? `${styles.navbar} ${styles.scrolled}` : styles.navbar}>
      <Link href="/products" className={styles.a}>explore</Link>
      <Link href="/brands" className={styles.a}>brands</Link>
      <Link href="/communities" className={styles.a}> communities</Link>
      <Link href="/collections" className={styles.a}>categories</Link>
    </div>
    
  )
}
