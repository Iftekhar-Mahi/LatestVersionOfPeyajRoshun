import React, { Fragment, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../styles/prodDetails.css"; // Import the CSS file
const ProductDetails = ({ setAuth }) => {
  const { id } = useParams();
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

  const handleAddToCart = () => {
    // Logic to add product to cart can be implemented here
    alert("Product added to cart!");
  };

  return (
    <Fragment>
      <div className="product-details-container">
        <h1>ProductDetails</h1>
        {product ? (
          <div className="product-item" key={product[0].productid}>
            <ul>
              <li>Price: {product[0].price}</li>
              <li>Quantity in Stock: {product[0].quantityinstock}</li>
              <li>Category ID: {product[0].categoryid}</li>
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
