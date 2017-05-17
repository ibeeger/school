/*
 * @Author: ibeeger
 * @Date:   2017-03-29 20:42:50
 * @Last Modified by:   ibeeger
 * @Last Modified time: 2017-05-17 17:08:08
 */

'use strict';


const login = {
	code: 101,
	msg: "用户名或密码不正确"
};


const err = {
	code: 102,
	msg: "数据获取失败"
}

const no = {
	code: 100,
	msg: "未知错误"
}


module.exports = {
	login: login,
	err: err,
	no:no
}