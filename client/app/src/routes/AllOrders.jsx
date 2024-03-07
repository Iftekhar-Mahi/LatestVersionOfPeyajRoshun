import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { useUserContext } from '../App';
import '../styles/AllOrders.css';

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const { userId } = useUserContext();

  useEffect(() => {
    async function fetchUserOrders() {
      try {
        const response = await fetch(`http://localhost:3006/orders/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const ordersData = await response.json();
        setOrders(ordersData);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    }
    fetchUserOrders();
  }, [userId]);

  return (
    <div className="orders-container">
      <h1 className="orders-title">Orders</h1>
      {orders.map(order => (
        <div key={order.orderid} className="order-card">
          <p className='order-date'>Date Placed: {order.dateplaced} </p>
          <p className='order-amount'>Amount: {order.amount} $</p>
          <p className='order-payment-method'>Payment Method: {order.paymentmethod}</p>
          <p className='order-payment-status'>Payment Status: {order.paymentstatus}</p>
          {/* Add a button to view order details */}
          <Link to={`/order/${order.orderid}`} className='view-details-btn'>View Order Details</Link>
        </div>
      ))}
    </div>
  );
};

export default AllOrders;
