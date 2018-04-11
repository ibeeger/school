/*
* @Author: ibeeger
* @Date:   2017-05-16 10:54:21
* @Last Modified by:   ibeeger
* @Last Modified time: 2017-05-16 14:49:52
*/

'use strict';
var express = require('express');
var router = express.Router();

var cli = require("./view.js");

function test(req,res,next){
	res.json({code:0,data:null,msg:"123"});
}

//vote
router.get("/view/:vid",cli.view);//投票页面
router.post("/push/item",cli.vote);//投票

//信息列表数据
router.post("/fetch/news/list",test);

/** ============表单信息 ============== **/
//获取我的表单列表
router.post("/fetch/our/list",test);
//获取我的表单详情
router.post("/fetch/our/item",test);
//创建表单
router.post("/create/our/item",test);


/**================用户信息 ============**/
//获取我的信息
router.post("/fetch/user/info",test);
//更新用户信息
router.post("/update/user/info",test);
//用户登录
router.post("/fetch/user/login",test);


