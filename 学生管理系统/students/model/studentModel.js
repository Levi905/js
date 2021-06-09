const {Schema ,model} = require('mongoose');
const studentsSchema = new Schema({
	studentId:String,
	studentName:String,
    studentAge:String,
    studentClass:String,
    stuimages:String,
    majorid:{
        type:Schema.Types.ObjectId,
        ref:'majorModel'
    }
},{versionKey:false});

module.exports.studentsModel = model('studentsModel',studentsSchema,'students');
