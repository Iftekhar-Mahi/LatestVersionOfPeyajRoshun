const router = require('express').Router();
const pool = require("../db/index");
const authorization = require("../middleware/authorization");

router.get("/",authorization,async (req,res)=>{
    try {
        //req.user has the payload, has the user id
        const user = await pool.query("SELECT userid,firstName,lastname,email,roadno,houseno,city,district FROM users WHERE userid = $1",[req.user]);
        //console.log(user.rows[0]);
        console.log("Fetching user info");
        res.json(user.rows[0]);
        console.log("User info fetched");
    } catch (err) {
        // console.error(err.message);
        console.error('Error fetching user info:');
        res.status(500).send("Server error");
    }
});

module.exports = router;