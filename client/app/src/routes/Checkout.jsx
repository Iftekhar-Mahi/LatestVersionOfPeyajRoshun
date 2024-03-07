import React, { useState } from 'react';
import { useUserContext } from '../App';
import '../styles/Checkout.css'; // Import the CSS file

const Checkout = () => {
  const { userId } = useUserContext();
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`http://localhost:3006/api/placeorder/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          paymentmethod: paymentMethod,
          paymentstatus: paymentStatus
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to place order');
      }
      
      // Reset form after successful submission
      setPaymentMethod('');
      setPaymentStatus('');
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <h1 className="checkout-title">Checkout</h1>
        <div className="checkout-info">
          <p>Thank you for shopping with us!</p>
          <p>Please provide payment information to complete your order.</p>
        </div>
      </div>
      <div className="checkout-form-container">
        <form onSubmit={handleSubmit} className="checkout-form">
          <div className="form-group">
            <label htmlFor="paymentMethod">Payment Method:</label>
            <select
              id="paymentMethod"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              required
            >
              <option value="">Select Payment Method</option>
              <option value="bkash">Bkash</option>
              <option value="cash">Cash On Delivery</option>
              <option value="creditcard">Credit Card</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="paymentStatus">Payment Status:</label>
            <select
              id="paymentStatus"
              value={paymentStatus}
              onChange={(e) => setPaymentStatus(e.target.value)}
              required
            >
              <option value="">Select Payment Status</option>
              <option value="paynow">Pay Now</option>
              <option value="addtodue">Add to Due</option>
            </select>
          </div>
          <button type="submit" className="submit-button">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
