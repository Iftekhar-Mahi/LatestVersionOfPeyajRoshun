import React, { Fragment, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
// import '../styles/ProductsCategoryWise.css'; 
// Import the CSS file

const ProductCategoryWise = ({ setAuth }) => {
  const { categoryid } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log('Fetching products for category:', categoryid);
        const response = await fetch(`http://localhost:3006/api/products/${categoryid}`);
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
      <div>
        <h1>ProductCategoryWise</h1>
        <p>Category ID: {categoryid}</p>
        {products.map((product) => (
          <div key={product.productid} >
            <h2>{product.name}</h2>
            
              <li>Price: {product.price}</li>
              <li>Quantity in Stock: {product.quantityinstock}</li>
              <li>Category ID: {product.id}</li>
            
            <Link to={`/productDetails/${product.productid}`}>
                <button>View Details</button>
              </Link>
          </div>
        ))}
      </div>
    </Fragment>
  );
};

export default ProductCategoryWise;
