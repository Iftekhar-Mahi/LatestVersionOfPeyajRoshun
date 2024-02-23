import React, { useState, useEffect } from 'react';
// import statement from ../app.jsx
import { useUserContext } from '../App';
const Cart = () => {

  const [products, setProducts] = useState([]);
  const {userId,setuserId} = useUserContext();
  useEffect(() => {
  
    async function fetchCartProducts() {
      try {
        console.log("Fetching products in the cart:", userId);
        const response = await fetch(`http://localhost:3006/api/cart/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const productsData = await response.json();
        setProducts(productsData);
        console.log("the products in the cart:",productsData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
    fetchCartProducts();
  }, []);

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
    <div>
      <h1>Cart</h1>
      {products.map(product => (
        <div key={product.productid}>
          <p>{product.name} - ${product.price}</p>
          <button onClick={() => handleRemoveProduct(product.productid)}>Remove</button>
        </div>
      ))}
    </div>
  );
};

export default Cart;
