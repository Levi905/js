const {Schema ,model} = require('mongoose');
const majorSchema = new Schema({
	majorName:String
},{versionKey:false});
module.exports.majorModel = model('majorModel',majorSchema,'major');
