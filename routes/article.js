/*
* @Author: ibeeger
* @Date:   2017-11-28 19:52:02
* @Last Modified by:   ibeeger
* @Last Modified time: 2017-11-28 20:14:23
*/

'use strict';
var express = require('express');
var router = express.Router();
var fetch = require("./tools/fetch.js");

router.post("/list",function(req,res,next){

});

router.post("/item",function(req,res,next){

});

router.post("/add",function(req,res,next){
	fetch.inserObj("articles",req.body).then(function(data){

	}).catch(function(err){
		console.log(err);
		res.json({code:1,msg:"添加失败"});
	})
})
