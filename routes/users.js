const express = require('express');
const router = express.Router();
const WXBizDataCrypt = require('./wx/WXBizDataCrypt')
const fs =require("fs");
// const fetch ={};
const fetch = require("./tools/fetch.js");
const client = require("./tools/client.js");
const wxconfig = require("./dbconf/wxconfig")


const success = {
	code:0,
	data:{}
}


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
			const pc = new WXBizDataCrypt(wxconfig.appid, data.session_key);
			const rst = pc.decryptData(req.body.encryptedData , req.body.iv);
			fetch.findOne("users",{"openId":rst.openId},{openId:0}).then(function(fjson){
				console.log(fjson);
				console.log("找到了"+rst.openId);
				res.json(Object.assign(success,{data:fjson["_id"]}));
			},function(err){
				console.log("未找到"+rst.openId);
				fetch.inserObj("users",rst).then(function(ijson){
					res.json(Object.assign(success,{data:ijson["ops"][0]["_id"]}));
				})
			})	

			
		}
	)
});


//上传
router.post("/upload", function(req, res, next) {

	let str = fs.createWriteStream(__dirname+"/../public/images/a.png");
	
	req.pipe(str,"UTF8");

	str.on("finish",function(){
		res.end("ok");
	})

	str.on('error', function(err){
	   res.end("err");
	});

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