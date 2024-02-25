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
app.get("/categories", async (req, res) => {

    try {
        const results = await db.query('SELECT * FROM categories');
        console.log("route handler ren");
        //console.log(results);
        res.status(200).json(results.rows);
    } catch (err) {
        console.log(err);
    }
});

// get All products of a certain category
app.get("/products/:categoryid", async (req, res) => {
    console.log("Fetching products for category:", req.params.categoryid);
    console.log("categoryid:", req.params.categoryid);//
    try {
        console.log("Fetching products for category:", req.params.categoryid);
        const results = await db.query("SELECT * FROM products WHERE categoryid = $1", [req.params.categoryid]);
        console.log("Not reached here");
        //console.log(results);

        res.status(200).json(results.rows);
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get("/api/allproducts", async (req, res) => {
    try {
        const results = await db.query("SELECT * FROM products");
        res.status(200).json(results.rows);
    } catch (err) {
        console.log(err);
    }
});
// get a product

app.get("/productdetails/:productid", async (req, res) => {
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

app.get("/api/productsByName",async (req,res)=>{
    console.log("Fetching product by name:", req.query.name);
    try {

        
        const results = await db.query("SELECT * FROM products WHERE name = $1", [req.query.name]);
        console.log(req.query.name);
        console.log(results.rows);
        res.status(200).json(results.rows);
    } catch (err) {
        console.error('Error fetching product:', err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get("/api/productsByPrice",async (req,res)=>{ 
    console.log("Fetching product by price:", req.query.price);
    try {
        console.log(req.query.price);
        const results = await db.query("SELECT * FROM products WHERE price = $1", [req.query.price]);
        console.log(req.query.price);
        res.status(200).json(results.rows);
    } catch (err) {
        console.error('Error fetching product:', err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


app.get("/api/productsByRating",async (req,res)=>{       
    console.log("Fetching product by rating:", req.query.rating);
    try {
        const results = await db.query("SELECT * FROM products WHERE rating = $1", [req.query.rating]);
        console.log(req.query.rating);
        res.status(200).json(results.rows);
    } catch (err) {
        console.error('Error fetching product:', err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


app.get("/api/cart/:userid",async (req,res)=>{
    console.log("Fetching cart");
    try {
        const results = await db.query("SELECT * FROM products WHERE productid IN (SELECT productid FROM cart WHERE userid =$1)", [req.params.userid]);
        console.log(results);
        res.status(200).json(results.rows);
    } catch (err) {
        console.error('Error fetching cart:', err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.delete("/api/removeFromCart/:productid/user/:userid", async (req, res) => {
    console.log("Removing product from cart:", req.params.productid);
    try {
        const results = await db.query("DELETE FROM cart WHERE productid = $1 and userid=$2 returning * ", [req.params.productid,req.params.userid]);
        console.log(results.rowCount); // Logging the number of rows affected
        res.status(200).json(results.rows); // Returning the number of affected rows in JSON format
    } catch (err) {
        console.error('Error removing product from cart:', err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post("/api/addToCart/:productid/user/:userid", async (req, res) => {
    console.log("Adding product to cart:", req.params.productid);
    console.log("Adding product to cart:", req.params.userid);
    try {
        const results = await db.query("INSERT INTO cart (userid, productid,quantity) VALUES ($1, $2,4) returning *", [req.params.userid,req.params.productid]);
        console.log(results);
        res.status(201).json(results.rows);
    } catch (err) {
        console.error('Error adding product to cart:', err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post("/api/placeorder/:userid", async (req, res) => {
    try {
        const userId = req.params.userid;
        const { paymentmethod, paymentstatus } = req.body;
        console.log(paymentmethod);
        console.log(paymentstatus);

        const results = await db.query("SELECT placeorderforuser($1, $2, $3)", [userId, paymentmethod, paymentstatus]);
        res.status(200).json(results.rows);
    } catch (err) {
        console.error('Error placing order:', err);
        res.status(500).json({ error: "Internal Server Error" });
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
const port=process.env.PORT || 3001;
app.listen(port,()=>{
    console.log(`connected via port ${port}`);
});
