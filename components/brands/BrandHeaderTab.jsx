import { Fragment, useState } from 'react'
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
import Link from 'next/link';
import styles from "../../styles/brand.module.css";





export default function BrandHeaderTab() {
 
  return (
    
<div>

  <div className={styles.breadcrumbs}>
    <nav className="flex p-5" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <Link href="/" className={styles.link}>
            {/* <svg aria-hidden="true" className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg> */}
            Home
          </Link>
        </li>
        <li>
          <div className="flex items-center">
            |
            <Link href="/brands" className={styles.link}>Brands</Link>
          </div>
        </li>

        <li aria-current="page">
          <div className="flex items-center">
            |
            <span className={styles.active}>All</span>
          </div>
        </li>
      </ol>
    </nav>
  </div>

  <div className={styles.nav}> 
    <ul className={styles.centered}>
        <li className={styles.navLink}>
            <Link href="/brands?q=top">Best Sellers</Link>
        </li>
        <li className={styles.navLink}>
            <Link href="/brands?q=upcoming">Upcoming Brands</Link>
        </li>
        <li className={styles.navLink}>
            <Link href="/brands?q=rated">Top Rated</Link>
        </li>
        
    </ul>
  </div>

</div>

    
  )
}
