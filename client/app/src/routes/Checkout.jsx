// import React, { useState } from 'react';
// import { useUserContext } from '../App';
// import '../styles/Checkout.css'; // Import the CSS file

// const Checkout = () => {
//   const { userId } = useUserContext();
//   const [paymentMethod, setPaymentMethod] = useState('');
//   const [paymentStatus, setPaymentStatus] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     try {
//       const response = await fetch(`http://localhost:3006/api/placeorder/${userId}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           paymentmethod: paymentMethod,
//           paymentstatus: paymentStatus
//         })
//       });
      
//       if (!response.ok) {
//         throw new Error('Failed to place order');
//       }
      
//       // Reset form after successful submission
//       setPaymentMethod('');
//       setPaymentStatus('');
//     } catch (error) {
//       console.error('Error placing order:', error);
//     }
//   };

//   return (
//     <div className="checkout-container">
//       <h1 className="checkout-title">Checkout</h1>
//       <div className="checkout-info">
//         <p>Thank you for shopping with us!</p>
//         <p>Please provide payment information to complete your order.</p>
//       </div>
//       <form onSubmit={handleSubmit} className="checkout-form">
//         <label htmlFor="paymentMethod">Payment Method:</label>
//         <input 
//           type="text" 
//           id="paymentMethod" 
//           value={paymentMethod} 
//           onChange={(e) => setPaymentMethod(e.target.value)} 
//           required 
//         />
//         <label htmlFor="paymentStatus">Payment Status:</label>
//         <input 
//           type="text" 
//           id="paymentStatus" 
//           value={paymentStatus} 
//           onChange={(e) => setPaymentStatus(e.target.value)} 
//           required 
//         />
//         <button type="submit" className="submit-button">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default Checkout;


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
      <h1 className="checkout-title">Checkout</h1>
      <div className="checkout-info">
        <p>Thank you for shopping with us!</p>
        <p>Please provide payment information to complete your order.</p>
      </div>
      <form onSubmit={handleSubmit} className="checkout-form">
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
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default Checkout;
