var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/login', function(req, res, next) {
  console.log(Object.keys(req.body)[0]);
  res.send({
    message:"登陆成功",
    code:200,
    data:Object.keys(req.body)[0]
  });
});

module.exports = router;
