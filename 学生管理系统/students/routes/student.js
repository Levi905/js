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
    console.log(req.body);
    let data = await studentsModel.find().limit(Number(req.body.pagenum)).skip(Number(req.body.pagenow)*Number(req.body.pagenum));
    res.send({
        code:200,
        data
    });
});

router.post('/delStu', async function (req, res, next) {
    let data = await studentsModel.deleteOne(req.body);
    res.send({
        code:200,
        data
    });
});

router.post('/updateStu', async function (req, res, next) {
    let data = await studentsModel.find(req.body);
    res.send({
        code:200,
        data
    });
});

router.post('/reupdate', async function (req, res, next) {
    await studentsModel.updateOne({studentId:req.body.studentId},req.body);
    res.send({
        code:200,
    });
});



module.exports = router;
