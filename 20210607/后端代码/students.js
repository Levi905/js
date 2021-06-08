var express = require('express');
var router = express.Router();

const { Schema, model } = require('mongoose');
const studentsSchema = new Schema({
    name: String,
    age: String,
    gender: String
}, { versionKey: false })
const studentsModel = model('studentsModel', studentsSchema, 'students')


router.get('/getStudents', async function (req, res, next) {
    try {
        const data = req.query; // { type: 'name', value: '' }
        let result = [];
        if (data.value) {
            // 搜索
            result = await studentsModel.find({ [data.type]: data.value });
        } else {
            // 获取所有
            result = await studentsModel.find();
        }
        res.send({
            message: '获取学生数据成功',
            code: 200,
            data: result
        })
    } catch (error) {
        res.send({
            message: '获取学生数据失败',
            code: 500
        })
    }
});


router.post('/addStudents', async function (req, res, next) {

    try {
        // 当 try 内部的代码报错时，会执行 catch
        const data = req.body;
        const result = await studentsModel.create(data);
        res.send({
            message: '学生数据新增成功',
            code: 200
        })
    } catch (error) {
        res.send({
            message: '学生数据新增失败',
            code: 500
        })
    }




    // res.send({
    //     message: '获取学生数据成功',
    //     code: 200,
    //     data: [
    //         { name: '张三' }
    //     ]
    // })
});

router.post('/deleteStudents', async function (req, res, next) {
    try {
        const data = req.body;
        const result = await studentsModel.deleteOne(data);
        // console.log('删除结果', result);
        if (result.deletedCount > 0) {
            res.send({
                message: '学生数据删除成功',
                code: 200
            })
        } else {
            res.send({
                message: '学生数据删除失败',
                code: 500
            })
        }
    } catch (error) {
        console.log('-------------------------');
        console.log(error);
        res.send({
            message: '删除学生数据失败',
            code: 500
        })
    }
});

module.exports = router;
