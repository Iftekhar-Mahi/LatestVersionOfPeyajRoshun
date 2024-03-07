import React, { Fragment, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useUserContext } from "../App";
import "../styles/ProductsCategoryWise.css"; // Import the CSS file

const ProductCategoryWise = () => {
  const { userId } = useUserContext();
  const { categoryid } = useParams();
  const [products, setProducts] = useState([]);
  const [previouslyOrderedProducts, setPreviouslyOrderedProducts] = useState(
    []
  );

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log("Fetching products for category:", categoryid);
        const response = await fetch(
          `http://localhost:3006/products/${categoryid}`
        );
        const data = await response.json();
        console.log("Response:", response);
        console.log("Data:", data);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();

    const fetchPreviouslyOrderedProducts = async () => {
      try {
        const response = await fetch(
          `http://localhost:3006/previousorders/${categoryid}/${userId}`
        );
        const data = await response.json();
        setPreviouslyOrderedProducts(data);
      } catch (error) {
        console.error("Error fetching previously ordered products:", error);
      }
    };

    fetchPreviouslyOrderedProducts();
  }, [categoryid, userId]);

  return (
    <Fragment>
 <div className="recommended-products-container">
        <h2>Products You may Like</h2>
        <div className="recommended-products-grid">
          {previouslyOrderedProducts.map((product) => (
            <div key={product.productid} className="recommended-product-card">
              <h3 className="recommended-product-name">{product.name}</h3>
              <h3 className="recommended-product-price">{product.price}$</h3>
            </div>
          ))}
        </div>
      </div>



      <div className="product-container">
        <h1 className="product-title">Product Of This Category </h1>
        <p className="category-info">Category ID: {categoryid}</p>
        <div className="product-grid">
          {products.map((product) => (
            <div key={product.productid} className="product-card">
              <div className="product-card-content">
                <h3 className="product-name" style={{ fontWeight: "bold" }}>
                  {product.name}
                </h3>
                <ul className="product-details">
                  <li className="product-detail">
                    Price:{" "}
                    <span className="product-price">{product.price}</span>
                  </li>
                  <li className="product-detail">
                    Quantity in Stock:{" "}
                    <span className="product-quantity">
                      {product.quantityinstock}
                    </span>
                  </li>

                  {/* <li className="product-detail">Category ID: <span className="product-category-id">{product.categoryid}</span></li> */}
                </ul>
              </div>
              <div className="see-details-button-container">
                <Link
                  to={`/productDetails/${product.productid}`}
                  className="see-details-button"
                >
                  See Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
     
    </Fragment>
  );
};

export default ProductCategoryWise;
