import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useUserContext } from "../App";
import '../styles/Promotions.css';
const Promotions = () => {
  
  const { userId} = useUserContext();
  const [promotions, setPromotions] = useState([]);

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await fetch("http://localhost:3006/promotions");
        const data = await response.json();
        setPromotions(data);
      } catch (error) {
        console.error('Error fetching promotions:', error);
      }
    };
    fetchPromotions();
  }, []);

  return (
    <div className="promotions-container">
      <h3>Promotions</h3>
      <div className="promotions-grid">

        {promotions.map((promotion) => (
          <div key={promotion.promotionid} className="promotion-card">
            <div className="card-body">
              <h5>{promotion.name}</h5>
              <p>{promotion.description}</p>
              <p> Use Coupon : {promotion.couponcode} </p> 
              <Link to={`/productsunderpromotion/${promotion.promotionid}`} className="btn btn-primary">
                See Products Under Promotion
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Promotions;
