const {studentsModel} = require('../model/studentModel');

async function addStu(req, res, next) {
    console.log(req.body);
    let test = await studentsModel.create(req.body);
    res.send({
        code:200,
    });
}

async function listStu(req, res, next) {
    let data = await studentsModel.find().populate('majorid').limit(Number(req.body.pagenum)).skip(Number(req.body.pagenow)*Number(req.body.pagenum));
    console.log(data);
    res.send({
        code:200,
        data
    });
}

async function delStu(req, res, next) {
    let data = await studentsModel.deleteOne(req.body);
    res.send({
        code:200,
        data
    });
}

async function updateStu(req, res, next) {
    let data = await studentsModel.find(req.body);
    res.send({
        code:200,
        data
    });
}

async function reupdate(req, res, next) {
    await studentsModel.updateOne({studentId:req.body.studentId},req.body);
    res.send({
        code:200,
    });
}

module.exports = {
    addStu,
    listStu,
    delStu,
    updateStu,
    reupdate
}