

module.exports =(req,res,next)=>{
    const {FirstName, LastName, Email, RoadNo, HouseNo, City, District, Password}=req.body;
    function validEmail(userEmail){
        // eslint-disable-next-line no-useless-escape
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return re.test(userEmail);
    }
    if(req.path === "/register"){
        if (![FirstName, LastName, Email, RoadNo, HouseNo, City, District, Password].every(Boolean)) {
            return res.status(401).json("Missing Credentials");
        } else if (!validEmail(Email)) {
            return res.status(401).json("Invalid Email");
        }
    } else if (req.path === "/login") {
        if (![Email, Password].every(Boolean)) {
            return res.status(401).json("Missing Credentials");
        } else if (!validEmail(Email)) {
            return res.status(401).json("Invalid Email");
        }
    }
    next();
}