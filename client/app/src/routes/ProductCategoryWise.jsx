import React, { Fragment, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/ProductsCategoryWise.css'; // Import the CSS file

const ProductCategoryWise = () => {
  const { categoryid } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log('Fetching products for category:', categoryid);
        const response = await fetch(`http://localhost:3006/products/${categoryid}`);
        const data = await response.json();
        console.log('Response:', response);
        console.log('Data:', data);
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [categoryid]);

  return (
    <Fragment>
      <div className="product-container">
        <h1 className="product-title">ProductCategoryWise</h1>
        <p className="category-info">Category ID: {categoryid}</p>
        <div className="product-grid">
          {products.map((product) => (
            <div key={product.productid} className="product-card">
              <div className="product-card-content">
                {/* Remove the Link component for the product name */}
                <h3 className="product-name">{product.name}</h3>
                <ul className="product-details">
                  <li className="product-detail">Price: <span className="product-price">{product.price}</span></li>
                  <li className="product-detail">Quantity in Stock: <span className="product-quantity">{product.quantityinstock}</span></li>
                  <li className="product-detail">Category ID: <span className="product-category-id">{product.categoryid}</span></li>
                </ul>
              </div>
              {/* See Details button */}
              <div className="see-details-button-container">
                <Link to={`/productDetails/${product.productid}`} className="see-details-button">See Details</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default ProductCategoryWise;
