import React, { useState } from 'react';
import styles from '../orders/orders.module.css';

const orders = [
  { id: '#875690', productName: 'Nike Air Julia', date: '02, May 2025', qty: 1, status: 'Completed', amount: '150,697' },
  { id: '#875691', productName: 'Tennis Chain', date: '03, May 2025', qty: 2, status: 'Pending', amount: '84,345' },
  { id: '#875690', productName: 'Gold Nose Cuff', date: '04, May 2025', qty: 3, status: 'Cancelled', amount: '3,234' },
];

const PaymentTable = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleRowClick = (order) => {
    setSelectedOrder(order);
  };

  const closePopup = () => {
    setSelectedOrder(null);
  };

  return (
    <div>
      <table className={styles.table}>
        <thead>
          <tr className={styles.tableheader}>
            <th>Order ID</th>
            <th>Product Name</th>
            <th>Date</th>
            <th>QTY</th>
            <th>Status</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr 
              key={order.id} 
              className={`${styles.row}`}
              onClick={() => handleRowClick(order)}
            >
              <td className={styles.orderid}>{order.id}</td>
              <td>{order.productName}</td>
              <td>{order.date}</td>
              <td>{order.qty}</td>
              <td className={`${styles[order.status.toLowerCase()]}`}>{order.status}</td>
              <td>₦ {order.amount}.00</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedOrder && (
        <>
          <div className={styles.overlay} onClick={closePopup}></div>
          <div className={styles.popup}>
            <button onClick={closePopup}>X</button>
            <h3>Order Details</h3>
            <p><strong>Order ID number:</strong> {selectedOrder.id}</p>
            <p><strong>Product name:</strong> {selectedOrder.productName}</p>
            <p><strong>Date of order:</strong> {selectedOrder.date}</p>
            <p><strong>Quantity:</strong> {selectedOrder.qty}</p>
            <p><strong>Order status:</strong> {selectedOrder.status}</p>
            <p><strong>Amount:</strong> ₦ {selectedOrder.amount}.00</p>
          </div>
        </>
      )}
    </div>
  );
};

export default PaymentTable;