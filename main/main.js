const { app, ipcMain , ipcRenderer, Menu, MenuItem, BrowserWindow  } = require('electron');
//Expirmental Reuqires

//Expirmental requires ends :D
const net = require('net');
const fileUrl = require('file-url');
const BrowserLikeWindow = require('../index');
const settings_data = require('data-store')({ path: app.getPath('userData') + '/settings.json' });
const search_engines = require('data-store')({ path: app.getPath('userData') + '/search_engines.json' });
const dataSetup = require('data-store')({ path: process.cwd() + '/dataSetup.json' });
const isDev = require('electron-is-dev');

const x = require('../x.js');

let browser;

var port_in = 35565;

app.commandLine.appendSwitch('enable-transparent-visuals');
app.commandLine.appendSwitch('disable-gpu');

var portInUse = function(port, callback) {
    var server = net.createServer(function(socket) {
    socket.write('Echo server\r\n');
      socket.pipe(socket);
    });

    server.on('error', function (e) {
      callback(true);
    });
    server.on('listening', function (e) {
      server.close();
      callback(false);
    });

    server.listen(port, '127.0.0.1');
};

function createWindow() {
  var isdebug = true;
  if (isDev) {
    isdebug = true;
  }else {
    isdebug = false;
  }
  browser = new BrowserLikeWindow({
    controlHeight: 109,
    controlPanel: fileUrl(`${__dirname}/renderer/control.html`),
    startPage: fileUrl(`${__dirname}/renderer/new-tab.html`),
    blankTitle: 'New tab',
    blankPage: fileUrl(`${__dirname}/renderer/new-tab.html`),
    debug: isdebug // will open controlPanel's devtools
  });

  browser.on('closed', () => {
    browser = null;
  });
  port_in = browser.port_to_open;
  const printDialog = new BrowserWindow({ 
    width: 800, 
    height: 600, 
    frame : false , 
    show: false,
    transparent:true, 
    skipTaskbar: true,
    webPreferences: {
      contextIsolation:false,
      nodeIntegration:true,
    }
  });



  printDialog.maximize();

  ipcMain.on('cancel-print', (event) => {
    printDialog.hide();
  });

  ipcMain.on('close-app',(event) => {
    app.quit();
  });

  ipcMain.on('minimize-app',(event) => {
    browser.win.isMinimized() ? browser.win.restore() : browser.win.minimize()
  });

  printDialog.loadURL(fileUrl(`${__dirname}/renderer/printDialog.html`))

  if (isDev) {
    printDialog.webContents.openDevTools({ mode:"detach" });
  }

  var menu = new Menu();

  console.log(printDialog.webContents.getPrinters());

  ipcMain.on('get-printers', (event) => {
    event.reply('print-list',printDialog.webContents.getPrinters());
  });

  ipcMain.on('get-signin-url', (event) => {
    event.reply('signin-url',x.generate(
      "xbrowse_pxapi25565",
      "pb_12456547fd",
      fileUrl(`${__dirname}/renderer/you_welcome.html`),
    ));
  });

  ipcMain.on('set_search_engine', (event,name) => {
    settings_data.set('default_search',name);
  });

  if (settings_data.get('is_welcomed') == undefined) {
    //we gonna hide mainWindow in depths
    browser.win.hide();
    //we gonna /summon xbrowse:welcome_screen
    const xbrowse_welcome_screen = new BrowserWindow({ 
      width: 400, 
      height: 500, 
      frame : false,
      show: true,
      title: "Well hello again Friend i'm xBrowse",
      webPreferences: {
        contextIsolation:false,
        nodeIntegration:true,
        webSecurity: false
      },
      icon:'icons/icon.ico'
    }); 
    xbrowse_welcome_screen.loadURL(fileUrl(`${__dirname}/renderer/you_welcome.html`));
    if (isDev) {
      xbrowse_welcome_screen.webContents.openDevTools({ mode:"detach" });
    }
    ipcMain.on('complete_setup',(event,arg) => {
      settings_data.set('user_info',arg);
      settings_data.set('is_welcomed',true);
      xbrowse_welcome_screen.close();
      app.relaunch()
      app.exit()
    });
  }

  app.on("web-contents-created", (...[/* event */, webContents]) => {
    menu.clear();

    menu.append(new MenuItem({ label: 'Copy Text!', click: function(event) {
      browser.getWebContents().copy();
    }}));
    menu.append(new MenuItem({ label: 'Cut Text!', click: function(event) {
      browser.getWebContents().cut();
    }}));
    menu.append(new MenuItem({ label: 'Paste Text!', click: function(event) {
      browser.getWebContents().paste();
    }}));
    
    menu.append(new MenuItem({ label: 'Select All', click: function(event) {
      browser.getWebContents().selectAll();
    }}));
    menu.append(new MenuItem({ type: 'separator' }));
    menu.append(new MenuItem({ label: 'Print', click: function(event) {
      printDialog.show();
    }}));
    menu.append(new MenuItem({ type: 'separator' }));
    menu.append(new MenuItem({ label: 'Reload', click: function(event) {
      browser.getWebContents().reload();
    }}));
    menu.append(new MenuItem({ label: 'Mute', click: function(event) {
      browser.getWebContents().setAudioMuted(true);
    }}));
    menu.append(new MenuItem({ label: 'UnMute', click: function(event) {
      browser.getWebContents().setAudioMuted(false);
    }}));
    menu.append(new MenuItem({ label: 'Inspect Element', click: function(event) {
      browser.toggleDevTools();
    } }));
    menu.append(new MenuItem({ type: 'separator' }));
    menu.append(new MenuItem({ label: 'Zoom +', click: function(event) {
      browser.getWebContents().setZoomLevel(browser.getWebContents().getZoomFactor() + 1);
    }}));
    menu.append(new MenuItem({ label: 'Zoom -', click: function(event) {
      browser.getWebContents().setZoomLevel(browser.getWebContents().getZoomFactor() - 1);
    }}));
    webContents.on("context-menu", (event, click) => {
      event.preventDefault();
      menu.popup(browser.getWebContents());
    }, false);

  });
  const crsh = new BrowserWindow({ width: 800, height: 200, frame : false , transparent:true, skipTaskbar: true , show:false, });
  crsh.loadURL(fileUrl(`${__dirname}/renderer/crashFailure.html`))
  if (isDev) {
    crsh.webContents.openDevTools({ mode:"detach" });
  }
  function startCrashScreen(){
    crsh.show();
    setTimeout(function(){
      crsh.hide();
    },55000);
  }
  crsh.setAlwaysOnTop(true, 'screen');
  crsh.setMinimizable(false);
  ipcMain.on('loaded_yes',(event) => {
    crsh.close();
  });
 setTimeout(function(){
   if (browser.isAppStarted == false) {
     startCrashScreen();
   }
 },25000);
}


//
app.on('ready', async () => {
  
  dataSetup.set('userData' , app.getPath('userData') );

  //init advance data
  search_engines.set('google','https://www.google.com/search?q=')
  search_engines.set('yahoo','https://search.yahoo.com/search?p=')
  //init advance data ends here
  //Expiremntal code ends here :D
  //var ib = createWindow(); <-- createWindow in a vairable is useless as swamp hut cauldrum
  createWindow(); // <-- ah this is fine :DDDDDDDDD
});

app.on('before-quit', () => {
  httpServer.close(function () { console.log('Server closed!'); });
  process.exit(0);
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }

  

});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (browser === null) {
    createWindow();
  }
});
