var express = require('express');
var router = express.Router();

const {addMajor,listMajor} = require('../controller/majorController');


router.post('/addmajor',addMajor);
router.post('/listmajor',listMajor);

module.exports = router;