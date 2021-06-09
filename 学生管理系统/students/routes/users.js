var express = require('express');
var router = express.Router();

const {login,register} = require('../controller/userController');

router.post('/login',login);

router.post('/register',register);

module.exports = router;
