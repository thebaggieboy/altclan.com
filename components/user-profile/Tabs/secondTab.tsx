/* eslint-disable react-hooks/rules-of-hooks */
// @ts-nocheck

import React, { useState, useEffect } from 'react';
import styles from ".//secondTab.module.css";
import Address from '../Address/Address';
import Settings from '../Settings/Settings';

const secondTab = () => {
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
            <button id="defaultOpen" onClick={(evt) => handleTabClick(evt, 'Address')}>
                Address Book
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 17 29" fill="none">
                    <path d="M2 2L14.5 14.5L2 27" stroke="black" stroke-width="3.75" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>

            <button onClick={(evt) => handleTabClick(evt, 'Account')}>
                Account Settings
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 17 29" fill="none">
                    <path d="M2 2L14.5 14.5L2 27" stroke="black" stroke-width="3.75" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>

            <button>
                Close Account
            </button>
           
        </div>

        <div id="Address" className="tabcontent">
            <Address />
        </div>

        <div id="Account" className="tabcontent">
            <Settings />
        </div>
    </div>
  );
};

export default secondTab;