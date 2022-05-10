/* CSS Expirment JS */
var current_theme = localStorage.theme;
var jquery ;
if (typeof process === 'undefined' || process === null) {
    jquery = $;
}else{
	jquery = require('jquery');
}
/*Requires JQUERY */
csejs();
function csejs(){
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
	        menu.style.display = 'block';
	        menu.style.left = e.pageX + "px";
	        menu.style.top = e.pageY + "px";
	    }
	}

	function addMenu(data){
		jquery('#menu').append(`
			<li class="inspt"><a href="#" onclick="${data.onclick}"><i class="${data.icon}" aria-hidden="true"></i> ${data.title}</a></li>  
		`);
	}

	//Default Menus
	addMenu({ onclick:"window.location.reload()",icon:"fa fa-refresh",title:"Reload/Refresh Webpage" });
	addMenu({ onclick:"csejs()",icon:"fa fa-refresh",title:"Reload JS" });
}

function setTheme(id){
	if(id == "dark-mode"){
		localStorage.setItem('theme',`${id}`);
		return;
	}
	jquery('body').attr('class',`thm${id}`);
	localStorage.setItem('theme',`thm${id}`);
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
$('#lcss-version-onload').html('v0.1.3 (Beta)');
$('#lcss-version-onload').val('v0.1.3 (Beta)');
/* END JS*/