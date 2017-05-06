/* 
 * @Author: willclass
 * @Date:   2015-10-28 14:41:09
 * @Last Modified by:   ibeeger
 * @Last Modified time: 2017-03-28 17:18:42
 
 */

'use strict';

var host;
var Url = require("url");
var https = require("https");
var http = require("http"),
	cookie = "",
	type = 'application/json',
	method = 'POST',
	port = 80;
var env = process.env.NODE_ENV;
const CLIENT = {
	"http:":http,
	"https:":https
}
var client = {
	post: function(url, data, callback) {
		let time = new Date();
		let	host = Url.parse(url).host;
		let	_url = Url.parse(url).path;
		
		 
		// console.log("请求开始:", host, port, url);
		var _data = JSON.stringify(data),
			_datalth = Buffer.byteLength(_data, 'utf8');

		var _options = {
			protocol: Url.parse(url).protocol,
			hostname: host,
			port: port,
			path: _url,
			method: method,
			headers: {
				// 'X-HT-SSO-HOST':config.sso,
				// 'User-Agent': "xym.ibeeger.com",
				// 'Content-Type': type,
				// 'Content-Length': _datalth,
				// 'Cookie': this.headers.cookie || ""
			}
		};



		var _req = CLIENT[Url.parse(url).protocol].request(_options, function(res) {
			console.log(res)
			var str = "";
			if (res.statusCode != 200) {
				console.log(res.statusCode + ":" + url + ":" + (new Date().getTime() - time.getTime()) + "s|" + time.getFullYear() + "-" + parseInt(time.getMonth() + 1) + "-" + time.getDate() + " " + time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds());
				callback(res.statusCode);//数字
				return;
			}
			res.setEncoding('utf8');
			res.on("data", function(body) {
				str += body;
			});

			res.on("end", function() {
				var rst;
				try {
					rst = JSON.parse(str);
				} catch (e) {
					rst = str;
				};
				callback(rst);
				if (env != 'local') {
					if (typeof rst == "object" && rst.status != 0) {
						console.log(res.statusCode + ":" + url + ":" + (new Date().getTime() - time.getTime()) + "s 返回码:" + rst.status + " | " + time.getFullYear() + "-" + parseInt(time.getMonth() + 1) + "-" + time.getDate() + " " + time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds());
					} else {
						if ((new Date().getTime() - time.getTime()) > 2000) {
							console.log(res.statusCode + ":" + url + ":" + (new Date().getTime() - time.getTime()) + "s 返回码:" + JSON.stringify(rst) + " | " + time.getFullYear() + "-" + parseInt(time.getMonth() + 1) + "-" + time.getDate() + " " + time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds());
						}
					}
				} else {
					var code = rst.hasOwnProperty("status") ? rst.status : rst;
					console.log(res.statusCode + ":" + url + ":" + (new Date().getTime() - time.getTime()) + "s 返回码:" + code + "|" + time.getFullYear() + "-" + parseInt(time.getMonth() + 1) + "-" + time.getDate() + " " + time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds());
				}

			});

		});
		// _req.setTimeout(20000, function() {
		// 	res.destroy();
		// 	callback(504);
		// });
		_req.on("error", function(e) {
			console.log(url + ":" + JSON.stringify(e) + "======" + time.getFullYear() + "-" + parseInt(time.getMonth() + 1) + "-" + time.getDate() + " " + time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds());
			callback("数据获取失败");
		})
		_req.write(_data);
		_req.end();
	},
	setHost: function(value) {
		host = value;
	},
	setMethod: function(value) {
		method = value;
	},
	setPort: function(value) {
		port = value;
	},
	setCookie: function(name, value) {
		cookie = name + "=" + value + ";";
	},
	setType: function(value) {
		type = value;
	}
}


module.exports = client;