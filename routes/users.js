const express = require('express');
const router = express.Router();
const WXBizDataCrypt = require('./wx/WXBizDataCrypt')

// const fetch ={};
const fetch = require("./tools/fetch.js");
const client = require("./tools/client.js");
const wxconfig = require("./dbconf/wxconfig")

// https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code



//获取个人信息
router.post('/fetch', function(req, res, next) {
	fetch.findOne("users", {}).then((data) => {
		res.json(data[0]);
	}).catch((err) => {
		res.json(err);
	})

});

//修改个人信息
router.post("/save", function(req, res, next) {

	client.setMethod("GET");
	client.post("https://api.weixin.qq.com/sns/jscode2session?appid="+wxconfig.appid+"&secret="+wxconfig.secret+"&js_code="+req.body.code+"&grant_type=authorization_code",{},
		function(data){
			res.json(data);
		}
	)

	// fetch.updateObj("users", {}).then((data) => {
	// 	res.json(data[0]);
	// }).catch((err) => {
	// 	res.json(err);
	// })
});


//上传
router.post("/upload", function(req, res, next) {
	
});


//获取个人动态信息
router.post("/states", function(req, res, next) {
	var page = req.body.page || 1;
	fetch.findLimit("users_status",{},page).then(()=>{

	})
});

//上传头像
router.post("/uploadhead", function(req, res, next) {

});


module.exports = router;