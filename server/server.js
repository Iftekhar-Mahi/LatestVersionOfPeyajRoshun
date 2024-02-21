require("dotenv").config();
const express =require("express");
const morgan=require("morgan");
const app=express();
const cors = require('cors'); 
const db =require("./db");

//middleware
app.use(cors());
app.use(express.json());


//routes

//register and login routes
app.use("/auth",require("./routes/jwtAuth"));

//dashboard route
app.use("/dashboard",require("./routes/dashboard"));

// ...

// get all categories
app.get("/api/v1/categories", async (req, res) => {

    try {
        const results = await db.query('SELECT * FROM categories');
        console.log("route handler ren");
        //console.log(results);
        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data: {
                categories: results.rows,
            },
        });
    } catch (err) {
        console.log(err);
    }
});
// get products by category
app.get("/api/products/:categoryid", async (req, res) => {
    console.log("Fetching products for category:", req.params.categoryid);
    console.log("categoryid:", req.params.categoryid);//
    try {
        const results = await db.query("SELECT * FROM products WHERE categoryid = $1", [req.params.categoryid]);
        console.log(results);
        res.status(200).json(results.rows);
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
// get a product

app.get("/api/productDetails/:productid", async (req, res) => {
    console.log("Fetching product:", req.params.productid);
    try {
        const results = await db.query("SELECT * FROM products WHERE productid = $1", [req.params.productid]);
        console.log(req.params.productid);
        res.status(200).json(results.rows);
    } catch (err) {
        console.error('Error fetching product:', err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// ...

// get a category
app.get("/api/v1/categories/:id",async (req,res)=>{
    try{
        const results=await db.query("SELECT * FROM categories WHERE categoryid=$1",[req.params.id]);
        console.log(results);
        res.status(200).json({
            status:"success",
            data:{
                category:results.rows[0],
            },
        });
    }catch(err){    
        console.log(err);
    }
});
//create a user
app.post("/api/v1/user",async (req,res)=>{
    try{
        const results=await db.query("INSERT INTO Users (FirstName, LastName, Email, RoadNo, HouseNo, City, District, Password) values ($1,$2,$3,$4,$5,$6,$7,$8) returning *",[req.body.FirstName,req.body.LastName,req.body.Email,req.body.RoadNo,req.body.HouseNo,req.body.City,req.body.District,req.body.Password]);
        console.log(results);
        res.status(201).json({
            status:"success",
            data:{
                user:results.rows[0],
            },
        });
    }catch(err){
        console.log(err);
    }
});


console.log("mahi");

const port=process.env.PORT || 3001;
app.listen(port,()=>{
    console.log(`connected via port ${port}`);
});
