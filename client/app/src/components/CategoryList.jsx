import React, { useContext, useEffect } from "react";
import categoryFinder from "../apis/categoryFinder";
import { CategoriesContext } from "../context/categoriesContext";
import { Navigate, useNavigate } from "react-router-dom";
import "./CategoryList.css";
const CategoryList = () => {
  const navigate = useNavigate();
  const { categories, setCategories } = useContext(CategoriesContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await categoryFinder.get("/");
        setCategories(response.data.data.categories);
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  function navigateToProducts(category) {
    navigate(`/productscategorywise/${category.categoryid}`);
  }

  return (
    <div className="category-list-container">
      <ul className="list-group">
        {categories.map((category, index) => (
          <li
            key={index}
            className={
              index % 2 === 0
                ? "list-group-item bg-secondary"
                : "list-group-item bg-dark text-white"
            }
          >
            <div className="category-info">
              <p className="category-name-extended">{category.categoryname}</p>
            </div>
            <button
              className="btn btn-outline-warning"
              onClick={() => navigateToProducts(category)}
            >
              Go
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
