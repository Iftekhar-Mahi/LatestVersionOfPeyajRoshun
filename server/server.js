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


app.post("/edit/:userId", async (req, res) => {
    const userId = req.params.userId;
    const { firstName, lastName, email, city, district } = req.body;

    try {
        const query = `
            UPDATE users
            SET firstName = $1, lastName = $2, email = $3, city = $4, district = $5
            WHERE userId = $6
        `;
        await db.query(query, [firstName, lastName, email, city, district, userId]);

        // Respond with success message
        res.status(200).json({ message: 'Profile updated successfully' });
    } catch (err) {
        console.error("Error updating profile:", err);
        res.status(500).json({ error: 'An error occurred while updating the profile' });
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

app.get("/api/productavgrating/:productid", async (req, res) => {
    console.log("Fetching product rating:", req.params.productid);
    try {
        const results = await db.query("SELECT ROUND(getavgrating($1), 3) as rating", [req.params.productid]);
        console.log(req.params.productid);
        res.status(200).json(results.rows);
    } catch (err) {
        console.error('Error fetching product:', err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
);

app.get("/orders/:id", async (req, res) => {
    try {
        console.log("Fetching orders for user:", req.params.id);
        const results = await db.query("SELECT * FROM orders WHERE userid = $1 order by amount desc", [req.params.id]);
        res.status(200).json(results.rows);
    } catch (err) {
        console.error('Error fetching orders:', err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get("/bugs", async (req, res) => {
    try {
        const results = await db.query('SELECT name,productid,categoryid FROM products order by productid asc');
        res.status(200).json(results.rows);
    } catch (err) {
        console.log(err);
    }
});


app.get("/promotions", async (req, res) => {
    try {
        const results = await db.query('SELECT * FROM promotions');
        //console.log(results.rows);
        res.status(200).json(results.rows);
    } catch (err) {
        console.error('Error fetching promotions:', err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get("/bugsTwo", async (req, res) => {
    try {
        const results = await db.query('SELECT productid,comment from productreview order by productid asc');
        res.status(200).json(results.rows);
    } catch (err) {
        console.log(err);
    }
});

app.get("/api/allproducts", async (req, res) => {
    try {
        const results = await db.query("SELECT * FROM products order by productid asc");
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


//get product review
app.get("/api/products/:productid/reviews", async (req, res) => {
    console.log("Fetching reviews for product:", req.params.productid);
    try {
        const results = await db.query("SELECT * FROM productreview WHERE productid = $1", [req.params.productid]);
        console.log(req.params.productid);
        res.status(200).json(results.rows);
    } catch (err) {
        console.error('Error fetching reviews:', err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}  );
app.get("/api/productsByName", async (req, res) => {
    console.log("Fetching product by name:", req.query.name);
    try {
       const results = await db.query("SELECT * FROM products WHERE name ILIKE '%' || $1 || '%'", [req.query.name]);
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
        const results = await db.query("SELECT p.productid as productid, p.name as name ,p.price as price, c.quantity as quantity from  products p join cart c on (p.productid=c.productid) where userid=$1", [req.params.userid]);
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


//handle
app.post("/api/addToCart/:productid/user/:userid/quantity/:num", async (req, res) => {
    console.log("Adding product to cart:", req.params.productid);
    console.log("Adding product to cart for user:", req.params.userid);
    try {
        const checkQuery = `
            SELECT userid, productid FROM cart 
            WHERE userid = $1 AND productid = $2`;
        const checkValues = [req.params.userid, req.params.productid];
        const checkResult = await db.query(checkQuery, checkValues);
        
        if (checkResult.rows.length > 0) {
            // If the combination exists, update the quantity
            const updateQuery = `
                UPDATE cart 
                SET quantity = quantity + $1 
                WHERE userid = $2 AND productid = $3`;
            const updateValues = [req.params.num, req.params.userid, req.params.productid];
            await db.query(updateQuery, updateValues);
        } else {
            // If the combination doesn't exist, insert a new row
            const insertQuery = `
                INSERT INTO cart (userid, productid, quantity) 
                VALUES ($1, $2, $3)`;
            const insertValues = [req.params.userid, req.params.productid, req.params.num];
            await db.query(insertQuery, insertValues);
        }

        res.status(201).json({ message: "Product added to cart successfully." });
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
