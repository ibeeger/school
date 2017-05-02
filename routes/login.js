/*
* @Author: ibeeger
* @Date:   2017-03-13 15:51:39
* @Last Modified by:   ibeeger
* @Last Modified time: 2017-03-30 15:26:47
* 学校动态
*/

'use strict';
var express = require('express');
const router = express.Router();
// const fetch = require("./tools/fetch.js")
const fetch = {};

// import * as Item from "./resjson/res.js"

router.post("/", (req, res, next) => {
	fetch.findOne("users", req.body).then((json) => {
		if (json) {
			res.json(json[0]);
		}else{
			res.json({
				code:101,

			})	
		}
	})
})


module.exports = router;