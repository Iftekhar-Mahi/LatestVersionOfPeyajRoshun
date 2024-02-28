
import React, { useState, useEffect } from 'react';
import { useUserContext } from '../App';
import { Link } from 'react-router-dom'; // Import Link component
import '../styles/Cart.css'; // Import the CSS file

const Cart = () => {
  const [products, setProducts] = useState([]);
  const { userId } = useUserContext();

  useEffect(() => {
    async function fetchCartProducts() {
      try {
        const response = await fetch(`http://localhost:3006/api/cart/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const productsData = await response.json();
        console.log("the desired Data:", productsData)
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
    fetchCartProducts();
  }, [userId]);

  const handleRemoveProduct = async (productId) => {
    try {
      const response = await fetch(`http://localhost:3006/api/removeFromCart/${productId}/user/${userId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete product');
      }
      setProducts(products.filter(product => product.productid !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="cart-container">
      <h1 className="cart-title">Cart</h1>
      {products.map(product => (
        <div key={product.productid} className="card">
          <h2 className="card-title">{product.name}</h2>
          <p className="card-text">${product.price}</p>
          <p className='card-text'>Quantity: {product.quantity}</p>
          <button className="remove-button" onClick={() => handleRemoveProduct(product.productid)}>Remove</button>
        </div>
      ))}
      {/* Use Link component to create a link to "/checkout" */}
      <Link to="/checkout" className="proceed-to-checkout-button">Proceed to Checkout</Link>
    </div>
  );
};

export default Cart;
