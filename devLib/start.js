const { spawn } = require('child_process');
const fs = require('fs');
var clc = require("cli-color");

if (fs.existsSync("node_modules")) {
	BuildJsx();
}else{
	var clc = require("cli-color");
	console.log(clc.green("Installing Packages"));
	const ls = spawn('yarn', [''] , { shell: true});
    ls.stdout.on('data', (data) => {  	
	  	console.log(`${data}`);
	});

	ls.stderr.on('data', (data) => {
	  console.error(`Error : ${data}`);
	});

	ls.on('close', (code) => {
	  console.log(`NPM packages has been installed re run "npm run runjs" ${code}`);
	});
}

function BuildJsx(){
	const ls = spawn('yarn', ['start:control'] , { shell: true});
    ls.stdout.on('data', (data) => {
	  console.log(clc.blue(`${data}`));
	});

	ls.stderr.on('data', (data) => {
	  console.error(`Error : ${data}`);
	});

	ls.on('close', (code) => {
	  console.log(`Successfully Builded JSX files now starting electron{code}`);
	  start_electron();
	});
}

function start_electron() {
	const ls = spawn('yarn', ['start'] , { shell: true});
    ls.stdout.on('data', (data) => {
    	if(data.includes('electron main/main.js')){
    		console.log(clc.blue('electron.js proceess is starting!'));
    	}
    	if(data.includes('Object has been destroyed')){
    		console.log(clc.red('App closed'));
    		process.exit();
    	}  
	  console.log(clc.blue(`${data}`));
	});

	ls.stderr.on('data', (data) => {
	  console.error(`Error : ${data}`);
	});

	ls.on('close', (code) => {
	  console.log(`Developement Ended ${code}`);
	});
}