//The Expense model defines the schema for storing expense data in the database

const mongoose = require('mongoose');

const expenseSchema =  mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref:'User', //Reference to usermodel
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        category : {
            type: String,
            required: true,
            enum: ['Food', ' Transport', ' Skincare', 'Travel','Utilities','Others'],
        },
        date : {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamp: true, 
    }
);

module.exports = mongoose.model('Expense', expenseSchema);