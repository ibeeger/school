// var express = require('express');
import express from "express"
var router = express.Router();

 
router.get("/",(req,res,next)=>{
	res.render("index",{title:"功能"})
})



module.exports = router;
