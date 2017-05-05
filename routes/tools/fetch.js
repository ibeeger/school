/*
 * @Author: willclass
 * @Date:   2016-08-04 20:36:26
 * @Last Modified by:   ibeeger
 * @Last Modified time: 2017-05-05 13:38:25
 */

'use strict';
var MongoClient = require('mongodb').MongoClient,
	assert = require('assert');

var db = require("../dbconf/dbconfig.js");
var host = process.env.NODE_ENV == "online" ? "localhost" : db.ip;

console.log(process.env.NODE_ENV);

// MongoClient.connect("mongodb://" + db.user + ":" + db.pwd + "@" + host + ":" + db.port + "/" + db.db, function(err, db) {
MongoClient.connect("mongodb://" + host + ":" + db.port + "/" + db.db, function(err, db) {
	assert.equal(null, err);
	process.dbc = db;
});

//查询一项
function findOne(col, query, opts) {
	let _opts = arguments.length == 3 ? opts : {};
	let P = new Promise(function(resolve, reject) {
		let cols = process.dbc.collection(col);
		cols.findOne(query, _opts, function(err, rst) {
			if (err) {
				reject(err);
			} else {
				resolve(rst);
			}
		})
	});
	return P;
}

//查询多条
function findAny(col, query, opts) {
	let _opts = arguments.length == 3 ? opts : {};
	let P = new Promise(function(resolve, reject) {
		let cols = process.dbc.collection(col);
		// skip(parseInt(Math.random()*cols.count())).
		let rdm = Math.random();
		cols.find(query, _opts).sort({
			_id: -1
		}).toArray(function(err, rst) {
			if (err) {
				reject(err)
			} else {
				resolve(rst);
			}
		})
	})
	return P;
}

//查询多条
function findLimit(col, query, page) {
	let _opts = query.length == 2 ? query[1] : {};

	let P = new Promise(function(resolve, reject) {
		let cols = process.dbc.collection(col);
		// skip(parseInt(Math.random()*cols.count())).
		let rdm = Math.random();
		cols.find(query, _opts).skip(4*(page-1)).limit(4).sort({
			createtime: 0
		}).toArray(function(err, rst) {
			if (err) {
				reject(err)
			} else {
				resolve(rst);
			}
		})
	})
	return P;
}

//插入
function inserObj(col, query, opts) {
	let _opts = arguments.length == 3 ? opts : {};
	let P = new Promise(function(resolve, reject) {
		let cols = process.dbc.collection(col);
		cols.insert(query, _opts, function(err, rst) {
			if (err) {
				reject(err);
			} else {
				resolve(rst);
			}
		})
	});
	return P;
}

//更新递增
function updateNum(col, query, sets) {
	let _sets = arguments.length == 3 ? sets : null;
	let P = new Promise(function(resolve, reject) {
		if (!_sets) {
			reject({
				msg: "缺少更新内容"
			});
			return;
		}
		let cols = process.dbc.collection(col);
		cols.update(query, {
			$inc: _sets
		}, {
			// upsert: true,
			multi: true
		}, function(err, rst) {
			if (err) {
				reject(err);
			} else {
				resolve(rst);
			}
		})
	});
	return P;
};
//更新
function updateObj(col, query, sets) {
	let _sets = arguments.length == 3 ? sets : null;
	let P = new Promise(function(resolve, reject) {
		if (!_sets) {
			reject({
				msg: "缺少更新内容"
			});
			return;
		}
		let cols = process.dbc.collection(col);
		cols.update(query, {
			$set: _sets
		}, {
			// upsert: true,
			multi: true
		}, function(err, rst) {
			if (err) {
				reject(err);
			} else {
				resolve(rst);
			}
		})
	});
	return P;
};

//删除
function deleteObj(col, query) {
	let P = new Promise(function(resolve, reject) {
		let cols = process.dbc.collection(col);
		cols.deleteOne(query, function(err, rst) {
			if (err) {
				reject(err);
			} else {
				resolve(rst);
			}
		})
	});
	return P;
}



module.exports = {
	findOne: findOne,
	findAny:findAny,
	findLimit: findLimit,
	updateNum: updateNum,
	inserObj: inserObj,
	updateObj: updateObj,
	deleteObj: deleteObj
}