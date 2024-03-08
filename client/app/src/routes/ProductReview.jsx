import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/ProductReview.css'; // Import the CSS file

const ProductReview = () => {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3006/api/products/${id}/reviews`);
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="product-review-container">
      <div className="review-header">
        <h2>Product Review</h2>
      </div>
      <div className="review-list">
        {reviews.map((review, index) => (
          <div className="review-card" key={index}>
            <div className="review-item">
              <p><strong>User Name:</strong> {review.firstname} {review.lastname}</p>
              <p><strong>Product Name:</strong> {review.name}</p>
              <p><strong>Rating:</strong> {review.rating}</p>
              <p className="comment"><strong>Comment:</strong> {review.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductReview;
