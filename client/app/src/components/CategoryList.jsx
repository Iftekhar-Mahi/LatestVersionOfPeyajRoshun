// import React, { useContext, useEffect, useState } from "react";
// import categoryFinder from "../apis/categoryFinder";

// import { Navigate, useNavigate } from "react-router-dom";
// import "./CategoryList.css";

// const CategoryList = () => {
//   const navigate = useNavigate();
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
    
//     const fetchData = async () => {
//       try {
//         const response = await fetch("http://localhost:3006/categories");
//         console.log("response was receiverd");
//         const data = await response.json();
//         setCategories(data);
//         console.log(response);
//       } catch (err) {
//         console.log("Couldnt Fetch what error? Categories");
//       }
//     };
//     console.log("Category List Mounted");
//     fetchData();
//   }, []);

//   function navigateToProducts(category) {
//     navigate(`/productscategorywise/${category.categoryid}`);
//   }

//   return (
//     <>
//       <h1>Categories</h1>
//       <p>You can choose products from these categories:</p>
//       <ul>
//         {categories.map((category) => (
//           <li key={category.categoryid}>
//             <div>
//               <p>{category.categoryname}</p>
//             </div>
//             <div>
//               <button onClick={() => navigateToProducts(category)}>Go</button>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </>
//   );
// };

// export default CategoryList;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
        console.log("Couldn't Fetch. What error? Categories");
      }
    };
    fetchData();
  }, []);

  function navigateToProducts(category) {
    navigate(`/productscategorywise/${category.categoryid}`);
  }

  return (
    <div className="container">
      <h1 className="mt-4">Categories</h1>
      <p>You can choose products from these categories:</p>
      <div className="row">
        {categories.map((category) => (
          <div key={category.categoryid} className="col-md-4">
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">{category.categoryname}</h5>
                <button
                  className="btn btn-primary"
                  onClick={() => navigateToProducts(category)}
                >
                  Go
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
