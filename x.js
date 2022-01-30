//BaseURL
module.exports.url = "https://x.preknowledge.in/Api/Userlogin";
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