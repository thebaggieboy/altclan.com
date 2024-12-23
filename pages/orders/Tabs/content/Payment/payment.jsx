import React, { useState, useEffect } from 'react';
import { FaCheck, FaTrash, FaInfoCircle } from 'react-icons/fa';
import styles from './payment.module.css';
import AddPayment from './addPayment';
import PaymentTable from "./table"

const Payment = () => {
    const [showDelete, setShowDelete] = useState(false);
    const [showDeleteSuccesful, setShowDeleteSuccesful] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [selectedRadio, setSelectedRadio] = useState("Paystack1");
    const [showInfoPopup, setShowInfoPopup] = useState(false);
    const [infoContent, setInfoContent] = useState("");
    const [infoCard, setInfoCard] = useState("");
    const [infoImage, setInfoImage] = useState("");
    const [showAddPaymentPopup, setShowAddPaymentPopup] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('');

    const paymentMethods = [
        { 
            id: 'Paystack', 
            label: 'Paystack', 
            info: 'Paystack', 
            image: "https://asset.brandfetch.io/idM5mrwtDs/id80unV6TJ.jpeg",
            details: "Debit Card" 
        },
        { 
            id: 'PayPal', 
            label: 'PayPal', 
            info: 'PayPal', 
            image: "https://cdn-icons-png.flaticon.com/512/174/174861.png",
            details: "jam*****@gmail.com"
        },
        { 
            id: 'Credit Card', 
            label: 'Credit Card', 
            info: 'Credit Card', 
            image: "https://cdn-icons-png.flaticon.com/512/2695/2695971.png",
            details: "5677 **** **** ****" 
        }
    ];

    const handleDeleteClick = (paymentMethod) => {
        setSelectedPayment(paymentMethod);
        setShowDelete(true);
    };

    const confirmDelete = () => {
        setShowDeleteSuccesful(true);
        console.log(`Deleted payment method: ${selectedPayment}`);
    };

    const closePopup = () => {
        setShowDelete(false);
    };

    const handleRadioSelect = (paymentMethod) => {
        setSelectedRadio(paymentMethod);
    };

    const handleInfoClick = (method) => {
        setInfoContent(method.info);
        setInfoCard(method.details);
        setInfoImage(method.image);
        setSelectedPayment(method.id);
        setShowInfoPopup(true);
    };

    const closeInfoPopup = () => {
        setShowInfoPopup(false);
    };

    const handleAddPaymentClick = () => {
        setShowAddPaymentPopup(true);
    };

    const closeAddPaymentPopup = () => {
        setShowAddPaymentPopup(false);
        setPaymentMethod('');
    };

    const handleAddPaymentMethod = (method) => {
        setPaymentMethod(method);
    };

    useEffect(() => {
        if (showDeleteSuccesful) {
            const timer = setTimeout(() => {
                setShowDeleteSuccesful(false);
                setShowDelete(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [showDeleteSuccesful]);

    return (
        <>
            <div>
                <div className={styles.checkContainerHeader}>
                    <p>Saved Payment Methods</p>
                    <div className={styles.checkContainerHeaderRight}>
                        <p className={styles.addNewPayment} onClick={handleAddPaymentClick}>Add New</p>
                    </div>
                </div>
                
                <div className={styles.paymentContainer}>
                    {paymentMethods.map((method) => (
                        <div key={method.id} className={styles.paymentOption}>
                            <div className={styles.savedPayment}>
                                <span className={styles.paymentInfo}>
                                    {method.image && <img src={method.image} alt="" />}
                                    <div className={styles.paymentText}>
                                        <p>{method.label}</p>
                                        <p>{method.details}</p>
                                        {/* <p onClick={() => handleInfoClick(method)}>more</p> */}
                                    </div>
                                </span>
                        
                                <div className={styles.savedPaymentRight}>
                                    <span>
                                            <div style={{display: "flex"}}>
                                                <p onClick={() => handleInfoClick(method)}><FaInfoCircle /></p>

                                                <button onClick={(e) => { e.stopPropagation(); handleDeleteClick(method.id); }}>
                                                    <FaTrash style={{ color: "red", float: "right" }} />
                                                </button>
                                            </div>
                                        
                                        <label className={styles.checkContainer}>
                                            {selectedRadio !== method.id && (
                                                <p onClick={(e) => { e.stopPropagation(); handleRadioSelect(method.id); }}>Set Default</p>
                                            )}
                                            {selectedRadio === method.id && <p>Default</p>}
                                            <input
                                                type="radio"
                                                name="radio"
                                                checked={selectedRadio === method.id}
                                                onChange={() => handleRadioSelect(method.id)}
                                            />
                                            <span className={styles.checkmark}></span>
                                        </label>
                                    </span>
                                </div>
                            </div>
                        </div>
                   
                    ))}
                </div>
            </div>

            {showDelete && (
                <div className={styles.popup}>
                    <div className={styles.popupInner}>
                        <h2>Confirm Deletion</h2>
                        <p>Are you sure you want to delete {selectedPayment}?</p>
                        <button onClick={confirmDelete}>Yes</button>
                        <button onClick={closePopup}>No</button>
                    </div>
                </div>
            )}

            {showDeleteSuccesful && (
                <div className={styles.successMessage}>
                    <p>Payment method deleted successfully.</p>
                </div>
            )}

            {showInfoPopup && (
                <div className={styles.fullPagePopup}>
                    <div className={styles.fullPagePopupInner}>
                        <div className={styles.closeSelect}>
                            <button onClick={closeInfoPopup} className={styles.remove}>Remove</button>
                            {selectedRadio === selectedPayment ? (
                                <></>
                            ) : (
                                // <button onClick={() => handleRadioSelect(selectedPayment)}>Select {paymentMethods.find(method => method.id === selectedPayment)?.label}</button>
                                <button onClick={() => handleRadioSelect(selectedPayment)}>Set as default</button>
                            )}
                        </div>

                        <div className={styles.savedPayment} style={{width: "20%", backgroundColor: "#CCC", padding: "10px"}}>
                            <span className={styles.paymentInfo}>
                                <img src={infoImage} alt="" />
                                <div className={styles.paymentText}>
                                    <p>{infoContent}</p>
                                    <p>{infoCard}</p>
                                </div>
                            </span>

                            <div className={styles.savedPaymentRight}>
                                {selectedRadio === selectedPayment ? (
                                    <FaCheck />
                                ) : (
                                    <></>
                                )}
                            </div>
                        </div>

                        <h3>Billing History</h3>
                        <PaymentTable />
                    </div>
                </div>
            )}

            {showAddPaymentPopup && (
                <AddPayment 
                    closeAddPaymentPopup={closeAddPaymentPopup}
                    handleAddPaymentMethod={handleAddPaymentMethod}
                    paymentMethod={paymentMethod}
                    styles={styles}
                />
            )}
        </>
    );
};

export default Payment;
