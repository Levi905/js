const {majorModel} = require('../model/majorModel');

async function addMajor(req,res,next){
    let major = await majorModel.create(req.body);
    res.send({
        data:major
    });
}

async function listMajor(req,res,next){
    let major = await majorModel.find();
    res.send({
        data:major
    });
}


module.exports = {
    addMajor,
    listMajor
}