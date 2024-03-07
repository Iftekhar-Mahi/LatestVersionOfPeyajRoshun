import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/ProductsUnderPromotion.css';
const ProductsUnderPromotion = () => {
  const { promotionId } = useParams();
  const [productsUnderPromotion, setProductsUnderPromotion] = useState([]);

  useEffect(() => {
    const fetchProductsUnderPromotion = async () => {
      try {
        const response = await fetch(`http://localhost:3006/productsunderpromotion/${promotionId}`);
        const productsData = await response.json();
        setProductsUnderPromotion(productsData);
      } catch (error) {
        console.error('Error fetching products under promotion:', error);
      }
    };

    fetchProductsUnderPromotion();
  }, [promotionId]);

  return (
    <div className="products-under-promotion">
      <h3 className="promotion-title">Products Under Promotion</h3>
      <div className="products-list">
        {productsUnderPromotion.map(product => (
          <div className="product-card" key={product.productid}>
            <div className="product-details">
              <h4 className="product-name">{product.name}</h4>
              <p className="product-description">{product.description}</p>
              <div className="product-info">
                <p className="product-price">Price: ${product.price}</p>
                <p className="product-discount">Discount: {product.discountpercentage}% off</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsUnderPromotion;
