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
    <div className="product-review-container"> {/* Apply unique classname */}
      <h2>Product Review</h2>
      <div>
        {reviews.map((review, index) => (
          <div className="review-item" key={index}> {/* Apply unique classname */}
            <p><strong>User ID:</strong> {review.userid}</p>
            <p><strong>Product ID:</strong> {review.productid}</p>
            <p><strong>Rating:</strong> {review.rating}</p>
            <p className="comment"><strong>Comment:</strong> {review.comment}</p> {/* Apply unique classname */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductReview;
