import React, { useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import "../styles/AddProductReview.css";
import { useUserContext } from "../App";

const AddProductReview = () => {
  const [rating, setRating] = useState(1); // Initial rating set to 1
  const [comment, setComment] = useState('');
  const navigate = useNavigate();
  const { userId } = useUserContext();
  const { productid } = useParams();

  const handleRatingIncrease = () => {
    if (rating < 5) {
      setRating(rating + 1);
    }
  };

  const handleRatingDecrease = () => {
    if (rating > 1) {
      setRating(rating - 1);
    }
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmitReview = async () => {
    try {
      // Assuming you have an API endpoint to submit the review
      console.log('Submitting review:', rating, comment);
      console.log('Product ID:', productid);
        console.log('User ID:', userId);
      const response = await fetch(`http://localhost:3006/addreviews/${productid}/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rating, comment }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit review');
      }
      alert('Review submitted successfully');
        
      console.log('Review submitted successfully');
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <div className="add-review-container">
      <h2 className="add-review-title">Add Product Review</h2>
      <div className="rating-section">
        <label htmlFor="rating" className="rating-label">Rating:</label>
        <button onClick={handleRatingDecrease} className="rating-decrease-button">-</button>
        <span className="rating-value">{rating}</span>
        <button onClick={handleRatingIncrease} className="rating-increase-button">+</button>
      </div>
      <label htmlFor="comment" className="comment-label">Comment:</label>
      <textarea
        id="comment"
        name="comment"
        value={comment}
        onChange={handleCommentChange}
        placeholder="Write your comment here..."
        required
        className="comment-textarea"
      />
      <button className="submit-review-button" onClick={handleSubmitReview}>
        Submit Review
      </button>
    </div>
  );
};

export default AddProductReview;
