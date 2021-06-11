const {usersModel} = require('../model/userModel');

const jwt = require('jsonwebtoken');

async function login(req, res, next) {
	let user = await usersModel.find(req.body);

	if(user.length>0){
		const token = jwt.sign({
			user:user[0]
		},'hello',{expiresIn:10}
		)
		res.send({
			message: "登陆成功",
			code: 200,
			data: user,
			token:'Bearer '+token
		});
	}else{
		res.send({
			message: "登陆失败",
			code: 400,
		});
	}
	
}

async function register(req, res, next) {
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
	
}

module.exports = {
    login,
    register
}