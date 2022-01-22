const { app, ipcMain , ipcRenderer, Menu, MenuItem, BrowserWindow  } = require('electron');
//Expirmental Reuqires
const { createServer } = require('http');
const { Server } = require('socket.io');
//Expirmental requires ends :D
const fileUrl = require('file-url');
const BrowserLikeWindow = require('../index');
const isDev = require('electron-is-dev');

let browser;

app.commandLine.appendSwitch('enable-transparent-visuals');
app.commandLine.appendSwitch('disable-gpu');

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
}



var isAppStarted = false;
//
app.on('ready', async () => {
  const crsh = new BrowserWindow({ width: 800, height: 200, frame : false , transparent:true, skipTaskbar: true , show:false, })
  crsh.loadURL(fileUrl(`${__dirname}/renderer/crashFailure.html`))
  if (isDev) {
    crsh.webContents.openDevTools({ mode:"detach" });
  }
  function startCrashScreen(){
    crsh.show();
  }
  setTimeout(function(){
    crsh.hide();
  },55000);
  crsh.setAlwaysOnTop(true, 'screen');
  crsh.setMinimizable(false);
  const settings_data = require('data-store')({ path: app.getPath('userData') + '/settings.json' });
  const search_engines = require('data-store')({ path: app.getPath('userData') + '/search_engines.json' });
  const dataSetup = require('data-store')({ path: process.cwd() + '/dataSetup.json' });
  setTimeout(function(){
    if (isAppStarted == false) {
      startCrashScreen();
    }
  },25000);
  dataSetup.set('userData' , app.getPath('userData') );

  //init advance data
  search_engines.set('google','https://www.google.com/search?q=')
  search_engines.set('yahoo','https://search.yahoo.com/search?p=')
  //init advance data ends here
  //Expirmental Socket.io
  const httpServer = createServer();
  const io = new Server();

  io.attach(httpServer,{
    cors: {
      origin: ["file","localhost"]
    }
  });

  io.on("connection", (socket) => {
    isAppStarted = true;
    crsh.hide();
    console.log("connection found@!");
    socket.on('disconnect', () => {
      console.log('Window Closed Code 1');
    });
    socket.on('code_exec', (code,page) => {
      var codeEval = eval(code);
      io.emit('code_exec_result', codeEval,page);
    });
    socket.on('get_settings_', (data,page) => {
     // var codeEval = ;
      io.emit('code_exec_result', settings_data.get(data),page);
    });
    socket.on('code_exec_result', (code,page) => {
      io.emit('code_exec_result', code,page);
    });
    socket.on('toastR', (msg) => {
      io.emit('toastR', msg);
    });
  });

  httpServer.listen(36214);
  //Expiremntal code ends here :D
  createWindow();
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
