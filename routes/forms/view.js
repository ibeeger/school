/*
 * @Author: ibeeger
 * @Date:   2017-05-16 11:32:56
 * @Last Modified by:   ibeeger
 * @Last Modified time: 2017-05-16 15:40:24
 */

'use strict';

const fetch = require("../tools/fetch.js")

const items = [{
	title: "xxxxxxxxxx",
	qtype: 1,
	qid: "xxxxxx",
	choses: ["xxxxx", "dddddd", "yyyyy"]
}]

const body = [{
	qid: "dddddd",
	vote: "1,2",
	qtype: 1
}]

//投票页面
function view(req, res, next) {
	const _vid = req.params.vid;
	fetch.findOne("votes", {
		_id: _vid
	}).then(function(data) {
		res.render("formview", data);
	}, function() {
		res.json({
			code: 101,
			msg: "操作失败"
		})
	})
}

//提交投票结果
function vote(req, res, next) {
	if (req.query.hasOwnPerproty("vid")) {
		res.json({
			code: 100,
			msg: "非法请求"
		});
		return;
	}
	const vid = req.query.vid;
	const body = req.body;
	fetch.updatePush("votes", {
		_id: vid
	}, {
		votes: body
	}).then(function(data) {
		res.json({
			code: 0,
			msg: "操作成功"
		})
	}, function(err) {
		res.json({
			code: 101,
			msg: "操作失败"
		})
	})
}


module.exports = {
	view:view,
	vote:vote
}