

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import "./SearchProducts.css"; // Import the CSS file

// const SearchProducts = () => {
//   const [searchByWhat, setSearchByWhat] = useState("");
//   const [searchProduct, setSearchProduct] = useState("");
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     fetchAllProducts(); // Fetch all products when the component mounts
//   }, []); // Empty dependency array to fetch all products only once when the component mounts

//   useEffect(() => {
//     if (searchByWhat !== "" || searchProduct !== "") {
//       fetchProducts(); // Fetch products whenever search criteria change
//     }
//   }, [searchByWhat, searchProduct]); // Trigger fetchProducts whenever searchByWhat or searchProduct changes

//   const fetchAllProducts = async () => {
//     try {
//       const baseUrl = "http://localhost:3006/api/allproducts";
//       const response = await fetch(baseUrl);

//       if (!response.ok) {
//         console.log("Response not ok");
//         throw new Error("Network response was not ok");
//       }

//       const data = await response.json();
//       console.log(data);
//       setProducts(data);
//     } catch (error) {
//       console.error("Error fetching all products:", error);
//     }
//   };

//   const fetchProducts = async () => {
//     try {
//       const baseUrl = "http://localhost:3006/api/products";
//       let searchQuery = "";

//       if (searchByWhat === "name") {
//         searchQuery = `ByName/?name=${searchProduct}`;
//       } else if (searchByWhat === "price") {
//         searchQuery = `ByPrice/?price=${searchProduct}`;
//       } else if (searchByWhat === "rating") {
//         searchQuery = `ByRating/?rating=${searchProduct}`;
//       }

//       const response = await fetch(baseUrl + searchQuery);

//       if (!response.ok) {
//         console.log("Response not ok");
//         throw new Error("Network response was not ok");
//       }

//       const data = await response.json();
//       console.log(data);
//       setProducts(data);
//     } catch (error) {
//       console.error("Error fetching products by search:", error);
//     }
//   };

//   const handleSearchByWhatChange = (e) => {
//     setSearchByWhat(e.target.value);
//     setSearchProduct(""); // Reset searchProduct when searchByWhat changes
//   };

//   const handleSearchProductChange = (e) => {
//     setSearchProduct(e.target.value);
//   };

//   return (
//     <div className="search-products-container">
//       <select
//         value={searchByWhat}
//         onChange={handleSearchByWhatChange}
//         className="search-products-select"
//       >
//         <option value="">Select How to Search</option>
//         <option value="name">Name</option>
//         <option value="price">Price</option>
//         <option value="rating">Rating</option>
//       </select>

//       {searchByWhat && (
//         <input
//           type="text"
//           value={searchProduct}
//           onChange={handleSearchProductChange}
//           placeholder={`Search by ${searchByWhat}`}
//           className="search-products-input"
//         />
//       )}

//       {products.length > 0 && (
//         <ul className="search-products-list">
//           {products.map((product) => (
//             <li key={product.id} className="search-products-item">
//               <span className="search-products-name">{product.name}</span>
//               <br />
//               <Link to={`/productDetails/${product.productid}`}>
//                 <button className="search-products-view-button">
//                   View Details
//                 </button>
//               </Link>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default SearchProducts;


import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./SearchProducts.css"; // Import the CSS file

const SearchProducts = () => {
  const [searchByWhat, setSearchByWhat] = useState("");
  const [searchProduct, setSearchProduct] = useState("");
  const [lowerLimit, setLowerLimit] = useState("");
  const [upperLimit, setUpperLimit] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchAllProducts(); // Fetch all products when the component mounts
  }, []); // Empty dependency array to fetch all products only once when the component mounts

  useEffect(() => {
    if (searchByWhat !== "" || searchProduct !== "") {
      fetchProducts(); // Fetch products whenever search criteria change
    }
  }, [searchByWhat, searchProduct, lowerLimit, upperLimit]); // Trigger fetchProducts whenever searchByWhat, searchProduct, lowerLimit, or upperLimit changes

  const fetchAllProducts = async () => {
    try {
      const baseUrl = "http://localhost:3006/api/allproducts";
      const response = await fetch(baseUrl);

      if (!response.ok) {
        console.log("Response not ok");
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);
      setProducts(data);
    } catch (error) {
      console.error("Error fetching all products:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const baseUrl = "http://localhost:3006/api/products";
      let searchQuery = "";

      if (searchByWhat === "name") {
        searchQuery = `ByName/?name=${searchProduct}`;
      } else if (searchByWhat === "price") {
        searchQuery = `ByPrice/?lower=${lowerLimit}&upper=${upperLimit}`;
      } else if (searchByWhat === "rating") {
        searchQuery = `ByRating/?lower=${lowerLimit}&upper=${upperLimit}`;
      }

      const response = await fetch(baseUrl + searchQuery);

      if (!response.ok) {
        console.log("Response not ok");
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products by search:", error);
    }
  };

  const handleSearchByWhatChange = (e) => {
    setSearchByWhat(e.target.value);
    setSearchProduct(""); // Reset searchProduct when searchByWhat changes
  };

  const handleSearchProductChange = (e) => {
    setSearchProduct(e.target.value);
  };

  const handleLowerLimitChange = (e) => {
    setLowerLimit(e.target.value);
  };

  const handleUpperLimitChange = (e) => {
    setUpperLimit(e.target.value);
  };

  return (
    <div className="search-products-container">
      <select
        value={searchByWhat}
        onChange={handleSearchByWhatChange}
        className="search-products-select"
      >
        <option value="">Select How to Search</option>
        <option value="name">Name</option>
        <option value="price">Price</option>
        <option value="rating">Rating</option>
      </select>

      {searchByWhat === "price" || searchByWhat === "rating" ? (
        <>
          <input
            type="number"
            value={lowerLimit}
            onChange={handleLowerLimitChange}
            placeholder="Lower Limit"
            className="search-products-input"
          />
          <input
            type="number"
            value={upperLimit}
            onChange={handleUpperLimitChange}
            placeholder="Upper Limit"
            className="search-products-input"
          />
        </>
      ) : (
        <input
          type="text"
          value={searchProduct}
          onChange={handleSearchProductChange}
          placeholder={`Search by ${searchByWhat}`}
          className="search-products-input"
        />
      )}

      {products.length > 0 && (
        <ul className="search-products-list">
          {products.map((product) => (
            <li key={product.id} className="search-products-item">
              <span className="search-products-name">{product.name}</span>
              <br />
              <Link to={`/productDetails/${product.productid}`}>
                <button className="search-products-view-button">
                  View Details
                </button>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchProducts;


