import React, { useEffect } from 'react';
import styles from './Tab.module.css';
import { FaUser, FaBox, FaHeart, FaCreditCard, FaAddressBook, FaSignOutAlt } from 'react-icons/fa';
import OrdersTable from "./content/orders/orders";
import Payment from "./content/Payment/payment"

const Tabs = () => {
  const openOption = (evt, optionName) => {
    const tabcontent = document.getElementsByClassName(styles.tabcontent);
    for (let i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    const tablinks = document.getElementsByClassName(styles.tablinks);
    for (let i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(` ${styles.active}`, "");
    }
    document.getElementById(optionName).style.display = "block";
    evt.currentTarget.className += ` ${styles.active}`;
  };

  useEffect(() => {
    document.getElementById("defaultOpen").click();
  }, []);

  return (
    <div className={`${styles.orderTabsContainer}`}>
        <div className={styles.tab}>
            <button
              className={`${styles.tablinks}`}
              onClick={(e) => openOption(e, 'Account')}
            >
              <FaUser /> Account Information
            </button>

            <button
              className={`${styles.tablinks}`}
              onClick={(e) => openOption(e, 'Orders')}
            >
              <FaBox /> Orders
            </button>

            <button
              className={`${styles.tablinks}`}
              onClick={(e) => openOption(e, 'Wishlist')}
            >
              <FaHeart /> Wishlist
            </button>

            <button
              className={`${styles.tablinks}`}
              onClick={(e) => openOption(e, 'Payment')}
              id="defaultOpen"
            >
              <FaCreditCard /> Payment Method
            </button>

            <button
              className={`${styles.tablinks}`}
              onClick={(e) => openOption(e, 'Addresses')}
            >
              <FaAddressBook /> Addresses
            </button>

            <button
              className={`${styles.tablinkslogout}`}
            >
              <FaSignOutAlt /> Logout
            </button>
        </div>

      <div id="Account" className={`${styles.tabcontent}`}>
        <h3>Account</h3>
      </div>

      <div id="Orders" className={`${styles.tabcontent}`}>
        <OrdersTable />
      </div>

      <div id="Wishlist" className={`${styles.tabcontent}`}>
        <h3>Wishlist</h3>
      </div>

      <div id="Payment" className={`${styles.tabcontent}`}>
        <Payment />
      </div>

      <div id="Addresses" className={`${styles.tabcontent}`}>
        <h3>Addresses</h3>
      </div>

    </div>
  );
};

export default Tabs;