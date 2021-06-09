var express = require('express');
var router = express.Router();

const {addStu,listStu, delStu,updateStu, reupdate} = require('../controller/studentController');

router.post('/addStu', addStu);

router.post('/listStu', listStu);

router.post('/delStu', delStu);

router.post('/updateStu', updateStu);

router.post('/reupdate', reupdate);

module.exports = router;
