var express = require('express');
var router = express.Router();

// 配置数据的结构
const { Schema, model } = require('mongoose');
const usersSchema = new Schema({
	username: String,
	password: String
}, { versionKey: false });
// 配置数据模型
const usersModel = model('usersModel', usersSchema, 'users');


router.post('/login', async function (req, res, next) {
	// 处理登录请求
	// 1. 接收前端发送到后端的数据（账号密码）
	const data = req.body;
	// console.log('前端发送的账号密码：', data);  // { username: 123, userpass: 123 }
	// 2. 在数据库中查询是否有该条数据
	const result = await usersModel.find(data);
	// const result = await usersModel.find({ username: data.username, password: data.userpass });
	// console.log('数据库查询的结果：', result);
	if (result.length > 0) {
		// 后端发送处理结果给前端
		res.send({
			message: '登录成功',
			code: 200
		});
	} else {
		// 后端发送处理结果给前端
		res.send({
			message: '登录失败',
			code: 500
		});
	}
});

router.post('/register', async function (req, res, next) {
	// 处理注册请求
	const data = req.body;  // req.query
	// console.log('注册数据：', data);

	// 验证账号是否存在
	const isUsername = await usersModel.find({ username: data.username });
	if (isUsername.length > 0) {
		res.send({
			message: '账号已存在，注册失败',
			code: 500
		});
		return;
	}

	const result = await usersModel.create(data);
	if (result) {
		// 后端发送处理结果给前端
		res.send({
			message: '注册成功',
			code: 200
		});
	} else {
		res.send({
			message: '注册失败',
			code: 500
		});
	}
});



module.exports = router;
