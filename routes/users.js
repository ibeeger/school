var express = require('express');
var router = express.Router();



//获取个人信息
router.post('/fetch', function(req, res, next) {
    res.json({

    })
});

//修改个人信息
router.post("/save",function(req,res,next){

});


//上传
router.post("/upload",function(req,res,next){

});


//获取个人动态信息
router.post("/states",function(req,res,next){

});

//上传头像
router.post("/uploadhead",function(req,res,next){

});


module.exports = router;
