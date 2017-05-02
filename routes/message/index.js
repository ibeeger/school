/**
 * Module dependencies.
 */

var TopClient = require('./topClient').TopClient;

var client = new TopClient({
  // 'appkey':'23741605',
  'appkey':'23670898',
  // 'appsecret':'70c9492d069117e5c3a9fc88a8768935',
  'appsecret':'7d8f51cfaa0c5ba3a529ee1caa85a437',
  // 'REST_URL': 'http://gw.api.tbsandbox.com/router/rest'
  'REST_URL': 'http://gw.api.taobao.com/router/rest'
});

function sendRegCode(phone, code) {
  return new Promise(function(resolve,reject) {
    client.execute('alibaba.aliqin.fc.sms.num.send', {
        'extend': '123456',
        'sms_type': 'normal',
        'sms_free_sign_name': '毕业了',
        'sms_param': '{\"code\":\"'+code+'\"}',
        'rec_num': phone,
        'sms_template_code': 'SMS_53225246'
      },
      function(error, response) {
        console.log(error);
        if (!error)
          resolve(response["result"]["err_code"]);
        else
          reject(error);
      })
  });
}

module.exports = {
   sendRegCode : sendRegCode
}