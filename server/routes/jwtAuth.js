const router = require('express').Router();
const pool = require("../db/index");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validinfo");
const authorization = require("../middleware/authorization");

////registering
router.post("/register",validInfo,async (req,res)=>{
    try {
        
        //1. destructure the req.body (name,email,password)
        const {FirstName, LastName, Email, RoadNo, HouseNo, City, District, Password}=req.body;
        //2. check if user exists (if user exists then throw error)
        const user = await pool.query("SELECT * FROM users WHERE email = $1",[Email]);
        if(user.rows.length!==0){
            return res.status(401).send("User already exists");
        }

        
        //3. Bcrypt the user password
        const saltRound=10;
        const salt=await bcrypt.genSalt(saltRound);
        const bcryptPassword=await bcrypt.hash(Password,salt);
        //4. enter the new user inside our database
        const newUser=await pool.query("INSERT INTO users (FirstName, LastName, Email, RoadNo, HouseNo, City, District, Password) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *",[FirstName, LastName, Email, RoadNo, HouseNo, City, District,bcryptPassword]);
        
        //5. generating our jwt token
        const token=jwtGenerator(newUser.rows[0].userid);
        //6. send the token
        res.json({token});
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

//login route
router.post("/login",validInfo,async (req,res)=>{
    try {
        //1. destructure the req.body
        const {Email,Password}=req.body;
        //2. check if user doesn't exist(if not then throw error)
        const user=await pool.query("SELECT * FROM users WHERE email=$1",[Email]);
        if(user.rows.length===0){
            return res.status(401).json("Password or Email is incorrect");
        }
        //3. check if incoming password is the same as the database password
        const validPassword=await bcrypt.compare(Password,user.rows[0].password);
        if(!validPassword){
            return res.status(401).json("Password or Email is incorrect");
        }
        console.log(validPassword);
        //4. give them the jwt token
        const token=jwtGenerator(user.rows[0].userid);
        res.json({token});
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

router.get("/is-verify",authorization,async (req,res)=>{
    try {
        res.json(true);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});


module.exports = router;


