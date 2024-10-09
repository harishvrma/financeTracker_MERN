const express = require('express');
const { addTransaction, getAllTransaction,editTransaction,deleteTransaction } = require('../controllers/transactionController');

const router = express.Router();
//add transaction
router.post('/add-transaction', addTransaction)
//edit transaction
router.post('/edit-transaction', editTransaction)
//get transaction
router.post('/get-transaction', getAllTransaction)
// delete transaction
router.post('/delete-transaction', deleteTransaction)


module.exports = router;
