const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const morgan = require('morgan')
const path = require('path')

const app = express();
dotenv.config(); // Load environment variables
console.log('MongoDB URI:', process.env.MONGO_URI); // Debug line

connectDB(); // Connect to MongoDB
app.use(morgan("dev"))
app.use(cors())
app.use(express.json());
// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname,"./client/dist")));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "./client/dist/index.html"));
  });
  

app.use('/api/v1/users',require('./routes/userroutes'))
app.use('/api/v1/transactions', require('./routes/transactionRoutes'))



const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

//backend = https://financetrackerapp-2.onrender.com
//frontend = financetrackerapp-agx7.vercel.app