const TransactionModel = require("../models/transactionModel");
const moment = require('moment')
const getAllTransaction = async(req,res) =>{
    try {
        const {freq} = req.body
        const transactions = await TransactionModel.find({
            date : {
                $gt : moment().subtract(Number(freq),'d').toDate(),
            },
            userid:req.body.userid,

         })
        res.status(200).json(transactions)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }

}
const deleteTransaction = async(req,res)=>{
try {
    await TransactionModel.findOneAndDelete({_id:req.body.transactionId});
    res.status(200).send('Transaction deleted SuccessFully')
} catch (error) {
    console.log(error);
        res.status(500).json(error)
}
}
const editTransaction= async(req,res)=>{
    try {
        await TransactionModel.findOneAndUpdate({_id:req.body.transactionId} , req.body.payload)
        res.status(200).send("Edited SuccessFully");
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}


const addTransaction =async (req,res)=>{
try {
    const newtransaction = new TransactionModel(req.body);
    await newtransaction.save();
    res.status(201).send('Transaction Created')
} catch (error) {
    console.log(error);
    res.status(500).json(error)
}
};

module.exports = {getAllTransaction,addTransaction,editTransaction,deleteTransaction}