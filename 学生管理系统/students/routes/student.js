var express = require('express');
var router = express.Router();

//配置数据库连接
const {Schema ,model} = require('mongoose');
const studentsSchema = new Schema({
	studentId:String,
	studentName:String,
    studentAge:String,
    studentClass:String,
    studentAchievement:String
},{versionKey:false});
const studentsModel = model('studentsModel',studentsSchema,'students');

router.post('/addStu', async function (req, res, next) {
    let test = await studentsModel.create(req.body);
    res.send({
        code:200,
    });
});

router.post('/listStu', async function (req, res, next) {
    let data = await studentsModel.find();
    res.send({
        code:200,
        data
    });
});

router.post('/delStu', async function (req, res, next) {
    let data = await studentsModel.deleteOne(req.body);
    console.log(data);
    res.send({
        code:200,
        data
    });
});


module.exports = router;
