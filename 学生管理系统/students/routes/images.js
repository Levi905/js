var express = require('express');
var router = express.Router();

const {uploadFiles} = require('../utils/handleFiles');

router.post('/uploadImages',function(req,res,next){
    const upload = uploadFiles({

    });
    upload(req,res,(error)=>{
        if(error){
            console.log("error");
        }else{
            res.send({
                msg:"ok",
                code:1,
                data:"./temp/"+req.files[0].filename
            })
        }
    })
});

module.exports = router;