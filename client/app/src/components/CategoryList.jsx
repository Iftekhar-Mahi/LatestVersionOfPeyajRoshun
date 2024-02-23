import React, { useContext, useEffect, useState } from "react";
import categoryFinder from "../apis/categoryFinder";

import { Navigate, useNavigate } from "react-router-dom";
import "./CategoryList.css";

const CategoryList = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3006/api/v1/categories");
        console.log("response was receiverd");
        const data = await response.json();
        console.log(response);
        console.log(data);
        console.log(data.data);
        console.log(data.data.categories);
        setCategories(data.data.categories);
        console.log(response);
      } catch (err) {
        console.log("Couldnt Fetch what error? Categories");
      }
    };
    console.log("Category List Mounted");
    fetchData();
  }, []);

  function navigateToProducts(category) {
    navigate(`/productscategorywise/${category.categoryid}`);
  }

  return (
    <>
      <h1>Categories</h1>
      <p>You can choose products from these categories:</p>
      <ul>
        {categories.map((category) => (
          <li key={category.categoryid}>
            <div>
              <p>{category.categoryname}</p>
            </div>
            <div>
              <button onClick={() => navigateToProducts(category)}>Go</button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default CategoryList;
