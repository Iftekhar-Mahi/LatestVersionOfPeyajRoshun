import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CategoryList.css";

const CategoryList = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3006/categories");
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        console.error("Couldn't Fetch. What error? Categories");
      }
    };
    fetchData();
  }, []);

  function navigateToProducts(category) {
    navigate(`/productscategorywise/${category.categoryid}`);
  }

  return (
    <div className="category-container">
      <h3>Categories</h3>
      <h5>You can choose products from these categories:</h5>
      <div className="category-grid">
        {categories.map((category) => (
          <div key={category.categoryid} className="category-card">
            <div className="card-body">
              <h5>{category.categoryname}</h5>
              <h5>{category.description}</h5>
              <button className="btn btn-primary" onClick={() => navigateToProducts(category)}>
                Go
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
