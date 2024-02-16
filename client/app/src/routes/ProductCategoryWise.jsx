import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductCategoryWise = ({ setAuth }) => {
  const { categoryid } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log('Fetching products for category:', categoryid);
        const response = await fetch(`/api/products/${categoryid}`);
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
        <ul>
          {products.map((product) => (
            <li key={product.productid}>{product.name}</li>
          ))}
        </ul>
      </div>
    </Fragment>
  );
};

export default ProductCategoryWise;

