const jwt = require("jsonwebtoken");

exports.verifyToken = async (req, res, next) => {
    const token = req.headers['auth-token'];
    if(!token){
       return res.status(400).json('Invalid user')
    }
 try{
    const verify = jwt.verify(token, process.env.SECRET_KEY);
    req.user = verify;
    next();

}catch(error){
  res.status(400).json('Token not valid')
}
}