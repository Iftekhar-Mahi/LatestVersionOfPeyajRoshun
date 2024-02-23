import React, { Fragment, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useUserContext } from "../App";
//import "../styles/prodDetails.css"; // Import the CSS file

const ProductDetails = ({ setAuth }) => {

  const { id } = useParams();
  const {userId,setuserId} = useUserContext();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        console.log("Fetching product:", id);
        const response = await fetch(`http://localhost:3006/api/productDetails/${id}`);
        const data = await response.json();
        console.log("the desired Data:", data);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      const response = await fetch(`http://localhost:3006/api/addToCart/${id}/user/${userId}`, {
        method: "POST",
      });
  
      if (!response.ok) {
        throw new Error("Failed to add product to cart");
      }
  
      // Optionally, you can check the response body for any data returned by the server
      const responseData = await response.json();
      console.log(responseData);
      
  
      // If you want to perform any action after successful addition to cart,
      // you can add it here
  
      // For example, you can show a success message
      alert("Product added to cart successfully");
    } catch (error) {
      console.error("Error adding product to cart:", error);
      // Handle error (e.g., show an error message to the user)
      alert("Failed to add product to cart. Please try again later.");
    }
  };
  

  return (
    <Fragment>
      <div className="product-details-container">
        <h1>ProductDetails</h1>
        {product ? (
          <div className="product-item" key={product[0].productid}>
            <ul>
              <li>Price: {product[0].price}</li>
              <li>Product Name: {product[0].name}</li>
              <li>Quantity in Stock: {product[0].quantityinstock}</li>
              <li>Category ID: {product[0].categoryid}</li>
              <li>Description: {product[0].description}</li>
            </ul>
            <button className="add-to-cart-btn" onClick={handleAddToCart}>Add to Cart</button>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </Fragment>
  );
};

export default ProductDetails;
