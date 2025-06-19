//Handles user authentification and token generation

const User = require('../modules/User.js');
const generateToken = require('../utils/jwt.js');

//Register a new user
const registerUser = async(req, res) =>{
    const { name, email, password} = req.body;

   try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }
        //The findOne method checks the database for an existing user with the same email.

        const user = await User.create({ name, email, password });

        if (user) {
            res.status(201).json({
                success: true,
                data: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    token: generateToken(user.id),
                },
            });
        } else {
            res.status(400).json({ success: false, message: 'Invalid user data' });
            //If the user creation fails for any reason, it returns a 400 Bad Request.
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
        //Catches unexpected server errors and responds with a 500 Internal Server Error.
    }
};

//Login User
const loginUser = async(req, res) =>{
    const {email, password} = req.body;

    try{
        const user = await User.findOne({email});
        if(user &&(await user.matchPassword(password))){
            req.json({
                success: true,
                data: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    token: generateToken(user.id),
                },
            });
        }else{
            res.status(401).json({success: false, message:"invalid email or password"});
        }
    }catch(error){
        res.status(500).json({success: false, message:error.message});
    }
};


// Get current user profile
const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (user) {
            res.json({
                success: true,
                data: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                },
            });
        } else {
            res.status(404).json({ success: false, message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { registerUser, loginUser, getProfile };