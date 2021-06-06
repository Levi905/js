var express = require('express');
var router = express.Router();

const {Schema ,model} = require('mongoose');
const usersSchema = new Schema({
	username:String,
	password:String
},{versionKey:false});
const usersModel = model('userModel',usersSchema,'users');

router.post('/login', async function (req, res, next) {
	let user = await usersModel.find(req.body);
	if(user.length>0){
		res.send({
			message: "登陆成功",
			code: 200,
			data: user
		});
	}else{
		res.send({
			message: "登陆失败",
			code: 400,
		});
	}
	
});

router.post('/register', async function (req, res, next) {
	let check = await usersModel.find(req.body);
	console.log(req.body,check);
	if(check == 0){
		let user = await usersModel.create(req.body);
		res.send({
			message: user.username+"注册成功",
			code: 200,
			data: user
		});
	}else{
		res.send({
			message: "注册失败",
			code: 400,
		});
	}
	
});
module.exports = router;
