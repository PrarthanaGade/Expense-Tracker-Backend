const mongoose = require('mongoose');

const connectDB = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser : true,
            useUnifiedTopolody: true,
        });
        console.log('MongoDB connected successfully');
    }catch(error){
        console.error('MongoDB connection error: ', error.message);
        process.exit(1); //exit the process if the connection fails
    }
};

module.exports = connectDB;