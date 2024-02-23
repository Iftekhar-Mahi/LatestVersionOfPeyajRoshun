import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const SearchProducts = () => {
  const [searchByWhat, setSearchByWhat] = useState("");
  const [searchProduct, setSearchProduct] = useState("");
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const baseUrl = "http://localhost:3006/api/products";
      let searchQuery = "";

      if (searchByWhat === "name") {
        searchQuery = `ByName/?name=${searchProduct}`;
      } else if (searchByWhat === "price") {
        searchQuery = `ByPrice/?price=${searchProduct}`;
      } else if (searchByWhat === "rating") {
        searchQuery = `ByRating/?rating=${searchProduct}`;
      }

      const response = await fetch(baseUrl + searchQuery);

      if (!response.ok) {
        console.log("Response not ok");
        throw new Error("Network response was not ok");
      }
      if (response.ok) {
        console.log("Response ok");
      }

      const data = await response.json();
      console.log(data);
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products by search:", error);
    }
  };

  const handleSearch = () => {
    fetchProducts();
  };

  const handleSearchByWhatChange = (e) => {
    setSearchByWhat(e.target.value);
    setSearchProduct("");
  };

  const handleSearchProductChange = (e) => {
    setSearchProduct(e.target.value);
  };

  return (
    <div>
      <select value={searchByWhat} onChange={handleSearchByWhatChange}>
        <option value="">Select How to Search</option>
        <option value="name">Name</option>
        <option value="price">Price</option>
        <option value="rating">Rating</option>
      </select>

      {searchByWhat && (
        <input
          type="text"
          value={searchProduct}
          onChange={handleSearchProductChange}
          placeholder={`Search by ${searchByWhat}`}
        />
      )}

      <button onClick={handleSearch}>Search</button>

      {products.length > 0 && (
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              
              {product.name}
              <br></br>
              <Link to={`/productDetails/${product.productid}`}>
                <button>View Details</button>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchProducts;
