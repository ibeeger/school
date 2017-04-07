/**
 * Module dependencies.
 */

TopClient = require('./topClient').TopClient;

var client = new TopClient({
  
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