// ADbf97eeca825492fe2effb21abc4a97
var express = require('express');
var router = express.Router();
var client = require("./tools/client.js");

//获取周边学校
router.post('/local', function(req, res, next) {
	console.log(req.body);
	client.setMethod("GET");
	client.post("http://api.map.baidu.com/place/v2/search?query=大学&page_size=20&page_num=0&scope=1&location="+req.body["latitude"]+","+req.body["longitude"]+"&radius=3000&output=json&ak=C2mrQAjRj3oc9XvbTrPP1UvLEZgWQDZR",{},function(data){
		if (typeof data =='object') {
			res.json(data)
		}else{
			res.end(data+"!")
		}
	})
});


//获取城市
router.get("/jingdian",function(req,res,next){

	client.setMethod("GET");
	client.post("http://api.map.baidu.com/geocoder/v2/?location=39.983424,116.322987&output=json&pois=1&ak=C2mrQAjRj3oc9XvbTrPP1UvLEZgWQDZR",{},function(json){
		var item = {city:"北京"}
		if (typeof json=='object' && json.status==0) {

			 item["city"] = json["result"]["addressComponent"]["city"];
			 item["citycode"] = json["result"]["cityCode"];
			client.post("http://api.map.baidu.com/place/v2/search?query=景点&region="+item['city']+"&page_size=20&page_num=0&scope=2&output=json&ak=C2mrQAjRj3oc9XvbTrPP1UvLEZgWQDZR",{},function(data){
				if (typeof data =='object') {
					res.json(data)
				}else{
					res.end(data+"!")
				}
			})
		}else{
			res.json(json);
		}

	})
})


//周边美食
router.get("/meishi",function(req,res,next){
	client.setMethod("GET");
	client.post("http://api.map.baidu.com/geocoder/v2/?location=39.983424,116.322987&output=json&pois=1&ak=C2mrQAjRj3oc9XvbTrPP1UvLEZgWQDZR",{},function(json){
		var item = {city:"北京"}
		if (typeof json=='object') {
			 item["city"] = json["result"]["addressComponent"]["city"];
			 item["citycode"] = json["result"]["cityCode"];
		}
		client.post("http://api.map.baidu.com/place/v2/search?query=美食&region="+item['city']+"&page_size=20&page_num=0&scope=1&output=json&ak=C2mrQAjRj3oc9XvbTrPP1UvLEZgWQDZR",{},function(data){
			if (typeof data =='object') {
				res.json(data)
			}else{
				res.end(data+"!")
			}
		})
	})
})





module.exports = router;
