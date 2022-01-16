const { app, ipcMain , ipcRenderer, Menu, MenuItem } = require('electron');
const fileUrl = require('file-url');
const BrowserLikeWindow = require('../index');

let browser;

function createWindow() {
  browser = new BrowserLikeWindow({
    controlHeight: 99,
    controlPanel: fileUrl(`${__dirname}/renderer/control.html`),
    startPage: fileUrl(`${__dirname}/renderer/new-tab.html`),
    blankTitle: 'New tab',
    blankPage: fileUrl(`${__dirname}/renderer/new-tab.html`),
    debug: true // will open controlPanel's devtools
  });

  browser.on('closed', () => {
    browser = null;
  });

  var menu = new Menu();

  app.on("web-contents-created", (...[/* event */, webContents]) => {
    menu.clear();
    menu.append(new MenuItem({ label: 'Copy Text!', click: function(event) {
      webContents.copy();
     // event.preventDefault();
    } }));
    menu.append(new MenuItem({ label: 'Cut Text!', click: function(event) {
      webContents.cut();
    //  event.preventDefault();
    } }));
    menu.append(new MenuItem({ label: 'Paste Text!', click: function(event) {
      webContents.paste();
  //    event.preventDefault();
    } }));
    menu.append(new MenuItem({ type: 'separator' }));
    menu.append(new MenuItem({ label: 'Print', click: function(event) {
      webContents.print();
   //   event.preventDefault();
    } }));
    menu.append(new MenuItem({ type: 'separator' }));
    menu.append(new MenuItem({ label: 'Inspect Element', click: function(event) {
      webContents.toggleDevTools();
   //   event.preventDefault();
    } }));
    //Webview is being shown here as a window type
    console.log(webContents.getType())
    webContents.on("context-menu", (event, click) => {
      event.preventDefault();
      console.log(webContents.getType())
      menu.popup(webContents);
    }, false);

    //console.log(menu);
  });

  ipcMain.on('open-settings', (event, arg) => {
    console.log("Open settings:"+arg) // prints "ping"
    browser.controlView.webContents.loadURL(fileUrl(`${__dirname}/renderer/settings.html`));
  //  ipcRenderer.send('set-browseview', )
  })
}

app.on('ready', async () => {
  createWindow();
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
