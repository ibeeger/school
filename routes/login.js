// var express = require('express');
import express from "express"
const router = express.Router();
const fetch = require("./tools/fetch.js")

import * as Item

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