/* eslint-disable react-hooks/rules-of-hooks */
// @ts-nocheck

import React, { useState, useEffect } from 'react';
import styles from "../../../styles/Users/userProfile.module.css";
import Orders from '../Orders/orders';
import Ratings from '../Ratings/Ratings';
import Vouchers from '../Vouchers/Vouchers';
import Saved from '../Saved/Saved';
import Followed from '../Followed/Followed';

const mainTab = () => {
    const [activeTab, setActiveTab] = useState('defaultOpen');

    useEffect(() => {
        document.getElementById(activeTab)?.click();
    }, [activeTab]);

    const handleTabClick = (evt: /* eslint-disable react-hooks/rules-of-hooks */
      React.MouseEvent<HTMLButtonElement, MouseEvent>, tabId: React.SetStateAction<string>) => {
        setActiveTab(tabId);

        const tabcontent = document.getElementsByClassName('tabcontent');
        for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = 'none';
        }

        const tablinks = document.getElementsByClassName('tablinks');
            for (let i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(' active', '');
        }

        document.getElementById(tabId).style.display = 'block';
        evt.currentTarget.className += ' active';
    };

  return (
    <div>
        
        <div className={styles.tablinks}>
            <button id="defaultOpen" onClick={(evt) => handleTabClick(evt, 'Orders')}>
                Orders
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 17 29" fill="none">
                    <path d="M2 2L14.5 14.5L2 27" stroke="black" stroke-width="3.75" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>

            <button onClick={(evt) => handleTabClick(evt, 'Ratings')}>
                Ratings & Reviews
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 17 29" fill="none">
                    <path d="M2 2L14.5 14.5L2 27" stroke="black" stroke-width="3.75" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>

            <button onClick={(evt) => handleTabClick(evt, 'Vouchers')}>
                Vouchers
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 17 29" fill="none">
                    <path d="M2 2L14.5 14.5L2 27" stroke="black" stroke-width="3.75" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>

            <button onClick={(evt) => handleTabClick(evt, 'Saved')}>
                Saved Items
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 17 29" fill="none">
                    <path d="M2 2L14.5 14.5L2 27" stroke="black" stroke-width="3.75" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>

            <button onClick={(evt) => handleTabClick(evt, 'Followed')}>
                Followed Sellers
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 17 29" fill="none">
                    <path d="M2 2L14.5 14.5L2 27" stroke="black" stroke-width="3.75" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
        </div>

        <div id="Orders" className="tabcontent">
            <Orders />
        </div>

        <div id="Ratings" className="tabcontent">
            <Ratings />
        </div>

        <div id="Vouchers" className="tabcontent">
            <Vouchers />
        </div>

        <div id="Saved" className="tabcontent">
            <Saved />
        </div>

        <div id="Followed" className="tabcontent">
           <Followed />
        </div>
    </div>
  );
};

export default mainTab;