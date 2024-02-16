import React, { useContext, useEffect } from "react";
import categoryFinder from "../apis/categoryFinder";
import { CategoriesContext } from "../context/categoriesContext";
import { Navigate, useNavigate } from "react-router-dom";


const CategoryList = () => {
  const navigate=useNavigate();
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
  function f() {
    navigate(`/productscategorywise`);
  }
  function navigateToProducts(category) {
    navigate(`/productscategorywise/${category.categoryid}`);
  }

  return (
    <div className="list-group">
      {/*<table className="table table-hover hover table-dark">
                <thed>
                    <tr className="bg-primary">
                        <th scope="col">Category</th>
                        <th scope="col"></th>
                    </tr>
                </thed>
                <body>
                    {categories.map((category)=>{
                        return(
                            <tr>
                                <td>{category.categoryname}</td>
                                <td><button className="btn btn-warning">Go</button></td>
                            </tr>
                        )
                    })}
                </body>
            </table>*/}
      <table
        className="table table-bordered table-dark"
      >
        <thead>
          <tr className="bg-primary text-white">
            <th scope="col">Category</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr
              key={index}
              className={
                index % 2 === 0 ? "bg-secondary" : "bg-dark text-white"
              }
            >
              <td>{category.categoryname}</td>
              <td>
                <button className="btn btn-outline-warning" onClick={() => navigateToProducts(category)}>Go</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryList;

{
  /*
                    <tr>
                        <td>Fruits</td>
                        <td><button className="btn btn-warning">Go</button></td>
                    </tr>
                    <tr>
                        <td>Snacks</td>
                        <td><button className="btn btn-warning">Go</button></td>
                    </tr>
                    */
}
