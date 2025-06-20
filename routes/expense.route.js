const express = require('express');
const { addExpense, getExpenses } = require('../controllers/expense.controller');
const { protect } = require('../middlewares/auth.middleware'); // Ensure user is authenticated

const router = express.Router();

// Add a new expense
router.post('/add', protect, addExpense);

// Get all expenses for the logged-in user
router.get('/', protect, getExpenses);

module.exports = router;
