const jwt = require('jsonwebtoken');
const User = require('../modules/User');

//The protect middleware is used to secure routes by ensuring that only authenticated users with a valid JWT (JSON Web Token) can access them. It performs token validation and attaches the authenticated user's data to the req object for subsequent use in the request lifecycle.
const protect = async(req, res, next) =>{
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){

        try{
            token = req.headers.authorization.split(' ')[1];
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch(error){
            res.status(401).json({success: false, message:'Unauthorized, invalid token'});
        }
    }
    if(!token){
        res.status(401).json({sucess: false, message: 'No token provided'});
    }
};

module.export = {protect};