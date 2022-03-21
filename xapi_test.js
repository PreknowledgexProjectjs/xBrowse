const xapi = require('./prod_lib/xapi.js');

xapi.init({
	infoName:"Test",
	infoVersion:"10"
},function(function_ , data){
	console.log(function_,data);
	//function_.close();
});

console.log("App:"+xapi.getName());
console.log("AppVer:"+xapi.getVersion());