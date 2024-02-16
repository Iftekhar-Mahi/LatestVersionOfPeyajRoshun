const router = require('express').Router();
const pool = require("../db/index");
const authorization = require("../middleware/authorization");

router.get("/",authorization,async (req,res)=>{
    try {
        //req.user has the payload, has the user id
        const user = await pool.query("SELECT firstName,lastname,email,roadno,houseno,city,district FROM users WHERE userid = $1",[req.user]);
        //console.log(user.rows[0]);
        res.json(user.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

module.exports = router;