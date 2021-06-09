const {Schema ,model} = require('mongoose');
const usersSchema = new Schema({
	username:String,
	password:String
},{versionKey:false});


module.exports.usersModel = model('userModel',usersSchema,'users');