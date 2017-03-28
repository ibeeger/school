// ADbf97eeca825492fe2effb21abc4a97
var express = require('express');
var router = express.Router();
var client = require("./tools/client.js");

//获取个人信息
router.get('/local', function(req, res, next) {

	client.setMethod("GET");
	client.post("http://api.map.baidu.com/place/v2/search?query=大学&page_size=20&page_num=0&scope=1&location=39.915,116.404&radius=3000&output=json&ak=C2mrQAjRj3oc9XvbTrPP1UvLEZgWQDZR",{},function(data){
		if (typeof data =='object') {
			res.json(data)
		}else{
			res.end(data+"!")
		}
	})
	 
    
});

module.exports = router;
