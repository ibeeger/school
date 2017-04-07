var express = require('express');
var router = express.Router();
var ccap = require("ccap")();
var Msg = require("./message/index");
//获取验证码
router.get("/fetchCode",function(req,res,next){
	var ary = ccap.get();
	var txt = ary[0];
	var buf = ary[1];
	console.log(txt);
	res.end(buf);
});

//获取验证码
router.get("/fetchMsgCode",function(req,res,next){
	let phone = req.query.phone;
	Msg.sendRegCode(phone,1122).then(function(){
		console.log(arguments);
		res.end("ok");
	});

});

//注册
router.post("/register",function(req,res,next){
	res.json({})
});

//登录
router.post("/login",function(req,res,next){

});

//学校列表
router.post("/schools",function(req,res,next){

});




module.exports = router;
	