var express = require('express');
var router = express.Router();

const {Schema ,model} = require('mongoose');
const majorSchema = new Schema({
	majorNmae:String
},{versionKey:false});
const majorModel = model('majorModel',majorSchema,'major');

router.post('/listmajor',async function(req,res,next){
    let major = await majorModel.find();
    res.send({
        data:major
    });
});

module.exports = router;