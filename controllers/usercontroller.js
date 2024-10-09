const UserModel = require('../models/UserModel')
const logincontroller = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await UserModel.findOne({ email, password })
        if (!user) {
            res.status(404).send("User not found")
        }
        res.status(200).json({
            success:true,
            user
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error
        })
    }
}

const registercontroller = async (req, res) => {
    try {
      
        const newuser = new UserModel(req.body)
        await newuser.save();
        
        res.status(201).json({
            success:true,
            newuser,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error,
        })
    }
}
module.exports = { logincontroller, registercontroller }