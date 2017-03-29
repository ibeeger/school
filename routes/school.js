/*
* @Author: ibeeger
* @Date:   2017-03-13 15:51:39
* @Last Modified by:   ibeeger
* @Last Modified time: 2017-03-29 19:15:20
* 学校动态
*/

'use strict';
var express = require('express');
var router = express.Router();

//获取
router.post("/fetch/states",function(req,res,next){
	
});

//发布
router.post("/push/status",function(req,res,next){
	let body = req.body;
	//type 1 动态 2 活动  3 
	body={ 

	}
})





module.exports = router;
