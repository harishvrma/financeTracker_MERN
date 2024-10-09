const express = require('express');
const { logincontroller, registercontroller } = require('../controllers/usercontroller');

const router = express.Router();

router.post('/login', logincontroller);

router.post('/register', registercontroller);

module.exports = router;
