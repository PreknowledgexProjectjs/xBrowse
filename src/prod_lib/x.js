//BaseURL
module.exports.url = "https://x.preknowledge.in/Api/Userlogin";
module.exports.axios = require('axios');;
module.exports.userData;
//Logger
module.exports.log = function (msg) { 
  console.log(`\n ${msg}`);
};
//Url Generator
module.exports.generate = function (app_secret,devToken,returnURL) {
  module.exports.log('Generated Token');
  let data = {
    app_secret: app_secret,
    devToken: devToken,
    returnURL: returnURL
  }; 
  return `${module.exports.url}?s=${Buffer.from(JSON.stringify(data)).toString('base64')}&nodejs=true`;
};
//Get Data
module.exports.data = function (data) {
  return JSON.parse(new Buffer(data, 'base64'));
};
//Get User Data
module.exports.getUserInfo = function (id) {
  // module.exports.got.get(`https://x.preknowledge.in/Api/get_user_data/${id}`, {responseType: 'json'})
  // .then(res => {
  //   module.exports.userData = res.body;
  //   return res.body;
  // })
  // .catch(err => {
  //   console.log('Error: ', err.message);
  // });
  //module.exports.
};
//get user data via variable
module.exports.getUser = function (){
  return module.exports.userData;
};