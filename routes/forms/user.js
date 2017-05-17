/*
 * @Author: ibeeger
 * @Date:   2017-05-17 16:14:06
 * @Last Modified by:   ibeeger
 * @Last Modified time: 2017-05-17 17:21:55
 */

'use strict';

const fetch = require("../tools/fetch.js");
const djson = require("../resjson/res.js");


// const {
// 	title:"xxx休息休息",
// 	qtype:1,
// 	choses:["xxxxxxx","bbbbbbbb","ddddddd"]
// }

//我的表单列表
function myVotes(req, res, next) {
	const _uid = req.query.token;
	if (!_uid) {
		res.json(djson.no);
		return;
	}
	fetch.find("votes", {
		uid: _uid
	}).then(function(data) {
		res.json({
			code: 0,
			data: data
		})
	}, function(err) {
		res.json(djson.err);
	})

}

//我的列表详情
function myVotesItem(req, res, next) {
	const _uid = req.query.token;
	const _vid = req.body.vid;
	
	if (!_vid || !_uid) {
		res.json(djson.no);
		return;
	}
	fetch.findAny("votes", {
		uid: _uid,
		_id: _vid
	}).then(function(data) {
		res.json({
			code: 0,
			data: data
		})
	}, function() {
		res.json(djson.err)
	})
}


//创建表单
function createVote(req,res,next){
	const _uid = req.query.token;
	if (!_uid || !req.body.title) {
		res.json(djson.no);
		return;
	};

	fetch.inserObj("votes",{uid:_uid,vote:req.body}).then(function(data){
		res.json({
			code:0,
			data:data.ops
		})
	},function(){
		res.json(djson.err);
	})


}


module.exports = {
	myVotes: myVotes,
	myVotesItem:myVotesItem,
	createVote:createVote
}