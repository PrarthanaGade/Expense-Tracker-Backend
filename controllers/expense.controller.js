//The controller will handle the logic for adding and retrieving expenses.

const Expense = require('../models/Expense');

//Adding new elements in expense
const addExpense = async (req, res) =>{
    const { title, amount, category } = req.body;

    try{
        //Expense.create: Creates and saves a new expense document in the database
        const expense = await Expense.create({
            user: req.user.id, //logged in user id from middleware
            //req.user.id: This is the ID of the logged-in user, provided by the protect middleware.
            title,
            amount,
            category,
        });

        res.status(201).json({
            success: true,
            data: expense,
        });
    } catch(error){
        res.status(500).json({
            success: false,
            message: "Failed to add expense",
            error: error.message,
        });
    };
};

//Get expense for the logged in user
const getExpense = async (req, res) =>{
    try{
        const expense = await Expense.find({ user:req.user.id}).sort({ data: -1});
        // sorted data based(most recent first)

        req.status(200).json({
            success: true,
            data: expense,
        });
    } catch(error){
        req.status(500).json({
            success: false,
            message: "Failed to fetch expenses",
            error: error.message,
        });
    }
};

module.exports = { addExpense, getExpense };