const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
    userid:{
        type: String,
        required: true,
    },

    amount: {
        type: Number,
        required: [true, 'Amount Required  ']
    },
    category: {
        type: String,
        required: [true, 'Category Required  ']
    },
    type: {
        type: String,
        required: [true, 'type Required  '],
    },
    reference: {
        type: String,

    },
    description: {
        type: String,
        required: [true, "Desc Required"]
    },
    date: {
        type: Date,
        required: [true, "Data Required"]
    }
}, { timestamps: true })
const TransactionModel = mongoose.model('transactions', transactionSchema)
module.exports = TransactionModel;