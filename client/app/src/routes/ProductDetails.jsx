import React, { Fragment, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useUserContext } from "../App";
import "../styles/prodDetails.css"; // Import the CSS file

const ProductDetails = ({ setAuth }) => {
  const { id } = useParams();
  const { userId, setUserId } = useUserContext();

  const [product, setProduct] = useState(null);
  const [addedToCart, setAddedToCart] = useState(false);
  const [productRating, setProductRating] = useState(0);
  const [num, setNum] = useState(1);
  const [quantityInStock, setQuantityInStock] = useState(0); // State to hold the quantity in stock

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        console.log("Fetching product:", id);
        const response = await fetch(`http://localhost:3006/productdetails/${id}`);
        const data = await response.json();
        console.log("the desired Data:", data);
        setProduct(data);
        setQuantityInStock(data[0].quantityinstock); // Set the quantity in stock when product data is fetched
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    const fetchProductRating = async () => {
      try {
        console.log("Fetching product rating :", id);
        const response = await fetch(`http://localhost:3006/api/productavgrating/${id}`);
        const data = await response.json();
        console.log("the desired Data:", data);
        setProductRating(data[0].rating);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProductRating();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      console.log("Adding product to cart:", id);
      console.log("Adding product to cart for user:", userId);
      const response = await fetch(`http://localhost:3006/api/addToCart/${id}/user/${userId}/quantity/${num}`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to add product to cart");
      }

      const responseData = await response.json();
      console.log(responseData);

      setAddedToCart(true);
    } catch (error) {
      console.error("Error adding product to cart:", error);
      alert("Failed to add product to cart. Please try again later.");
    }
  };

  const incrementQuantity = () => {
    if (num < quantityInStock) {
      setNum(num + 1);
    } else {
      alert("Cannot exceed available quantity in stock.");
    }
  };

  const decrementQuantity = () => {
    if (num > 1) {
      setNum(num - 1);
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
                <span>{quantityInStock}</span>
              </li>
              <li>
                <span className="label category-label">Category ID:</span>{" "}
                <span>{product[0].categoryid}</span>
              </li>
              <li>
                <span className="label description-label">Description:</span>{" "}
                <span>{product[0].description}</span>
              </li>
              <li>
                <span className="label rating-label">Average Rating:</span>{" "}
                <span>{productRating}</span>
              </li>
              <li>
                <span className="label quantity-label">Quantity:</span>{" "}
                <span>
                  <button onClick={decrementQuantity}>-</button>
                  {num}
                  <button onClick={incrementQuantity}>+</button>
                </span>
              </li>
            </ul>
            <button className="add-to-cart-btn" onClick={handleAddToCart}>
              Add to Cart
            </button>
            {addedToCart && (
              <div>
                {addedToCart && (
                  <span className="success-message">
                    {product[0].name} has been added to cart. You can go to your cart to see that.
                  </span>
                )}
              </div>
            )}
            <Link to={`/product/${id}/reviews`} className="reviews-link">
              See reviews of this product
            </Link>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </Fragment>
  );
};

export default ProductDetails;
