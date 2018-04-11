/*
* @Author: ibeeger
* @Date:   2017-11-28 18:52:29
* @Last Modified by:   ibeeger
* @Last Modified time: 2017-11-28 19:12:44
*/

'use strict';
const https = require("https");

const options = {
  hostname: 'xym.ibeeger.com',
  port: 443,
  path: '/api/tools/local',
  method: 'POST',
  headers:{
  	'Content-type':"application/json"
  }
};

const req = https.request(options, (res) => {
  console.log('statusCode:', res.statusCode);
  console.log('headers:', res.headers);
  res.on('data', (d) => {
    process.stdout.write(d);
  });
});
req.on('error', (e) => {
  console.error(e);
});
req.write(JSON.stringify({
	latitude:"39.983424",
	longitude:"116.322987"
}))
req.end();