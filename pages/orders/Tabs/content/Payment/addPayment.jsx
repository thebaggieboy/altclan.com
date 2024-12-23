import React from 'react';
import { FaCheck } from 'react-icons/fa';

const AddPayment = ({ closeAddPaymentPopup, handleAddPaymentMethod, paymentMethod, styles }) => {
    return (
        <>
            <div className={styles.fullPagePopup}>
                <div className={styles.fullPagePopupInner}>
                    <button onClick={closeAddPaymentPopup} className={styles.closeButton}>X</button>
                    <h2>Add New Payment Method</h2>
                    <div className={styles.paymentMethodButtons}>
                        <button onClick={() => handleAddPaymentMethod('card')}><FaCheck />Add Card</button>
                        <button onClick={() => handleAddPaymentMethod('paypal')}><FaCheck />Add PayPal Account</button>
                        <button onClick={() => handleAddPaymentMethod('paystack')}><FaCheck />Add Paystack Account</button>
                    </div>
                    {paymentMethod === 'card' && (
                        <div className={styles.formContainer}>
                            <h3>Add Card Details</h3>
                            <form>
                                <label>Card Number:</label>
                                <input type="text" placeholder="Enter card number" />
                                <label>Expiry Date:</label>
                                <input type="text" placeholder="MM/YY" />
                                <label>CVV:</label>
                                <input type="text" placeholder="Enter CVV" />
                                <label>Name on Card:</label>
                                <input type="text" placeholder="Enter name on card" />
                                <button type="submit">Save</button>
                            </form>
                        </div>
                    )}
                    {paymentMethod === 'paypal' && (
                        <div className={styles.formContainer}>
                            <h3>Add PayPal Account</h3>
                            <form>
                                <label>PayPal Email:</label>
                                <input type="email" placeholder="Enter PayPal email" />
                                <label>Account Holder Name:</label>
                                <input type="text" placeholder="Enter account holder name" />
                                <button type="submit">Save</button>
                            </form>
                        </div>
                    )}
                    {paymentMethod === 'paystack' && (
                        <div className={styles.formContainer}>
                            <h3>Add Paystack Account</h3>
                            <form>
                                <label>Paystack Public Key:</label>
                                <input type="text" placeholder="Enter Paystack public key" />
                                <label>Paystack Secret Key:</label>
                                <input type="text" placeholder="Enter Paystack secret key" />
                                <button type="submit">Save</button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default AddPayment;