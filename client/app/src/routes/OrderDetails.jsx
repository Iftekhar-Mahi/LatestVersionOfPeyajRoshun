import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/OrderDetails.css";
import { useUserContext } from "../App";
import { Link } from "react-router-dom";
const OrderDetails = () => {
  //get user id from the  context
  const { userId, setUserId } = useUserContext();

  const [orderDetails, setOrderDetails] = useState([]);
  const [review, setReview] = useState("");
  const [isReviewing, setIsReviewing] = useState(false);
  const { orderid } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchOrderDetails() {
      try {
        const response = await fetch(`http://localhost:3006/order/${orderid}`);

        if (!response.ok) {
          throw new Error("Failed to fetch order details");
        }
        const orderDetailsData = await response.json();
        console.log(orderDetailsData);
        setOrderDetails(orderDetailsData);
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    }
    fetchOrderDetails();
  }, [orderid]);

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleAddReview = (productId) => {
    navigate(`/addProductReview/${productId}`); // Navigate to the specified route with the product ID
  };

  const handleSubmitReview = async () => {
    try {
      const response = await fetch(
        `http://localhost:3006/order/${orderid}/${userId}/review`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ review }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add review");
      }

      console.log("Review added successfully");
      setIsReviewing(false); // Toggle isReviewing state to hide the review form
      setReview(""); // Clear the review input field
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  return (
    <div className="order-details-wrapper">
      <h2 className="order-details-title">Order Details</h2>
      <div></div>

      {orderDetails.length > 0 ? (
        <div className="order-details-container">
          {orderDetails.map((detail, index) => (
            <div key={index} className="order-detail-card">
              <div className="detail-row">
                <div className="detail-label">Product ID:</div>
                <div className="detail-value">{detail.productid}</div>
              </div>
              <div className="detail-row">
                <div className="detail-label">Quantity:</div>
                <div className="detail-value">{detail.quantity}</div>
              </div>
              <div className="detail-row">
                <div className="detail-label">Price:</div>
                <div className="detail-value">{detail.price}</div>
              </div>
              <button
                className="add-review-button"
                onClick={() => handleAddReview(detail.productid)}
              >
                
                Add Product Review
              </button>

              {/* add a link that go to different route called addProductreview */}
            </div>
          ))}
        </div>
      ) : (
        <p className="loading-message">Loading...</p>
      )}

      <div className="review-section">
        {!isReviewing ? (
          <button
            className="review-button"
            onClick={() => setIsReviewing(true)}
          >
            Add Review for Order
          </button>
        ) : (
          <div className="review-form">
            <textarea
              className="review-input"
              value={review}
              onChange={handleReviewChange}
              placeholder="Write your review here..."
            />
          </div>
        )}
      </div>

      {isReviewing && (
        <button className="submit-review-button" onClick={handleSubmitReview}>
          Submit Review
        </button>
      )}
    </div>
  );
};

export default OrderDetails;
