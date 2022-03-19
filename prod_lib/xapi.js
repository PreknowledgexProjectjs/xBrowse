//Import

//Class Constructer
module.exports.extName = "xExtension";
module.exports.extVersion = "0.0.1"
//functions
function init(extInfo,callback){
	module.exports.extName = extInfo.infoName;
	module.exports.extVersion = extInfo.infoVersion;
	callback({
		close : function(){
			require('electron').app.quit();
		}
	},"__initialized");
}
function getName(){
	return module.exports.extName;
}
function getVersion() {
	return module.exports.extVersion;
}
//declarations
module.exports.init = init;
module.exports.getName = getName;
module.exports.getVersion = getVersion;