const {
    ipcRenderer
} = require('electron');
const $ = require('jquery');
let url = new URL(window.location.href)
let params = new URLSearchParams(url.search);
var lang = JSON.parse(url.searchParams.get("lang"));

ipcRenderer.send('loaded_yes');
ipcRenderer.send('user_info');

ipcRenderer.on('url-enter-l', (event, url) => {
    console.log(url);
    if (url.includes("https://")) {
        $('.chip2').show();
        $('#site_logo').attr('src', '../../in_app_icons/lock_http.png');
        $('.lw').html('Secure');
    } else if (url.includes("http://")) {
        $('.chip2').show();
        $('#site_logo').attr('src', '../../in_app_icons/unlock_http.png');
        $('.lw').html('Unsecure');
    } else if (url.includes("file://")) {
        $('.chip2').show();
        if ($('#address').val().includes('px://')) {
            $('#site_logo').attr('src', '../../icons/icon.png');
            $('.lw').html('Secure Px');
            return;
        } else if ($('#address').val() == '') {
            $('.chip2').hide();
        }
        $('#site_logo').attr('src', '../../in_app_icons/file_web.jpg');
        $('.lw').html('Local File');
    } else if (url.includes("px://")) {
        $('.chip2').show();
        $('#site_logo').attr('src', '../../icons/icon.png');
        $('.lw').html('Secure Px');
    } else {
        $('.chip2').hide();
    }
});

ipcRenderer.on('user_get_info', (event, arg) => {
    if (!url.searchParams.get("guest")) {
        try{
            $('#login_logo').attr('src', arg.login_logo)
            $('.user_name').html(arg.login_name);
        }catch(e){
            $('#login_logo').attr('src', "../../icons/icon.png")
            $('.user_name').html("xBrowse");
        }
    } else {
        $('#login_logo').hide();
        $('.user_name').html("Guest");
    }
});

$('#address').attr('placeholder', lang.search_or);
$('.chip').attr('onclick', 'openAccount_win()');
//console.log(rect.top, rect.right, rect.bottom, rect.left);
function openAccount_win() {
    console.log("Clicked");
    var rect = document.getElementById('chip_acc').getBoundingClientRect();
    ipcRenderer.send('view-dialog', {
        x: 359,
        y: 28,
        width: 565,
        height: 560,
        transparent: false,
        title: "Account",
        url: "account.html",
        nodeIntegration: false,
    });
};