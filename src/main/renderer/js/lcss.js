/* CSS Expirment JS */
var current_theme = localStorage.theme;
var jquery ;
if (typeof process === 'undefined' || process === null) {
    jquery = $;
}else{
	jquery = require('jquery');
}
$('head').append(`<div id="themes"></div>`);
/*Requires JQUERY */
function addMenu(data){
	jquery('#menu').append(`
		<li class="inspt"><a href="#" onclick="${data.onclick}"><i class="${data.icon}" aria-hidden="true"></i> ${data.title}</a></li>  
	`);
}
lcss();
loadThemes();
setInterval(() => loadThemes() ,200);
function lcss(){
	jquery('#menu').html('');
	jquery('body').append(`<div id="contextMenu" class="context-menu" style="display: none"><ul class="menu" id="menu"> </ul></div> `);
	document.onclick = hideMenu;
	document.oncontextmenu = rightClick;

	function hideMenu() {
	    document.getElementById("contextMenu")
	        .style.display = "none"
	}

	function rightClick(e) {
	    e.preventDefault();

	    if (document.getElementById("contextMenu").style.display == "block") {
	        hideMenu();
	    } else {
	        var menu = document.getElementById("contextMenu")
	        menu.style.display = 'inline-block';
	        menu.style.left = Math.abs(parseInt(e.pageX) + 5) + "px";
	        menu.style.top = Math.abs(parseInt(e.pageY) - 5) + "px";
	    }
	}

	//Default Menus
	addMenu({ onclick:"window.location.reload()",icon:"fa fa-refresh",title:"Reload" });
	addMenu({ onclick:"lcss()",icon:"fa fa-refresh",title:"Reload JS" });
	addMenu({ onclick:`alert('Press Ctrl+Shift+I')`,icon:"fa fa-code",title:"Ctrl+Shift+I (Inspect Element)" });
}



function setTheme(id){
	if(id == "dark-mode"){
		localStorage.setItem('theme',`${id}`);
		return;
	}
	jquery('body').attr('class',`thm${id}`);
	localStorage.setItem('theme',`thm${id}`);
}

function addTheme(css,id){
	if(id == 1){
		return;
	}
	if(localStorage.getItem(id) !== null) return;
	localStorage.setItem(`thm${id}` , css);
	$('head #themes').append(`
		<style type="text/css">
			${css}
		</style>
	`);
}

function loadThemes(){
	$('head #themes').html('');
	$.each(localStorage , (index,data) => {
	    if(isValidLS(index) == true) return;
	    if(index.startsWith('thm')){
	    	$('head #themes').append(`
	<style type="text/css">
	/*Theme ${index} */ \n
	${localStorage.getItem(index)}
	\n
	/*Theme Code Ends ${index} */
	</style>
			`);
	    }
	});
}

function isValidLS(vtc) {
 if(vtc.toString() == "length") return true;
 if(vtc.toString() == "clear") return true;
 if(vtc.toString() == "getItem") return true;
 if(vtc.toString() == "key") return true;
 if(vtc.toString() == "removeItem") return true;
 if(vtc.toString() == "setItem") return true;
}


if(localStorage.theme == undefined){
}else if(localStorage.theme == null){
}else{
	jquery('body').attr('class',`${localStorage.theme}`);
}

setInterval(() => {
	if(current_theme == localStorage.theme) return;
	jquery('body').attr('class',`${localStorage.theme}`);
},1200);

function hideAlert(id){
	jquery('#alert-'+id).hide();
}
$('#lcss-version-onload').html('v0.1.4.1 (Beta)');
$('#lcss-version-onload').val('v0.1.4.1 (Beta)');
/* END JS*/