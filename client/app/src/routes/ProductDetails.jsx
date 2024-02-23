import React, { Fragment, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useUserContext } from "../App";
import "../styles/prodDetails.css"; // Import the CSS file

const ProductDetails = ({ setAuth }) => {
  const { id } = useParams();
  const { userId, setUserId } = useUserContext();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        console.log("Fetching product:", id);
        const response = await fetch(`http://localhost:3006/productdetails/${id}`);
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
      console.log("Adding product to cart:", id);
      console.log("Adding product to cart for user:", userId);
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
      <li>
        <span className="label price-label">Price:</span>{" "}
        <span className="price-value">{product[0].price}</span>
      </li>
      <li>
        <span className="label name-label">Product Name:</span>{" "}
        <span>{product[0].name}</span>
      </li>
      <li>
        <span className="label quantity-label">Quantity in Stock:</span>{" "}
        <span>{product[0].quantityinstock}</span>
      </li>
      <li>
        <span className="label category-label">Category ID:</span>{" "}
        <span>{product[0].categoryid}</span>
      </li>
      <li>
        <span className="label description-label">Description:</span>{" "}
        <span>{product[0].description}</span>
      </li>
    </ul>
    <button className="add-to-cart-btn" onClick={handleAddToCart}>
      Add to Cart
    </button>
  </div>
) : (
  <p>Loading...</p>
)}

      </div>
    </Fragment>
  );
};

export default ProductDetails;
