//Manages the userdata schema

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required : true},
    email: {type: String, required: true, unique:true},
    password: {type: String, required: true, unique: true},

},{timestamps : true});

//Hash password before saving

userSchema.pre('save', async function (next){
    if(!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

//The pre hook is a middleware in Mongoose that executes before a specific action—in this case, before saving a document to the database.
//The hook ensures that certain operations (e.g., password hashing) are completed before the document is stored.

//Match the password

userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema)



