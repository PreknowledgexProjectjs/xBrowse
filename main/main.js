const { app, ipcMain , ipcRenderer, Menu, MenuItem, BrowserWindow, dialog } = require('electron');
//Expirmental Reuqires
require('../xapi_test.js');
//Expirmental requires ends :D
const net = require('net');
const fileUrl = require('file-url');
const RenderWindow = require('../prod_lib/RenderWindow');
const settings_data = require('data-store')({ path: app.getPath('userData') + '/settings.json' });
const search_engines = require('data-store')({ path: app.getPath('userData') + '/search_engines.json' });
const dataSetup = require('data-store')({ path: process.cwd() + '/dataSetup.json' });
const isDev = require('electron-is-dev');
const history = require('data-store')({ path: app.getPath('userData') + '/history.json' });
const fs = require('fs');
const validUrl = require('../prod_lib/isUrl.js');
var PublicWin;
var pathWin = app.getPath('userData')+"/../.gloablx";
const global_X = require('data-store')({ path: pathWin + '/expirmental.json' });
const global_X_acc = require('data-store')({ path: pathWin + '/account.json' });
var halfmoon = global_X.get('halfmoon_is_enabled');
var htmlLoad;

process.env.GOOGLE_API_KEY = 'YOUR_KEY_HERE'
try{
  //console.log(history.data);

  console.log(process.argv);

  const x = require('../prod_lib/x.js');

  let browser;
  var setBrowser;

  var port_in = 35565;

  app.commandLine.appendSwitch('enable-transparent-visuals');
  app.commandLine.appendSwitch('disable-gpu');

  function createWindow() {
    var isdebug = true;
    if (isDev) {
      isdebug = true;
    }else {
      isdebug = false;
    }
    var new_tab_url = fileUrl(`${__dirname}/renderer/new-tab.html`);
    var new_tab_url2 = fileUrl(`${__dirname}/renderer/new-tab.html`);
    var isGuest = app.commandLine.hasSwitch("isGuest");

    //console.log(process.argv.has("--isGuest"));

    var parsed_on = "";
    var xisrv = "";
    if (app.isPackaged) {
      // workaround for missing executable argument)
      process.argv.unshift(null)
      process.argv.unshift(process.cwd())
    }
    // parameters is now an array containing any files/folders that your OS will pass to your application
    const parameters = process.argv.slice(2)
    parameters.forEach(function(value){
      if (value.includes(process.cwd)) { parameters.unshift(value); }
      //if (value.startsWith("--")) { parameters.unshift(value); }
      if (value.endsWith('.xext')) {
        parsed_on = value;
        xisrv = true;
      }
      if(validUrl.isUri(value)){
        new_tab_url2 = value;
      }else{
        if (value.endsWith(".exe")) return;
        if (value.startsWith("--")) return;
        if (value.endsWith(".AppImage")) return;
        if (value.startsWith("/opt")) return;
        if (value.startsWith("/")) return;
        if (value.startsWith("/snap")) return;
        new_tab_url2 = `${search_engines.get(settings_data.get('default_search'))}${value}`;
      }

    });
    console.log(parameters);
    var setData_of;
    if (xisrv == true) {
      fs.readFile(parsed_on, 'utf8' , (err, data) => {
         if (err) {
           console.error(err)
           return
         }
         setData_of = JSON.parse(data);
      })
      const xisrv = new BrowserWindow(
        { width: 1070, height: 600, 
          webPreferences:{
            contextIsolation:false,
            nodeIntegration:true, 
          } 
        }
      );
      xisrv.loadURL(fileUrl(`${__dirname}/renderer/xisrv.html`));
      ipcMain.on('get_info',(event) => {
        event.reply('get_info',setData_of);
      })
      return;
    }

    if (halfmoon == undefined) {
      global_X.set('halfmoon_is_enabled',false);
      htmlLoad = fileUrl(`${__dirname}/renderer/control.html`);
    }else if (halfmoon == true) {
      htmlLoad = fileUrl(`${__dirname}/renderer/half_moonbeta/control.html`);
    }
    else if (halfmoon == false) {
      htmlLoad = fileUrl(`${__dirname}/renderer/control.html`);
    }


    console.log("Is it Open ? : "+htmlLoad);

    var guest_win = false;
    

    if (isGuest) {
      new_tab_url = fileUrl(`${__dirname}/renderer/in-guest.html`);
      guest_win = true;
    }else{
      guest_win = false;
    }

    browser = new RenderWindow({
      controlHeight: 109,
      controlPanel: htmlLoad,
      startPage: new_tab_url2,
      blankTitle: 'New tab',
      blankPage: new_tab_url,
      debug: isdebug, // will open controlPanel's devtools,
      guest: guest_win,
      dirname: __dirname+"/../",
    });

    setBrowser = browser;

    // browserWindow.webContents.session.webRequest.onBeforeSendHeaders(
    //   filter,
    //   (details, callback) => {
    //     details.requestHeaders.Origin = `http://example.com/*`
    //     callback({ requestHeaders: details.requestHeaders })
    //   }
    // )

    const window = BrowserWindow.getFocusedWindow();
    // dialog.showMessageBox(window,{
    //   title:"Debugging",
    //   message:JSON.stringify(parameters),
    // })

    browser.on('closed', () => {
      browser = null;
    });
    var diag_print;
    function start_print_diag(){
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
      diag_print = printDialog;
      printDialog.maximize();
      printDialog.show();

      printDialog.loadURL(fileUrl(`${__dirname}/renderer/printDialog.html`))

      if (isDev) {
        printDialog.webContents.openDevTools({ mode:"detach" });
      }
    }

    ipcMain.on('cancel-print', (event) => {
      diag_print.close();
    });

    ipcMain.on('close-app',(event) => {
      app.quit();
    });

    ipcMain.on('minimize-app',(event) => {
      browser.win.isMinimized() ? browser.win.restore() : browser.win.minimize()
    });

    

    var menu = new Menu();

    //console.log(printDialog.webContents.getPrinters());

    ipcMain.on('get-printers', (event) => {
      event.reply('print-list',diag_print.webContents.getPrinters());
    });

    if (settings_data.get('user_info.login_id') !== undefined) {
      ipcMain.on('user_info', (event) => {
        console.log("IPC:user_info");
        require('axios').get(`https://x.preknowledge.in/Api/get_user_data/${settings_data.get('user_info.login_id')}`)
        .then(function (response) {
          settings_data.set('user_info',response.data)
          event.reply('user_get_info',response.data);
        })
        .catch(function (error) {
           event.reply('user_get_info',settings_data.get('user_info.login_image'));
        });
      });

      global_X_acc.set('account_id',settings_data.get('user_info.login_id'));
      global_X_acc.set('account_name',settings_data.get('user_info.login_name'));
      global_X_acc.set('account_ico',settings_data.get('user_info.login_image'));

      require('axios').get(`https://x.preknowledge.in/Api/get_user_data/${settings_data.get('user_info.login_id')}`)
      .then(function (response) {
        if (response.data.login_status == 0) {
          browser.win.hide();
          startWelcomeScreen(`?error=true&message=Your account is either banned or disabled`);
        }else if (response.data.login_insiderUpdates == 0) {
          browser.win.hide();
          startWelcomeScreen(`?error=true&message=You are not allowed for Beta Updates <br> Please go to : https://x.preknowledge.in/Profile and edit profile and allow insider updates`);
        }
      });
    }else{
      ipcMain.on('user_info', (event) => { 
        console.log("IPC:user_info");
        event.reply('user_get_info',JSON.stringify({id:1}));
      });
    }

    var contains = function(needle) {
      // Per spec, the way to identify NaN is that it is not equal to itself
      var findNaN = needle !== needle;
      var indexOf;

      if(!findNaN && typeof Array.prototype.indexOf === 'function') {
          indexOf = Array.prototype.indexOf;
      } else {
          indexOf = function(needle) {
              var i = -1, index = -1;

              for(i = 0; i < this.length; i++) {
                  var item = this[i];

                  if((findNaN && item !== item) || item === needle) {
                      index = i;
                      break;
                  }
              }

              return index;
          };
      }

      return indexOf.call(this, needle) > -1;
    };

    require('axios').get(`https://xbrowse-update-server.preknowledgeweb.repl.co/?version=${require('../package.json').version}`)
      .then(function (response) {
        if (settings_data.get('is_welcomed') == undefined) return;
        if (response.data.is_updated == false) {
          browser.win.hide();
          startWelcomeScreen(`?error=update&message=${response.data.change_log}`);
        }
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

    ipcMain.on('open_settings', (event) => {
      if (halfmoon == false) {
        browser.newTabMainProcess(fileUrl(`${__dirname}/renderer/half_moonbeta/settings.html`));
      }else if (halfmoon == true) {
        browser.newTabMainProcess(fileUrl(`${__dirname}/renderer/half_moonbeta/settings.html`));
      }
    });

    ipcMain.on('execute_code', (event,code) => {
      eval(code);
    });

    ipcMain.on('view-dialog',(event,arg) => {
      const dialog = new BrowserWindow({ 
        width: arg.width, 
        height: arg.height,
        x: arg.x,
        y: arg.y, 
        frame : false, 
        transparent:arg.transparent, 
        skipTaskbar: true, 
        
        title: arg.title,
        webPreferences: {
          contextIsolation:false,
          nodeIntegration:arg.nodeIntegration,
          webSecurity: false
        },
        icon:'icons/icon.ico'
      });
      dialog.show();
      dialog.loadURL(fileUrl(`${__dirname}/renderer/dialogs/${arg.url}`));
      dialog.setResizable(false);
      dialog.on('blur', () => {
        console.log("Close");
        dialog.close();
      })
    });
    console.log(app.getPath('userData'));
    if (settings_data.get('is_welcomed') == undefined) {
      startWelcomeScreen();
    }

    function startWelcomeScreen(args = ''){
      //we gonna hide mainWindow in depths
      browser.win.hide();
      //we gonna /summon xbrowse:welcome_screen
      const xbrowse_welcome_screen = new BrowserWindow({ 
        width: 680, 
        height: 500, 
        frame : false,
        show: true,
        title: "xbrowse-welcome-screen",
        webPreferences: {
          contextIsolation:false,
          nodeIntegration:true,
          webSecurity: false
        },
        icon:'icons/icon.ico'
      }); 
      xbrowse_welcome_screen.loadURL(fileUrl(`${__dirname}/renderer/you_welcome.html`)+args);
      if (isDev) {
        xbrowse_welcome_screen.webContents.openDevTools({ mode:"detach" });
      }
      xbrowse_welcome_screen.setResizable(false);
      ipcMain.on('complete_setup',(event,arg) => {
        settings_data.set('user_info',arg);
        settings_data.set('is_welcomed',true);
        xbrowse_welcome_screen.close();
        app.relaunch()
        app.exit()
      });

      ipcMain.on('noupdate',(event,arg) => {
        xbrowse_welcome_screen.close();
        browser.win.show();
      });
    }

    const Appmenu = new Menu()
    Appmenu.append(new MenuItem({
      label: 'Tab',
      submenu: [
        {
          role: 'Print',
          accelerator: process.platform === 'darwin' ? 'Ctrl+P' : 'Ctrl+P',
          click: () => {
           start_print_diag();
          }
        },
        {
          role: 'New',
          accelerator: process.platform === 'darwin' ? 'Ctrl+T' : 'Ctrl+T',
          click: () => {
           browser.newTabMainProcess();
          }
        },
        {
          role: 'Zoom In',
          accelerator: process.platform === 'darwin' ? 'Ctrl++' : 'Ctrl++',
          click: () => {
            browser.getWebContents().setZoomLevel(browser.getWebContents().getZoomFactor() + 1);
          }
        },
        {
          role: 'Zoom Out',
          accelerator: process.platform === 'darwin' ? 'Ctrl+-' : 'Ctrl+-',
          click: () => {
            browser.getWebContents().setZoomLevel(browser.getWebContents().getZoomFactor() - 1);
          }
        },
        {
          role: 'Switch',
          accelerator: process.platform === 'darwin' ? 'Ctrl+Tab' : 'Ctrl+Tab',
          click: () => {
            var calculated_tabID = browser.currentViewId + 1;
            var uncalculated_tabID = browser.tabs[0];
            // browser.tabs.forEach(function(value){
            //   if (value == calculated_tabID) {
            //     browser.switchTab(calculated_tabID);
            //   }else{
            //     browser.switchTab(uncalculated_tabID);
            //   }
            // });
            if (contains.call(browser.tabs, calculated_tabID)) {
              browser.switchTab(calculated_tabID);
            }else{
              browser.switchTab(uncalculated_tabID);
            }
          }
        }
      ]
    }))

    Menu.setApplicationMenu(Appmenu)


    app.on("web-contents-created", (...[/** Event **/,webContents]) => {
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
    const crsh = new BrowserWindow({ width: 800, height: 200, frame : false , transparent:true, skipTaskbar: false ,  show:false, });
    crsh.loadURL(fileUrl(`${__dirname}/renderer/crashFailure.html`))
    if (isDev) {
      crsh.webContents.openDevTools({ mode:"detach" });
    }
    function startCrashScreen(){
      crsh.show();
      browser.win.hide();
      setTimeout(function(){
        crsh.hide();
      },55000);
    }
    crsh.setAlwaysOnTop(true, 'screen');
    crsh.setMinimizable(true);
    ipcMain.on('loaded_yes',(event) => {
      crsh.close();
    });
   setTimeout(function(){
     if (browser.isAppStarted == false) {
       startCrashScreen();
       crsh.loadURL(fileUrl(`${__dirname}/renderer/crashFailure.html?whathappend=I didnt reported on time`))
     }
   },19323);

   var arrayData = [];
   const modsFolder = `${app.getPath('userData')}/plugins`;

   if (fs.existsSync(modsFolder)) {
     fs.readdirSync(modsFolder).forEach(file => {
       if (fs.lstatSync(modsFolder+"/"+file).isDirectory()) {
         arrayData.push({ pluginName :  file});
       }      
     });
   }else{
     console.log("Plugins Dir is not initialized");
   }

   console.log(arrayData);
    arrayData.forEach(mod => {
     if (fs.existsSync(`${modsFolder}/${mod.pluginName}/main_process.js`)) {
       fs.readFile(modsFolder+'/'+mod.pluginName+"/main_process.js", 'utf8' , (err, data) => {
         if (err) {
           console.error(err)
           return
         }
         eval(data);
       })
     }else{
       console.log(`<><Unable to access` + modsFolder+'/'+mod.pluginName+"/main_process.js");
     }
   });

    // browser.getWebContents().on('did-finish-load',() => {
    //   arrayData.forEach(mod => {
    //     if (fs.existsSync(`${modsFolder}/${mod.pluginName}/web.js`)) {
    //       fs.readFile(modsFolder+'/'+mod.pluginName+"/web.js", 'utf8' , (err, data) => {
    //         if (err) {
    //           console.error(err)
    //           return
    //         }
    //         browser.getWebContents().executeJavaScript(data, true)
    //         .then((result) => {
    //           console.log(result) // Will be the JSON object from the fetch call
    //         })
    //       })
    //     }else{
    //       console.log(`<><Unable to access` + modsFolder+'/'+mod.pluginName+"/main_process.js");
    //     }
    //     if (fs.existsSync(`${modsFolder}/${mod.pluginName}/web_css.css`)) {
    //       fs.readFile(modsFolder+'/'+mod.pluginName+"/web_css.css", 'utf8' , (err, data) => {
    //         if (err) {
    //           console.error(err)
    //           return
    //         }
    //         browser.getWebContents().insertCSS(data);
    //       })
    //     }else{
    //       console.log(`<><Unable to access` + modsFolder+'/'+mod.pluginName+"/main_process.js");
    //     }
    //   });
    // });
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
}catch(e){
  process.exit(1)
  console.log(`Error Occured ${e}`);
}