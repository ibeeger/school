var express = require('express');
var router = express.Router();

const fetch ={};
// const fetch = require("./tools/fetch.js");

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
	fetch.updateObj("users", {}).then((data) => {
		res.json(data[0]);
	}).catch((err) => {
		res.json(err);
	})
});


//上传
router.post("/upload", function(req, res, next) {
	
});


//获取个人动态信息
router.post("/states", function(req, res, next) {
	let page = req.body.page || 1;
	fetch.findLimit("users_status",{},page).then(()=>{

	})
});

//上传头像
router.post("/uploadhead", function(req, res, next) {

});


module.exports = router;